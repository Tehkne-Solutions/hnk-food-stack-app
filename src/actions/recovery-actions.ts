'use server'

/**
 * 🧠 FASE 4: Recovery Brain - Serviço de Recuperação de Carrinhos
 * Integração com Evolution API (WhatsApp) + n8n
 */

import { createClientInstance } from '@/lib/supabase'
import {
    AbandonedCart,
    RecoveryConfig,
    RecoveryMetrics,
    WhatsAppMessage,
} from '@/types/recovery'

const supabaseInstance = createClientInstance()
const supabase = supabaseInstance!

/**
 * Registrar carrinho abandonado
 * Disparado quando usuário sai sem checkout
 */
export async function trackAbandonedCart(
    orgId: string,
    customerId: string | null,
    customerName: string,
    customerPhone: string,
    customerEmail: string | null,
    cartItems: any[],
    cartTotal: number
): Promise<{ success: boolean; cartId?: string; error?: string }> {
    try {
        if (!supabase) {
            return {
                success: false,
                error: 'Supabase não configurado',
            }
        }

        const { data, error } = await supabase
            .from('abandoned_carts')
            .insert({
                org_id: orgId,
                customer_id: customerId,
                customer_name: customerName,
                customer_phone: customerPhone,
                customer_email: customerEmail,
                cart_items: cartItems,
                cart_total: cartTotal,
                recovery_status: 'pending',
                recovery_attempts: 0,
            })
            .select('id')
            .single()

        if (error) throw error

        // Dispara webhook para n8n iniciar delay
        await triggerRecoveryBrainWebhook('cart.abandoned', data.id, orgId, {
            cart_total: cartTotal,
            items_count: cartItems.length,
        })

        return { success: true, cartId: data.id }
    } catch (error) {
        console.error('❌ Erro ao rastrear carrinho abandonado:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Enviar mensagem de recuperação via WhatsApp
 * Chamada por n8n após delay (20 min padrão)
 */
export async function sendRecoveryMessage(
    cartId: string,
    orgId: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
        if (!supabase) {
            return {
                success: false,
                error: 'Supabase não configurado',
            }
        }

        // Buscar carrinho e config
        const [cartRes, configRes] = await Promise.all([
            supabase!
                .from('abandoned_carts')
                .select('*')
                .eq('id', cartId)
                .eq('org_id', orgId)
                .single(),
            supabase!
                .from('recovery_configs')
                .select('*')
                .eq('org_id', orgId)
                .single(),
        ])

        if (cartRes.error) throw new Error('Carrinho não encontrado')
        if (configRes.error) throw new Error('Configuração de recovery não encontrada')

        const cart = cartRes.data as AbandonedCart
        const config = configRes.data as RecoveryConfig

        // Verificar se já foi enviada mensagem
        if (cart.recovery_status !== 'pending') {
            return {
                success: false,
                error: `Carrinho com status: ${cart.recovery_status}`,
            }
        }

        // Gerar link único de recuperação
        const recoveryLink = generateRecoveryLink(cartId, orgId)

        // Preparar mensagem WhatsApp
        const message: WhatsAppMessage = {
            phone: cart.customer_phone,
            name: cart.customer_name,
            total: cart.cart_total,
            items_count: cart.cart_items.length,
            recovery_link: recoveryLink,
            cart_id: cartId,
        }

        // Renderizar template
        const renderedMessage = renderMessageTemplate(
            config.message_template,
            message
        )

        // Enviar via Evolution API
        const evolutionResponse = await sendWhatsAppMessage(
            config.evolution_api_url,
            config.evolution_api_token,
            message.phone,
            renderedMessage,
            recoveryLink
        )

        if (!evolutionResponse.success) {
            throw new Error(`Falha ao enviar WhatsApp: ${evolutionResponse.error}`)
        }

        // Atualizar status do carrinho
        const { error: updateError } = await supabase
            .from('abandoned_carts')
            .update({
                recovery_status: 'message_sent',
                recovery_attempts: cart.recovery_attempts + 1,
                message_sent_at: new Date().toISOString(),
            })
            .eq('id', cartId)

        if (updateError) throw updateError

        // Disparar webhook de confirmação
        await triggerRecoveryBrainWebhook('message.sent', cartId, orgId, {
            phone: message.phone,
            messageId: evolutionResponse.messageId,
        })

        return {
            success: true,
            messageId: evolutionResponse.messageId,
        }
    } catch (error) {
        console.error('❌ Erro ao enviar mensagem de recovery:', error)

        // Marcar como falha
        await supabase
            .from('abandoned_carts')
            .update({
                recovery_status: 'failed',
            })
            .eq('id', cartId)

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Rastrear clique no link de recuperação
 * Chamado quando usuário clica no link via WhatsApp
 */
export async function trackRecoveryClick(
    cartId: string,
    orgId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('abandoned_carts')
            .update({
                recovery_status: 'clicked',
                link_clicked_at: new Date().toISOString(),
            })
            .eq('id', cartId)
            .eq('org_id', orgId)

        if (error) throw error

        // Disparar webhook
        await triggerRecoveryBrainWebhook('link.clicked', cartId, orgId, {
            clicked_at: new Date().toISOString(),
        })

        return { success: true }
    } catch (error) {
        console.error('❌ Erro ao rastrear clique:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Marcar carrinho como recuperado (compra feita)
 */
export async function markCartRecovered(
    cartId: string,
    orgId: string,
    orderId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('abandoned_carts')
            .update({
                recovery_status: 'recovered',
                recovered_at: new Date().toISOString(),
            })
            .eq('id', cartId)
            .eq('org_id', orgId)

        if (error) throw error

        // Disparar webhook
        await triggerRecoveryBrainWebhook('cart.recovered', cartId, orgId, {
            orderId,
            recovered_at: new Date().toISOString(),
        })

        return { success: true }
    } catch (error) {
        console.error('❌ Erro ao marcar carrinho como recuperado:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Obter métricas de recovery para dashboard
 */
export async function getRecoveryMetrics(
    orgId: string,
    days: number = 30
): Promise<{ success: boolean; metrics?: RecoveryMetrics; error?: string }> {
    try {
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        const { data: carts, error } = await supabase
            .from('abandoned_carts')
            .select('*')
            .eq('org_id', orgId)
            .gte('created_at', startDate.toISOString())

        if (error) throw error

        const totalAbandoned = carts.length
        const withAttempts = carts.filter((c: AbandonedCart) => c.recovery_attempts > 0).length
        const recovered = carts.filter((c: AbandonedCart) => c.recovery_status === 'recovered').length
        const clicked = carts.filter((c: AbandonedCart) => c.recovery_status === 'clicked').length
        const messageSent = carts.filter((c: AbandonedCart) => c.recovery_status === 'message_sent').length

        const recoveryRevenue = carts
            .filter((c: AbandonedCart) => c.recovery_status === 'recovered')
            .reduce((sum: number, c: AbandonedCart) => sum + c.cart_total, 0)

        const averageRecoveryTime = calculateAverageRecoveryTime(carts)

        const metrics: RecoveryMetrics = {
            org_id: orgId,
            total_abandoned_carts: totalAbandoned,
            carts_with_recovery_attempts: withAttempts,
            successful_recoveries: recovered,
            recovery_revenue: recoveryRevenue,
            average_recovery_time_hours: averageRecoveryTime,
            message_sent_count: messageSent,
            link_click_rate: clicked > 0 ? (clicked / messageSent) * 100 : 0,
            conversion_rate: recovered > 0 ? (recovered / messageSent) * 100 : 0,
            period_start: startDate.toISOString(),
            period_end: new Date().toISOString(),
        }

        return { success: true, metrics }
    } catch (error) {
        console.error('❌ Erro ao obter métricas de recovery:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Helpers
 */

function generateRecoveryLink(cartId: string, orgId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const token = Buffer.from(`${cartId}:${orgId}`).toString('base64')
    return `${baseUrl}/recovery/${token}`
}

function renderMessageTemplate(template: string, data: WhatsAppMessage): string {
    return template
        .replace('{{name}}', data.name)
        .replace('{{total}}', `R$ ${data.total.toFixed(2)}`)
        .replace('{{items_count}}', data.items_count.toString())
        .replace('{{link}}', data.recovery_link)
}

async function sendWhatsAppMessage(
    apiUrl: string,
    apiToken: string,
    phone: string,
    message: string,
    link: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
        // Limpar phone number (remover caracteres especiais)
        const cleanPhone = phone.replace(/\D/g, '')

        const response = await fetch(`${apiUrl}/message/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({
                number: cleanPhone,
                message,
                link,
            }),
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Evolution API error: ${error}`)
        }

        const data = (await response.json()) as { id?: string; success?: boolean }
        return {
            success: true,
            messageId: data.id || 'unknown',
        }
    } catch (error) {
        console.error('❌ Erro ao enviar WhatsApp:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

async function triggerRecoveryBrainWebhook(
    event: string,
    cartId: string,
    orgId: string,
    data: Record<string, unknown>
): Promise<void> {
    try {
        const webhookUrl = process.env.N8N_WEBHOOK_URL

        if (!webhookUrl) {
            console.warn('⚠️ N8N_WEBHOOK_URL não configurada')
            return
        }

        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event,
                cart_id: cartId,
                org_id: orgId,
                timestamp: new Date().toISOString(),
                data,
            }),
        })
    } catch (error) {
        console.error('❌ Erro ao disparar webhook n8n:', error)
        // Não lançar erro para não quebrar fluxo principal
    }
}

function calculateAverageRecoveryTime(carts: AbandonedCart[]): number {
    const recovered = carts.filter((c) => c.recovery_status === 'recovered')
    if (recovered.length === 0) return 0

    const totalHours = recovered.reduce((sum, c) => {
        const abandoned = new Date(c.created_at).getTime()
        const recoveredTime = new Date(c.recovered_at || 0).getTime()
        return sum + (recoveredTime - abandoned) / (1000 * 60 * 60)
    }, 0)

    return totalHours / recovered.length
}
