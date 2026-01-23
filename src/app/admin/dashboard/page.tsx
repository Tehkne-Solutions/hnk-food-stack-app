'use client'

/**
 * 📊 FASE 5: Dashboard BI Principal
 */

import { useState, useEffect } from 'react'
import { useTenant } from '@/providers/tenant-provider'
import { getDashboardMetrics, getConversionFunnel } from '@/services/dashboard'
import { DashboardMetrics, ConversionFunnelData } from '@/types/dashboard'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Zap } from 'lucide-react'

type DateRangeType = '1d' | '7d' | '30d'

export default function DashboardPage() {
    const tenant = useTenant()
    const [dateRange, setDateRange] = useState<DateRangeType>('30d')
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
    const [funnel, setFunnel] = useState<ConversionFunnelData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadMetrics = async () => {
            try {
                if (!tenant.organization) return

                const daysMap = { '1d': 1, '7d': 7, '30d': 30 }
                const days = daysMap[dateRange]

                const [metricsRes, funnelRes] = await Promise.all([
                    getDashboardMetrics(tenant.organization.id, days),
                    getConversionFunnel(tenant.organization.id, days),
                ])

                if (metricsRes.success && metricsRes.metrics) {
                    setMetrics(metricsRes.metrics)
                }

                setFunnel(funnelRes)
                setError(null)
            } catch (err) {
                console.error('Erro ao carregar métricas:', err)
                setError('Falha ao carregar dados do dashboard')
            } finally {
                setLoading(false)
            }
        }

        loadMetrics()
    }, [dateRange, tenant.organization])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-[#d97706]"></div>
                    <p className="text-gray-400 mt-4">Carregando dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] p-8">
                <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <div className="bg-[#1a1a1a] border-b border-gray-800 p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">📊 Dashboard</h1>
                        <p className="text-gray-400">
                            {tenant.organization?.name || 'Seu Restaurante'}
                        </p>
                    </div>

                    {/* Date Range Selector */}
                    <div className="flex gap-2">
                        {(['1d', '7d', '30d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-4 py-2 rounded-lg font-semibold transition ${dateRange === range
                                        ? 'bg-[#d97706] text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {range === '1d' ? 'Hoje' : range === '7d' ? '7 dias' : '30 dias'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 pb-8">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Revenue Card */}
                    <MetricCard
                        title="Revenue Hoje"
                        value={`R$ ${metrics?.revenue_today.toFixed(2)}`}
                        subtitle="Vendas do dia"
                        icon={<TrendingUp className="w-6 h-6 text-[#d97706]" />}
                        trend={5}
                    />

                    {/* Orders Card */}
                    <MetricCard
                        title="Pedidos"
                        value={`${metrics?.orders_today || 0}`}
                        subtitle={`Total: ${metrics?.orders_total || 0}`}
                        icon={<Zap className="w-6 h-6 text-blue-500" />}
                        trend={2}
                    />

                    {/* Conversion Card */}
                    <MetricCard
                        title="Taxa de Conversão"
                        value={`${metrics?.conversion_rate.toFixed(1)}%`}
                        subtitle="Visitantes → Compra"
                        icon={<ArrowUpRight className="w-6 h-6 text-green-500" />}
                        trend={0.5}
                    />

                    {/* Recovery Brain ROI */}
                    <MetricCard
                        title="Recovery ROI"
                        value={`${metrics?.recovery_brain_roi.toFixed(0)}x`}
                        subtitle={`R$ ${metrics?.recovery_revenue.toFixed(0)} recuperados`}
                        icon={<TrendingUp className="w-6 h-6 text-[#25d366]" />}
                        trend={15}
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sales Trend Chart Placeholder */}
                    <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                        <h2 className="text-xl font-bold mb-6">📈 Vendas (Últimos {dateRange === '1d' ? 'dia' : dateRange === '7d' ? '7 dias' : '30 dias'})</h2>
                        <div className="h-80 bg-[#0a0a0a] rounded flex items-center justify-center">
                            <p className="text-gray-500">Chart será renderizado com Recharts</p>
                        </div>
                    </div>

                    {/* Top Products Chart Placeholder */}
                    <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                        <h2 className="text-xl font-bold mb-6">🏆 Top 5 Produtos</h2>
                        <div className="space-y-4">
                            {metrics?.top_products.map((product) => (
                                <div key={product.product_id} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-semibold">{product.name}</p>
                                        <div className="w-full bg-gray-700 rounded h-2 mt-2">
                                            <div
                                                className="bg-[#d97706] h-2 rounded transition-all duration-300"
                                                style={{ width: `${product.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="font-bold">R$ {product.revenue.toFixed(0)}</p>
                                        <p className="text-sm text-gray-400">{product.percentage.toFixed(1)}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conversion Funnel */}
                    <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                        <h2 className="text-xl font-bold mb-6">🔗 Funnel de Conversão</h2>
                        <div className="space-y-4">
                            {funnel.map((stage) => (
                                <div key={stage.stage}>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold capitalize">{stage.stage}</p>
                                        <p className="text-gray-400">
                                            {stage.count.toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-[#d97706] h-3 rounded transition-all duration-300"
                                            style={{ width: `${stage.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {stage.percentage.toFixed(1)}% ({stage.conversion_from_previous.toFixed(0)}% do anterior)
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recovery Brain Stats */}
                    <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                        <h2 className="text-xl font-bold mb-6">🧠 Recovery Brain Stats</h2>
                        <div className="space-y-4">
                            <StatRow
                                label="Carrinhos Abandonados"
                                value={metrics?.recovery_brain_roi}
                                info="Total"
                            />
                            <StatRow
                                label="Mensagens Enviadas"
                                value={metrics?.recovery_brain_roi}
                                info="WhatsApp"
                            />
                            <StatRow
                                label="Taxa de Conversão"
                                value={metrics?.recovery_conversion_rate}
                                info={`${metrics?.recovery_conversion_rate.toFixed(1)}%`}
                            />
                            <StatRow
                                label="Revenue Recuperada"
                                value={metrics?.recovery_revenue}
                                info={`R$ ${metrics?.recovery_revenue.toFixed(2)}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Componentes auxiliares
 */

interface MetricCardProps {
    title: string
    value: string
    subtitle: string
    icon: React.ReactNode
    trend: number
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
    const isPositive = trend >= 0

    return (
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 hover:border-[#d97706]/30 transition">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-400 text-sm mb-1">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                {icon}
            </div>

            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">{subtitle}</p>
                <div
                    className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'
                        }`}
                >
                    {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {Math.abs(trend).toFixed(1)}%
                </div>
            </div>
        </div>
    )
}

interface StatRowProps {
    label: string
    value?: number
    info: string | number
}

function StatRow({ label, value, info }: StatRowProps) {
    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-700 last:border-0">
            <p className="text-gray-400">{label}</p>
            <div className="text-right">
                <p className="font-bold text-[#d97706]">{info}</p>
            </div>
        </div>
    )
}
