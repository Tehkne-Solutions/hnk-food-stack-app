'use server'

import { refineContentWithAI } from '@/services/ai-gastronomic'
import { insertTenantData } from '@/lib/supabase-tenant'
import type { Organization } from '@/types/tenant'

/**
 * Server Action: Refinar conteúdo de Instagram para blog
 * HNK-GIP Pattern: Automação via AI + Supabase
 * 
 * Fluxo:
 * 1. Recebe caption do Instagram
 * 2. Passa para IA Gemini com brand_voice e keywords
 * 3. IA refina em post SEO
 * 4. Salva como draft na tabela posts_blog
 * 5. Admin aprova antes de publicar
 */
export async function refineAndSaveBlogPost(
    orgId: string,
    caption: string,
    imageUrl: string | undefined,
    organization: Organization
) {
    try {
        // 1. Validações
        if (!caption || caption.trim().length === 0) {
            return {
                success: false,
                error: 'Caption não pode estar vazia',
            }
        }

        if (!organization.brand_voice || !organization.keywords) {
            return {
                success: false,
                error: 'Organização sem configuração de voz ou keywords',
            }
        }

        // 2. Chamar IA para refinar
        const refinedContent = await refineContentWithAI({
            caption,
            imageUrl,
            organization,
        })

        // 3. Gerar slug a partir do título
        const slug = refinedContent.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 50)

        // 4. Salvar no banco de dados
        const savedPost = await insertTenantData('posts_blog', orgId, {
            title: refinedContent.title,
            content_seo: refinedContent.contentSeo,
            slug,
            image_url: imageUrl || null,
            meta_description: refinedContent.metaDescription,
            tags: refinedContent.tags,
            status: 'draft', // Admin precisa aprovar
            seo_score: refinedContent.seoScore,
        })

        if (!savedPost || savedPost.length === 0) {
            return {
                success: false,
                error: 'Erro ao salvar post no banco de dados',
            }
        }

        return {
            success: true,
            post: savedPost[0],
            message: 'Post criado como draft! Aprove no Dashboard Admin.',
        }
    } catch (error) {
        console.error('Erro em refineAndSaveBlogPost:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        }
    }
}

/**
 * Server Action: Publicar post de blog
 * Apenas admin pode fazer isso
 */
export async function publishBlogPost(
    orgId: string,
    postId: string,
    updatedContent?: string
) {
    try {
        const { updateTenantData } = await import('@/lib/supabase-tenant')

        const updated = await updateTenantData(
            'posts_blog',
            orgId,
            postId,
            {
                status: 'published',
                published_at: new Date().toISOString(),
                content_seo: updatedContent, // Se o admin editou
            }
        )

        if (!updated) {
            return {
                success: false,
                error: 'Erro ao publicar post',
            }
        }

        return {
            success: true,
            message: 'Post publicado com sucesso!',
        }
    } catch (error) {
        console.error('Erro em publishBlogPost:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        }
    }
}

/**
 * Server Action: Listar posts em draft para aprovação
 */
export async function listDraftPosts(orgId: string) {
    try {
        const { getTenantData } = await import('@/lib/supabase-tenant')

        const drafts = await getTenantData('posts_blog', orgId, {
            status: 'draft',
        })

        return {
            success: true,
            posts: drafts || [],
        }
    } catch (error) {
        console.error('Erro em listDraftPosts:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        }
    }
}
