'use server'

/**
 * 📊 FASE 5: Dashboard BI - Serviço de Agregação de Dados
 */

import { createClientInstance } from '@/lib/supabase'
import {
    DashboardMetrics,
    SalesTrendData,
    TopProduct,
    ConversionFunnelData,
    RecoveryMetricsDetail,
} from '@/types/dashboard'

const supabase = createClientInstance()

/**
 * Obter métricas completas do dashboard
 */
export async function getDashboardMetrics(
    orgId: string,
    days: number = 30
): Promise<{ success: boolean; metrics?: DashboardMetrics; error?: string }> {
    try {
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)

        // Buscar pedidos do período
        const { data: ordersAll, error: ordersError } = await supabase
            .from('pedidos')
            .select('id, total_amount, created_at, recovery_cart_id')
            .eq('org_id', orgId)
            .gte('created_at', startDate.toISOString())

        if (ordersError) throw ordersError

        // Buscar pedidos de hoje
        const { data: ordersToday, error: todayError } = await supabase
            .from('pedidos')
            .select('id, total_amount')
            .eq('org_id', orgId)
            .gte('created_at', todayStart.toISOString())

        if (todayError) throw todayError

        // Calcular métricas básicas
        const revenueTotal = ordersAll?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0
        const revenueToday = ordersToday?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0
        const ordersTotal = ordersAll?.length || 0
        const ordersToday_ = ordersToday?.length || 0
        const aov = ordersTotal > 0 ? revenueTotal / ordersTotal : 0

        // Buscar métricas de recovery
        const recoveryDetail = await getRecoveryMetrics(orgId, days)

        // Buscar top produtos
        const topProducts = await getTopProducts(orgId, 5)

        // Buscar trend de vendas
        const salesTrend = await getSalesTrend(orgId, days)

        // Calcular conversão (simplificado - seria melhor com eventos de Google Analytics)
        const conversionRate = ordersTotal > 0 ? (ordersTotal / 1500) * 100 : 0 // Estimativa

        const metrics: DashboardMetrics = {
            revenue_total: revenueTotal,
            revenue_today: revenueToday,
            orders_total: ordersTotal,
            orders_today: ordersToday_,
            conversion_rate: conversionRate,
            average_order_value: aov,
            recovery_brain_roi: recoveryDetail?.recovery_roi || 0,
            recovery_revenue: recoveryDetail?.recovery_revenue || 0,
            recovery_conversion_rate: recoveryDetail?.recovery_revenue ?
                (recoveryDetail.recovered / recoveryDetail.total_abandoned) * 100 : 0,
            top_products: topProducts,
            sales_trend: salesTrend,
            period_start: startDate.toISOString(),
            period_end: new Date().toISOString(),
        }

        return { success: true, metrics }
    } catch (error) {
        console.error('❌ Erro ao obter métricas do dashboard:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Obter trend de vendas por dia
 */
export async function getSalesTrend(
    orgId: string,
    days: number = 30
): Promise<SalesTrendData[]> {
    try {
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        // Query para agregação por dia
        const { data: trends, error } = await supabase
            .from('pedidos')
            .select('created_at, total_amount, recovery_cart_id')
            .eq('org_id', orgId)
            .gte('created_at', startDate.toISOString())

        if (error) throw error

        // Agrupar por data
        const grouped = new Map<string, { revenue: number; orders: number; recovery_orders: number }>()

        trends?.forEach((order: any) => {
            const date = new Date(order.created_at).toISOString().split('T')[0]
            const current = grouped.get(date) || { revenue: 0, orders: 0, recovery_orders: 0 }

            current.revenue += order.total_amount || 0
            current.orders += 1
            if (order.recovery_cart_id) current.recovery_orders += 1

            grouped.set(date, current)
        })

        // Converter para array e calcular conversão
        const result: SalesTrendData[] = Array.from(grouped.entries()).map(([date, data]) => ({
            date,
            revenue: data.revenue,
            orders: data.orders,
            recovery_orders: data.recovery_orders,
            conversion_rate: (data.orders / 50) * 100, // Estimativa: 50 visitantes por dia
        }))

        return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } catch (error) {
        console.error('❌ Erro ao obter trend de vendas:', error)
        return []
    }
}

/**
 * Obter top produtos
 */
export async function getTopProducts(orgId: string, limit: number = 5): Promise<TopProduct[]> {
    try {
        // Query para top produtos (simplificado - assumindo tabela de itens de pedido)
        const { data: products, error } = await supabase
            .from('pedidos_items')
            .select(`
        product_id,
        quantity,
        price,
        produtos(name)
      `)
            .eq('pedidos.org_id', orgId)
            .limit(limit * 5) // Buscar mais para agregar

        if (error) throw error

        // Agrupar e calcular
        const grouped = new Map<
            string,
            { product_id: string; name: string; quantity: number; revenue: number }
        >()

        products?.forEach((item: any) => {
            const key = item.product_id
            const current = grouped.get(key) || {
                product_id: item.product_id,
                name: item.produtos?.name || 'Unknown',
                quantity: 0,
                revenue: 0,
            }

            current.quantity += item.quantity || 0
            current.revenue += (item.price || 0) * (item.quantity || 0)

            grouped.set(key, current)
        })

        // Converter para array e ordenar
        const totalRevenue = Array.from(grouped.values()).reduce((sum, p) => sum + p.revenue, 0)

        const result: TopProduct[] = Array.from(grouped.values())
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, limit)
            .map((p) => ({
                product_id: p.product_id,
                name: p.name,
                quantity_sold: p.quantity,
                revenue: p.revenue,
                percentage: totalRevenue > 0 ? (p.revenue / totalRevenue) * 100 : 0,
            }))

        return result
    } catch (error) {
        console.error('❌ Erro ao obter top produtos:', error)
        return []
    }
}

/**
 * Obter dados do funnel de conversão
 */
export async function getConversionFunnel(
    orgId: string,
    days: number = 30
): Promise<ConversionFunnelData[]> {
    try {
        // Para implementação completa, seria necessário dados de eventos
        // Por enquanto, retornar dados estimados baseados em pedidos

        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        // Buscar contagem de carrinhos e pedidos
        const [cartRes, orderRes] = await Promise.all([
            supabase
                .from('abandoned_carts')
                .select('id')
                .eq('org_id', orgId)
                .gte('created_at', startDate.toISOString()),
            supabase
                .from('pedidos')
                .select('id')
                .eq('org_id', orgId)
                .gte('created_at', startDate.toISOString()),
        ])

        const carts = cartRes.data?.length || 1
        const orders = orderRes.data?.length || 0
        const visitors = Math.ceil(carts * 3.4) // Estimativa: 1 carrinho por 3.4 visitantes

        const funnel: ConversionFunnelData[] = [
            {
                stage: 'visitors',
                count: visitors,
                percentage: 100,
                conversion_from_previous: 100,
            },
            {
                stage: 'cart',
                count: carts,
                percentage: (carts / visitors) * 100,
                conversion_from_previous: (carts / visitors) * 100,
            },
            {
                stage: 'checkout',
                count: Math.ceil(carts * 0.37),
                percentage: Math.ceil((carts * 0.37) / visitors) * 100,
                conversion_from_previous: 37,
            },
            {
                stage: 'purchase',
                count: orders,
                percentage: (orders / visitors) * 100,
                conversion_from_previous: Math.ceil((orders / (carts * 0.37)) * 100) || 0,
            },
        ]

        return funnel
    } catch (error) {
        console.error('❌ Erro ao obter funnel de conversão:', error)
        return []
    }
}

/**
 * Obter métricas detalhadas do Recovery Brain
 */
export async function getRecoveryMetrics(
    orgId: string,
    days: number = 30
): Promise<RecoveryMetricsDetail | null> {
    try {
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        const { data: carts, error } = await supabase
            .from('abandoned_carts')
            .select('*')
            .eq('org_id', orgId)
            .gte('created_at', startDate.toISOString())

        if (error) throw error

        const totalAbandoned = carts?.length || 0
        const messageSent = carts?.filter((c) => c.recovery_status !== 'pending').length || 0
        const clicked = carts?.filter((c) => c.recovery_status === 'clicked' || c.recovery_status === 'recovered').length || 0
        const recovered = carts?.filter((c) => c.recovery_status === 'recovered').length || 0

        const recoveryRevenue = carts
            ?.filter((c) => c.recovery_status === 'recovered')
            .reduce((sum, c) => sum + (c.cart_total || 0), 0) || 0

        // Custo estimado por mensagem WhatsApp
        const costPerMessage = 0.0079 // USD por mensagem
        const recoveryCost = messageSent * costPerMessage * 5 // Converter para BRL

        const recoveryRoi = recoveryCost > 0 ? (recoveryRevenue / recoveryCost) * 100 : 0

        // Calcular tempo médio de recuperação
        const recoveredCarts = carts?.filter((c) => c.recovery_status === 'recovered') || []
        const avgTime =
            recoveredCarts.length > 0
                ? recoveredCarts.reduce((sum, c) => {
                    const created = new Date(c.created_at).getTime()
                    const recovered_at = new Date(c.recovered_at || 0).getTime()
                    return sum + (recovered_at - created) / (1000 * 60 * 60)
                }, 0) / recoveredCarts.length
                : 0

        return {
            total_abandoned: totalAbandoned,
            message_sent: messageSent,
            clicked,
            recovered,
            recovery_revenue: recoveryRevenue,
            recovery_cost: recoveryCost,
            recovery_roi: recoveryRoi,
            average_time_to_recovery: avgTime,
        }
    } catch (error) {
        console.error('❌ Erro ao obter métricas de recovery:', error)
        return null
    }
}
