/**
 * 📊 FASE 5: Dashboard BI - Tipos de Dados
 */

export interface DashboardMetrics {
    revenue_total: number
    revenue_today: number
    orders_total: number
    orders_today: number
    conversion_rate: number
    average_order_value: number
    recovery_brain_roi: number
    recovery_revenue: number
    recovery_conversion_rate: number
    top_products: TopProduct[]
    sales_trend: SalesTrendData[]
    period_start: string
    period_end: string
}

export interface TopProduct {
    product_id: string
    name: string
    quantity_sold: number
    revenue: number
    percentage: number
}

export interface SalesTrendData {
    date: string
    revenue: number
    orders: number
    recovery_orders: number
    conversion_rate: number
}

export interface ConversionFunnelData {
    stage: 'visitors' | 'cart' | 'checkout' | 'purchase'
    count: number
    percentage: number
    conversion_from_previous: number
}

export interface ChartData {
    name: string
    value: number
    color?: string
}

export interface DateRange {
    start: Date
    end: Date
    label: 'today' | '7days' | '30days'
}

export interface DashboardFilters {
    date_range: '1d' | '7d' | '30d'
    product_filter?: string[]
    payment_method?: 'credit' | 'debit' | 'pix' | 'all'
}

export interface RecoveryMetricsDetail {
    total_abandoned: number
    message_sent: number
    clicked: number
    recovered: number
    recovery_revenue: number
    recovery_cost: number
    recovery_roi: number
    average_time_to_recovery: number
}
