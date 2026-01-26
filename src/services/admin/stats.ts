/**
 * @name Stats Service (Admin)
 * @description Serviço para cálculo de estatísticas do dashboard
 * @author HNK Labs
 */

import { getOrdersByPeriod, calculateSalesTotal } from './orders'
import { getLowStockProducts } from './products'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export interface DashboardStats {
    salesToday: number
    salesWeek: number
    salesMonth: number
    ordersToday: number
    ordersPending: number
    activeCustomers: number
    lowStockProducts: number
}

/**
 * Busca estatísticas completas para o dashboard
 */
export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        const [
            ordersToday,
            ordersWeek,
            ordersMonth,
            pendingOrders,
            lowStockProds
        ] = await Promise.all([
            getOrdersByPeriod('today'),
            getOrdersByPeriod('week'),
            getOrdersByPeriod('month'),
            getPendingOrdersCount(),
            getLowStockProducts()
        ])

        const salesToday = ordersToday.reduce((sum, o) => sum + (o.total_price || 0), 0)
        const salesWeek = ordersWeek.reduce((sum, o) => sum + (o.total_price || 0), 0)
        const salesMonth = ordersMonth.reduce((sum, o) => sum + (o.total_price || 0), 0)

        return {
            salesToday,
            salesWeek,
            salesMonth,
            ordersToday: ordersToday.length,
            ordersPending: pendingOrders,
            activeCustomers: await getActiveCustomersCount(),
            lowStockProducts: lowStockProds.length
        }
    } catch (err) {
        console.error('Erro na função getDashboardStats:', err)
        return {
            salesToday: 0,
            salesWeek: 0,
            salesMonth: 0,
            ordersToday: 0,
            ordersPending: 0,
            activeCustomers: 0,
            lowStockProducts: 0
        }
    }
}

/**
 * Conta pedidos pendentes
 */
async function getPendingOrdersCount(): Promise<number> {
    try {
        const { count, error } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pendente')

        if (error) {
            console.error('Erro ao contar pedidos pendentes:', error.message)
            return 0
        }

        return count || 0
    } catch (err) {
        console.error('Erro na função getPendingOrdersCount:', err)
        return 0
    }
}

/**
 * Conta clientes ativos (últimos 7 dias)
 */
async function getActiveCustomersCount(): Promise<number> {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

        const { data, error } = await supabase
            .from('orders')
            .select('customer_phone')
            .gte('created_at', sevenDaysAgo)

        if (error) {
            console.error('Erro ao contar clientes ativos:', error.message)
            return 0
        }

        // Remove duplicatas
        const uniqueCustomers = new Set(data?.map(o => o.customer_phone) || [])
        return uniqueCustomers.size
    } catch (err) {
        console.error('Erro na função getActiveCustomersCount:', err)
        return 0
    }
}

/**
 * Busca gráfico de vendas por dia (últimos 7 dias)
 */
export async function getSalesChartData() {
    try {
        const data = []

        for (let i = 6; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            date.setHours(0, 0, 0, 0)

            const { data: orders, error } = await supabase
                .from('orders')
                .select('total_price')
                .gte('created_at', date.toISOString())
                .lt('created_at', new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString())

            if (!error) {
                const total = orders?.reduce((sum, o) => sum + (o.total_price || 0), 0) || 0
                const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })

                data.push({
                    day: dayName,
                    sales: total,
                    date: date.toISOString().split('T')[0]
                })
            }
        }

        return data
    } catch (err) {
        console.error('Erro na função getSalesChartData:', err)
        return []
    }
}

/**
 * Busca produtos mais vendidos
 */
export async function getTopSellingProducts(limit: number = 5) {
    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select('items')
            .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

        if (error) {
            console.error('Erro ao buscar produtos mais vendidos:', error.message)
            return []
        }

        const productMap = new Map()

        // Agrupa itens por produto
        orders?.forEach(order => {
            if (Array.isArray(order.items)) {
                order.items.forEach((item: any) => {
                    const key = item.id || item.name
                    productMap.set(key, (productMap.get(key) || 0) + (item.quantity || 1))
                })
            }
        })

        // Ordena e limita
        return Array.from(productMap.entries())
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, limit)
    } catch (err) {
        console.error('Erro na função getTopSellingProducts:', err)
        return []
    }
}
