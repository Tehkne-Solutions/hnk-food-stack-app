import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware de Identificação de Tenant
 * HNK-GIP Pattern: Multi-Tenancy por Subdomínio/Slug
 * 
 * Fluxo:
 * 1. Captura o hostname (ex: churrasco-bem-brasil.localhost:3000)
 * 2. Extrai a slug antes do domínio principal
 * 3. Injeta um header X-Tenant-ID e data-tenant-id na resposta
 * 4. Em produção, busca a organização no Supabase
 * 
 * Exemplos:
 * - localhost:3000 → tenant padrão (dev)
 * - churrasco-bem-brasil.localhost:3000 → churrasco-bem-brasil
 * - churrasco-bem-brasil.seusaas.com → churrasco-bem-brasil
 * - pedidos.churrascobembrasil.com.br → custom_domain (Supabase lookup)
 */
export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || 'localhost'

    // Extrair slug do hostname
    let tenantSlug = 'default'

    if (host.includes('localhost')) {
        // Desenvolvimento local: churrasco-bem-brasil.localhost:3000
        const parts = host.split('.')
        if (parts.length > 1 && parts[0] !== 'localhost') {
            tenantSlug = parts[0]
        }
    } else {
        // Produção: app.seusaas.com ou dominio-customizado.com.br
        const parts = host.split('.')

        // Se tem mais de 2 partes, é um subdomínio
        if (parts.length > 2) {
            tenantSlug = parts[0]
        } else {
            // Senão, buscar no banco de dados por custom_domain (não implementado ainda)
            // Por enquanto, usar 'default'
            tenantSlug = 'default'
        }
    }

    // Clonar a resposta e injetar headers
    const response = NextResponse.next()
    response.headers.set('X-Tenant-ID', tenantSlug)
    response.headers.set('X-Tenant-Host', host)

    return response
}

/**
 * Configuração de paths para o middleware
 * Roda em todas as rotas
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
}
