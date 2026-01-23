import { GoogleGenerativeAI } from '@google/generative-ai'
import type { Organization } from '@/types/tenant'

/**
 * Serviço de IA Gastronômica
 * HNK-GIP Pattern: Transformação automática de conteúdo social em posts SEO
 * 
 * Integra com Google Gemini 1.5 Pro para:
 * 1. Transformar legendas do Instagram em artigos de blog
 * 2. Gerar meta-descrições otimizadas
 * 3. Criar alt-tags acessíveis
 * 4. Respeitar brand voice e keywords da organização
 */

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

if (!apiKey) {
    console.warn('⚠️  GOOGLE_GENERATIVE_AI_API_KEY não configurada. IA desabilitada.')
}

const genAI = new GoogleGenerativeAI(apiKey || '')

interface RefineContentInput {
    caption: string
    imageUrl?: string
    organization: Organization
}

interface RefineContentOutput {
    title: string
    contentSeo: string
    metaDescription: string
    altTag: string
    tags: string[]
    seoScore?: number
}

/**
 * Refina conteúdo de Instagram para Blog com IA
 * Usa brand_voice e keywords da organização para personalizar
 * 
 * @example
 * const refined = await refineContentWithAI({
 *   caption: "Costela saindo agora! 🔥",
 *   organization: { brand_voice: 'rústico e apaixonado', keywords: [...] }
 * })
 */
export async function refineContentWithAI(
    input: RefineContentInput
): Promise<RefineContentOutput> {
    if (!apiKey) {
        throw new Error('Google Generative AI não configurado')
    }

    const { caption, organization } = input
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const prompt = `Você é um especialista em Marketing Gastronômico e Redator de Blog.

Transforme esta legenda de Instagram em um post de blog profissional e otimizado para SEO.

=== LEGENDA ORIGINAL ===
"${caption}"

=== CONTEXTO DA MARCA ===
Nome: ${organization.name}
Voz da Marca: ${organization.brand_voice}
Palavras-chave: ${organization.keywords.join(', ')}
Região: Interior/São Paulo (para SEO Local)

=== INSTRUÇÕES ===
1. Crie um TÍTULO impactante com 60 caracteres máx, incluindo uma palavra-chave local
2. Escreva 400-500 palavras de conteúdo em tom ${organization.brand_voice}
3. Use estrutura H2/H3 com subtítulos atrativos
4. Inclua uma seção "Dica do Mestre Parrilleiro" com conselho prático
5. Termine com Call-to-Action para WhatsApp
6. Gere uma META DESCRIÇÃO com 160 caracteres
7. Crie uma ALT TAG descritiva para acessibilidade

Retorne em JSON puro (sem markdown):
{
  "title": "Seu Título Aqui",
  "contentSeo": "Conteúdo completo em HTML... <h2>Subtítulo</h2>...",
  "metaDescription": "Meta descrição com até 160 caracteres",
  "altTag": "Descrição da imagem para acessibilidade",
  "tags": ["churrasco", "palavra-chave-2", "palavra-chave-3"],
  "seoScore": 85
}`

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        // Extrair JSON da resposta
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error('Resposta da IA não contém JSON válido')
        }

        const parsedResponse = JSON.parse(jsonMatch[0]) as RefineContentOutput

        // Validar campos obrigatórios
        if (!parsedResponse.title || !parsedResponse.contentSeo) {
            throw new Error('Resposta da IA incompleta')
        }

        return {
            title: parsedResponse.title,
            contentSeo: parsedResponse.contentSeo,
            metaDescription: parsedResponse.metaDescription || '',
            altTag: parsedResponse.altTag || 'Imagem de churrasco',
            tags: parsedResponse.tags || [],
            seoScore: parsedResponse.seoScore,
        }
    } catch (error) {
        console.error('Erro ao refinar conteúdo com IA:', error)
        throw new Error(
            `Falha na IA: ${error instanceof Error ? error.message : 'Desconhecido'}`
        )
    }
}

/**
 * Gera sugestões de postagens baseado em padrões anteriores
 * Útil para o admin sugerir posts sem depender do Instagram
 */
export async function generateBlogSuggestions(
    organization: Organization,
    context: string
): Promise<string[]> {
    if (!apiKey) return []

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const prompt = `Como especialista em Gastromarketing, sugira 5 títulos de posts de blog únicos para um restaurante.

Nome: ${organization.name}
Voz: ${organization.brand_voice}
Contexto: ${context}
Região: Interior de São Paulo

Retorne apenas um JSON array de strings com os 5 títulos, sem explicações.`

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()
        const jsonMatch = responseText.match(/\[[\s\S]*\]/)

        if (!jsonMatch) return []
        return JSON.parse(jsonMatch[0])
    } catch {
        return []
    }
}
