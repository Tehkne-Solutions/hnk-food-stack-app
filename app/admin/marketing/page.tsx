'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, BarChart3, Download } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ConversionFunnel } from '@/components/admin/ConversionFunnel'
import { UTMLinkBuilder } from '@/components/admin/UTMLinkBuilder'
import { TrafficSourceChart } from '@/components/admin/TrafficSourceChart'

interface Campaign {
    id: string
    name: string
    source: string
    clicks: number
    conversions: number
    revenue: number
    roi: number
}

const mockCampaigns: Campaign[] = [
    {
        id: '1',
        name: 'Google Ads - Picanha',
        source: 'google_ads',
        clicks: 1250,
        conversions: 45,
        revenue: 4500.00,
        roi: 320
    },
    {
        id: '2',
        name: 'Meta Ads - Brand',
        source: 'meta',
        clicks: 2100,
        conversions: 78,
        revenue: 7800.00,
        roi: 280
    },
    {
        id: '3',
        name: 'Instagram Organico',
        source: 'organic',
        clicks: 890,
        conversions: 32,
        revenue: 3200.00,
        roi: 150
    }
]

// Dados para gráfico de tendências de conversão
const conversionTrendData = [
    { week: 'Semana 1', ctr: 2.1, revenue: 8500 },
    { week: 'Semana 2', ctr: 2.4, revenue: 9200 },
    { week: 'Semana 3', ctr: 2.8, revenue: 11500 },
    { week: 'Semana 4', ctr: 3.2, revenue: 15500 }
]

// Dados para comparação de ROI por campanha
const roiComparisonData = [
    { campaign: 'Google Ads', roi: 320, cpc: 8.50 },
    { campaign: 'Meta Ads', roi: 280, cpc: 5.20 },
    { campaign: 'Organico', roi: 150, cpc: 0 }
]

export default function MarketingPage() {
    const [campaigns] = useState<Campaign[]>(mockCampaigns)

    const funnelData = {
        views: 12500,
        addToCart: 1250,
        purchases: 155
    }

    const trafficSources = [
        { name: 'Google Ads', value: 3500, color: '#3b82f6', icon: '📱' },
        { name: 'Meta Ads', value: 2850, color: '#8b5cf6', icon: '👍' },
        { name: 'Organico', value: 1200, color: '#10b981', icon: '🔍' },
        { name: 'Direto', value: 950, color: '#f59e0b', icon: '🎯' },
    ]

    const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0)
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
    const avgRoi = Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-4xl font-black italic text-white">
                        Marketing <span className="text-amber-500">Intelligence</span>
                    </h1>
                    <p className="text-zinc-400 mt-2">Analytics, UTM tracking, ROI de campanhas em tempo real</p>
                </div>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg flex items-center gap-2 transition-colors">
                    <Download size={18} />
                    Relatório
                </button>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Receita Total</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-amber-500">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">
                        R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Conversoes</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-blue-500">
                            <Target size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">{totalConversions}</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-emerald-500/20 to-green-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">ROI Medio</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-emerald-500">
                            <BarChart3 size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">{avgRoi}%</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-purple-500/20 to-pink-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Campanhas Ativas</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-purple-500">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">{campaigns.length}</div>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tendência de Conversão */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 backdrop-blur-md"
                >
                    <h2 className="text-xl font-black italic text-white mb-6">
                        Tendência de <span className="text-amber-500">Conversão</span>
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={conversionTrendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis dataKey="week" stroke="#71717a" />
                            <YAxis stroke="#71717a" yAxisId="left" />
                            <YAxis stroke="#71717a" yAxisId="right" orientation="right" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="ctr" stroke="#f59e0b" strokeWidth={3} name="CTR %" dot={{ fill: '#f59e0b' }} />
                            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Receita (R$)" dot={{ fill: '#10b981' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* ROI por Campanha */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 backdrop-blur-md"
                >
                    <h2 className="text-xl font-black italic text-white mb-6">
                        ROI por <span className="text-amber-500">Campanha</span>
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={roiComparisonData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis dataKey="campaign" stroke="#71717a" />
                            <YAxis stroke="#71717a" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Bar dataKey="roi" fill="#f59e0b" name="ROI %" />
                            <Bar dataKey="cpc" fill="#3b82f6" name="CPC (R$)" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md">
                <div className="p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-black italic text-white">
                        Funil de <span className="text-amber-500">Conversao</span>
                    </h2>
                </div>
                <div className="p-6">
                    <ConversionFunnel data={funnelData} />
                </div>
            </motion.div>

            <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
                <div className="p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-black italic text-white">
                        Construtor de Links <span className="text-amber-500">UTM</span>
                    </h2>
                    <p className="text-sm text-zinc-400 mt-2">Crie links rastreáveis para suas campanhas</p>
                </div>
                <div className="p-6">
                    <UTMLinkBuilder />
                </div>
            </motion.div>

            <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
                <div className="p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-black italic text-white">
                        Trafego por <span className="text-amber-500">Fonte</span>
                    </h2>
                </div>
                <div className="p-6">
                    <TrafficSourceChart sources={trafficSources} />
                </div>
            </motion.div>

            <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
                <div className="p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-black italic text-white">
                        Desempenho das <span className="text-amber-500">Campanhas</span>
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Campanha</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Fonte</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Cliques</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Conversoes</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Receita</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">ROI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign) => {
                                const conversionRate = ((campaign.conversions / campaign.clicks) * 100).toFixed(2)
                                return (
                                    <tr key={campaign.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-white">{campaign.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 rounded-full bg-zinc-800/50 text-xs font-bold text-zinc-300">
                                                {campaign.source}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white">{campaign.clicks.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-white">{campaign.conversions}</p>
                                                <p className="text-xs text-zinc-500">{conversionRate}% CTR</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                                            R$ {campaign.revenue.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                                                {campaign.roi}%
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}
