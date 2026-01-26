/**
 * Types do HNK Food Stack App
 * Tipos principais para Produtos, Pedidos e Leads
 */

export type ProductCategory = 'carnes' | 'acompanhamentos' | 'bebidas' | 'eventos'

export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: ProductCategory
    image_url: string
    badge?: 'mais-pedido' | 'promocao' | null
    created_at?: string
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface Order {
    id: string
    client_id: string
    items: CartItem[]
    total: number
    status: 'pendente' | 'preparando' | 'saiu-entrega' | 'entregue' | 'cancelado'
    order_type: 'delivery' | 'evento'
    created_at: string
}

export interface EventLead {
    id: string
    name: string
    email: string
    phone: string
    event_date: string
    guest_count: number
    budget_status: 'oramento-solicitado' | 'oramento-enviado' | 'negociando' | 'convertido' | 'perdido'
    created_at: string
}
// ============================================
// TIPOS FASE 10 - CHECKOUT & PAYMENTS
// ============================================

export type PaymentMethod = 'pix' | 'card' | 'cash'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'on_way' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'approved' | 'denied' | 'refunded'

/**
 * Pedido (Order) - Versão Fase 10
 */
export interface Pedido {
    id: string
    user_id: string

    // Cliente
    nome: string
    email: string
    telefone?: string

    // Endereço entrega
    endereco: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    estado: string
    cep: string

    // Valores
    subtotal: number
    taxa_entrega: number
    desconto: number
    total: number

    // Pagamento
    payment_method: PaymentMethod
    payment_id?: string
    payment_status: PaymentStatus

    // Status
    status: OrderStatus
    observacoes?: string

    // Timestamps
    created_at: string
    updated_at: string

    // Items (populate)
    items?: PedidoItem[]
}

/**
 * Item do Pedido
 */
export interface PedidoItem {
    id: string
    pedido_id: string

    // Produto
    product_id: string
    nome: string
    descricao?: string
    categoria?: ProductCategory

    // Valores
    preco: number
    quantidade: number
    subtotal: number

    // Customizações
    observacoes?: string

    created_at: string
}

/**
 * Formulário de Checkout
 */
export interface CheckoutFormData {
    // Cliente
    nome: string
    email: string
    telefone: string

    // Endereço
    endereco: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string

    // Observações
    observacoes: string
}

/**
 * Resposta do Mercado Pago
 */
export interface MercadoPagoPreference {
    id: string
    init_point: string
    sandbox_init_point: string
}

/**
 * Webhook do Mercado Pago
 */
export interface MercadoPagoWebhook {
    id: string
    live_mode: boolean
    type: string
    date_created: string
    user_id: string
    resource: string
    data: {
        id: string
    }
}

/**
 * Status de Pagamento (para polling)
 */
export interface PaymentStatus {
    id: string
    status: PaymentStatus
    status_detail: string
    created_at: string
}