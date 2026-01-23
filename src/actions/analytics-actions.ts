'use server'

import type { AnalyticsEvent } from '@/types/analytics'

/**
 * Server-Side Event API (CAPI)
 * HNK-GIP Pattern: Disparo de eventos do servidor para Meta
 * 
 * Vantagens:
 * - Funciona mesmo com adblockers
 * - Maior precisão de dados
 * - Protege informações sensíveis
 * 
 * Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN || ''

interface CapiEvent {
    event_name: string
    event_time: number
    event_source_url: string
    event_id?: string
    user_data?: {
        email?: string
        phone?: string
        first_name?: string
        last_name?: string
        city?: string
        state?: string
        zip_code?: string
        country?: string
        external_id?: string
    }
    custom_data?: {
        value?: number
        currency?: string
        content_name?: string
        content_type?: string
        content_ids?: string[]
        num_items?: number
    }
}

/**
 * Enviar evento para Meta Conversions API
 * Usar após confirmação de pagamento ou ação importante
 */
export async function trackCapiEvent(
    eventName: string,
    data: {
        email?: string
        phone?: string
        firstName?: string
        lastName?: string
        url: string
        value?: number
        currency?: string
        items?: any[]
        orderId?: string
    }
) {
    if (!FACEBOOK_PIXEL_ID || !FACEBOOK_ACCESS_TOKEN) {
        console.warn('⚠️  Facebook CAPI não configurado')
        return { success: false, error: 'Facebook CAPI não configurado' }
    }

    try {
        const event: CapiEvent = {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_source_url: data.url,
            event_id: `${data.orderId || 'evt'}-${Date.now()}`,
            user_data: {
                email: data.email,
                phone: data.phone,
                first_name: data.firstName,
                last_name: data.lastName,
            },
            custom_data: {
                value: data.value,
                currency: data.currency || 'BRL',
                content_name: eventName,
                num_items: data.items?.length || 0,
            },
        }

        const response = await fetch(
            `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [event],
                    access_token: FACEBOOK_ACCESS_TOKEN,
                }),
            }
        )

        if (!response.ok) {
            const error = await response.json()
            console.error('Facebook CAPI error:', error)
            return { success: false, error: error.error?.message }
        }

        return { success: true }
    } catch (error) {
        console.error('Erro ao rastrear CAPI:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Desconhecido',
        }
    }
}

/**
 * Rastrear compra via CAPI
 * Chamado após confirmação de pagamento
 */
export async function trackCapiPurchase(
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    orderId: string,
    items: any[],
    total: number,
    url: string
) {
    return await trackCapiEvent('Purchase', {
        email,
        phone,
        firstName,
        lastName,
        orderId,
        url,
        value: total,
        currency: 'BRL',
        items,
    })
}

/**
 * Rastrear lead via CAPI
 * Chamado após envio de formulário de evento
 */
export async function trackCapiLead(
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    url: string
) {
    return await trackCapiEvent('Lead', {
        email,
        phone,
        firstName,
        lastName,
        url,
    })
}
