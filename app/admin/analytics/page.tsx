'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Eye, Click, ShoppingCart, DollarSign, Calendar } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('30d')

    // Dados de tráfego
    const trafficData = [
        { date: '01/01', visits: 2400, sessions: 1200, bounceRate: 28 },
        { date: '02/01', visits: 1398, sessions: 900, bounceRate: 32 },
        { date: '03/01', visits: 9800, sessions: 5600, bounceRate: 22 },
        { date: '04/01', visits: 3908, sessions: 2300, bounceRate: 35 },
        { date: '05/01', visits: 4800, sessions: 2800, bounceRate: 25 },
        { date: '06/01', visits: 3800, sessions: 2200, bounceRate: 30 },
        { date: '07/01', visits: 4300, sessions: 2500, bounceRate: 24 },
    ]

    // Dados de conversão
    const conversionData = [
        { date: '01/01', visits: 100, addToCart: 24, checkout: 12, purchase: 8 },
        { date: '02/01', visits: 150, addToCart: 42, checkout: 24, purchase: 12 },
        { date: '03/01', visits: 280, addToCart: 68, checkout: 35, purchase: 20 },
        { date: '04/01', visits: 200, addToCart: 52, checkout: 26, purchase: 14 },
        { date: '05/01', visits: 220, addToCart: 58, checkout: 29, purchase: 16 },
        { date: '06/01', visits: 190, addToCart: 48, checkout: 24, purchase: 13 },
        { date: '07/01', visits: 260, addToCart: 65, checkout: 32, purchase: 18 },
    ]

    // Dados de fonte de tráfego
    const trafficSourceData = [
        { source: 'Organic Search', visitors: 8500, conversion: 3.2, revenue: 14250 },
        { source: 'Paid Search', visitors: 5200, conversion: 5.8, revenue: 18720 },
        { source: 'Social Media', visitors: 4300, conversion: 2.1, revenue: 6090 },
        { source: 'Direct', visitors: 3100, conversion: 4.5, revenue: 11160 },
        { source: 'Email', visitors: 2800, conversion: 6.2, revenue: 13216 },
    ]

    const kpis = [
        {
            label: 'Visitantes',
            value: '28,400',
            change: '+12.5%',
            trend: 'up',
            icon: Eye,
            color: 'from-blue-500/20 to-cyan-500/10'
        },
        {
            label: 'Cliques',
            value: '156,800',
            change: '+8.3%',
            trend: 'up',
            icon: Click,
            color: 'from-purple-500/20 to-pink-500/10'
        },
        {
            label: 'Carrinho',
            value: '2,450',
            change: '+15.7%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'from-amber-500/20 to-orange-500/10'
        },
        {
            label: 'Receita',
            value: 'R$ 84,500',
            change: '+22.1%',
            trend: 'up',
            icon: DollarSign,
            color: 'from-green-500/20 to-emerald-500/10'
        },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">Análise Detalhada</h1>
                    <p className="mt-1 text-zinc-400">Métricas e insights do seu e-commerce</p>
                </div>
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                >
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                    <option value="1y">Último ano</option>
                </select>
            </motion.div>

            {/* KPI Cards */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon
                    const isPositive = kpi.trend === 'up'

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-lg border border-zinc-800 bg-gradient-to-br ${kpi.color}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Icon size={24} className="text-amber-500" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    {kpi.change}
                                </div>
                            </div>
                            <p className="text-zinc-400 text-sm mb-1">{kpi.label}</p>
                            <p className="text-2xl font-bold text-white">{kpi.value}</p>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50"
                >
                    <h3 className="text-lg font-bold text-white mb-4">Tendência de Tráfego</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={trafficData}>
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis dataKey="date" stroke="#71717a" />
                            <YAxis stroke="#71717a" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#18181b',
                                    border: '1px solid #3f3f46'
                                }}
                                formatter={(value) => `${value.toLocaleString()}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="visits"
                                stroke="#f59e0b"
                                fillOpacity={1}
                                fill="url(#colorVisits)"
                                name="Visitantes"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Conversion Funnel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50"
                >
                    <h3 className="text-lg font-bold text-white mb-4">Funil de Conversão</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={conversionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis dataKey="date" stroke="#71717a" />
                            <YAxis stroke="#71717a" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#18181b',
                                    border: '1px solid #3f3f46'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="addToCart" fill="#3b82f6" name="Carrinho" />
                            <Bar dataKey="checkout" fill="#f59e0b" name="Checkout" />
                            <Bar dataKey="purchase" fill="#10b981" name="Compra" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Traffic Sources */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50"
            >
                <h3 className="text-lg font-bold text-white mb-4">Fontes de Tráfego</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Fonte</th>
                                <th className="text-right py-3 px-4 font-semibold text-zinc-300">Visitantes</th>
                                <th className="text-right py-3 px-4 font-semibold text-zinc-300">Taxa Conv.</th>
                                <th className="text-right py-3 px-4 font-semibold text-zinc-300">Receita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trafficSourceData.map((source, idx) => (
                                <tr key={idx} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all">
                                    <td className="py-3 px-4 text-zinc-200">{source.source}</td>
                                    <td className="text-right py-3 px-4 text-zinc-300">{source.visitors.toLocaleString()}</td>
                                    <td className="text-right py-3 px-4 text-green-400 font-semibold">{source.conversion}%</td>
                                    <td className="text-right py-3 px-4 text-white font-semibold">
                                        R$ {source.revenue.toLocaleString('pt-BR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}
