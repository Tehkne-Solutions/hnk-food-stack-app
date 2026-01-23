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
