/**
 * 🧠 FASE 4: Recovery Brain - Tipos para Recuperação de Carrinhos
 * Automação de carrinho abandonado com Evolution API + n8n
 */

export interface AbandonedCart {
    id: string
    org_id: string
    customer_id: string | null
    customer_name: string
    customer_phone: string
    customer_email?: string | null
    cart_items: CartItem[]
    cart_total: number
    cart_abandoned_at: string
    recovery_status: 'pending' | 'message_sent' | 'clicked' | 'recovered' | 'failed'
    recovery_attempts: number
    last_recovery_attempt_at?: string | null
    message_sent_at?: string | null
    link_clicked_at?: string | null
    recovered_at?: string | null
    created_at: string
    updated_at: string
}

export interface CartItem {
    id: string
    product_id: string
    product_name: string
    product_image_url?: string
    price: number
    quantity: number
    total: number
}

export interface RecoveryConfig {
    org_id: string
    enabled: boolean
    recovery_delays: number[] // [20, 1440, 10080] = 20 min, 1 dia, 7 dias
    message_template: string // WhatsApp template com variáveis: {{name}}, {{total}}, {{link}}
    whatsapp_phone_id: string
    evolution_api_url: string
    evolution_api_token: string
    track_clicks: boolean
    send_sms_fallback: boolean
}

export interface RecoveryWebhook {
    event: 'cart.abandoned' | 'cart.recovered' | 'message.sent' | 'link.clicked'
    cart_id: string
    org_id: string
    timestamp: string
    data: Record<string, unknown>
}

export interface RecoveryMetrics {
    org_id: string
    total_abandoned_carts: number
    carts_with_recovery_attempts: number
    successful_recoveries: number
    recovery_revenue: number
    average_recovery_time_hours: number
    message_sent_count: number
    link_click_rate: number // percentage
    conversion_rate: number // percentage
    period_start: string
    period_end: string
}

export interface WhatsAppMessage {
    phone: string
    name: string
    total: number
    items_count: number
    recovery_link: string
    cart_id: string
}

export interface EvolutionApiConfig {
    instanceName: string
    apiUrl: string
    apiKey: string
    webhookUrl: string
}

export interface RecoveryRule {
    id: string
    org_id: string
    trigger: 'cart_abandoned'
    delay_minutes: number
    template_id: string
    enabled: boolean
    max_attempts: number
    created_at: string
    updated_at: string
}

export type RecoveryStatus =
    | 'pending'
    | 'message_sent'
    | 'clicked'
    | 'recovered'
    | 'failed'
    | 'cancelled'
