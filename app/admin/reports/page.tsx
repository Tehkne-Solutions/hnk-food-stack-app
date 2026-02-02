'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Calendar, BarChart3, FileText, PieChart, TrendingUp } from 'lucide-react'

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState('week')

    const reports = [
        {
            id: 1,
            title: 'Relatório de Vendas',
            description: 'Análise detalhada de vendas, produtos mais vendidos e receita',
            icon: BarChart3,
            color: 'from-blue-500/20 to-cyan-500/10',
            format: ['PDF', 'CSV', 'XLSX']
        },
        {
            id: 2,
            title: 'Relatório de Clientes',
            description: 'Dados de clientes, ticket médio, lifetime value e segmentação',
            icon: PieChart,
            color: 'from-green-500/20 to-emerald-500/10',
            format: ['PDF', 'CSV', 'XLSX']
        },
        {
            id: 3,
            title: 'Relatório de Marketing',
            description: 'Performance de campanhas, ROI, CTR e análise de conversão',
            icon: TrendingUp,
            color: 'from-amber-500/20 to-orange-500/10',
            format: ['PDF', 'CSV']
        },
        {
            id: 4,
            title: 'Relatório de Estoque',
            description: 'Inventário, produtos com estoque baixo e rotatividade',
            icon: FileText,
            color: 'from-purple-500/20 to-pink-500/10',
            format: ['PDF', 'CSV', 'XLSX']
        }
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
                    <h1 className="text-4xl font-black italic text-white">
                        Relatórios <span className="text-amber-500">Executivos</span>
                    </h1>
                    <p className="text-zinc-400 mt-2">Gere e exporte relatórios em tempo real</p>
                </div>
            </motion.div>

            {/* Date Range Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 p-6 backdrop-blur-md"
            >
                <div className="flex items-center gap-4 flex-wrap">
                    <Calendar size={20} className="text-amber-500" />
                    <span className="text-white font-semibold">Período:</span>
                    {['today', 'week', 'month', 'year', 'custom'].map(range => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${dateRange === range
                                    ? 'bg-amber-500 text-black'
                                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            {range === 'today' && 'Hoje'}
                            {range === 'week' && 'Esta Semana'}
                            {range === 'month' && 'Este Mês'}
                            {range === 'year' && 'Este Ano'}
                            {range === 'custom' && 'Personalizado'}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report, index) => {
                    const Icon = report.icon
                    return (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`rounded-xl border border-zinc-800/50 bg-gradient-to-br ${report.color} p-6 backdrop-blur-md hover:border-amber-500/50 transition-all`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-black text-white">{report.title}</h3>
                                    <p className="text-sm text-zinc-400 mt-2">{report.description}</p>
                                </div>
                                <div className="rounded-lg bg-zinc-900/50 p-3 text-amber-500">
                                    <Icon size={24} />
                                </div>
                            </div>

                            {/* Format Options */}
                            <div className="space-y-4 pt-6 border-t border-zinc-700/50">
                                <p className="text-xs text-zinc-400 font-semibold uppercase">Exportar como:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {report.format.map(format => (
                                        <button
                                            key={format}
                                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                                        >
                                            <Download size={16} />
                                            {format}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs text-zinc-500 mt-4">
                                Atualizado em: {new Date().toLocaleDateString('pt-BR')}
                            </p>
                        </motion.div>
                    )
                })}
            </div>

            {/* Recent Exports */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-6 backdrop-blur-md"
            >
                <h2 className="text-xl font-black italic text-white mb-6">
                    Histórico de <span className="text-amber-500">Exportações</span>
                </h2>

                <div className="space-y-3">
                    {[
                        { name: 'Relatório de Vendas - Jan 2026', date: '27/01/2026', size: '2.4 MB', format: 'PDF' },
                        { name: 'Relatório de Marketing - Jan 2026', date: '26/01/2026', size: '1.8 MB', format: 'XLSX' },
                        { name: 'Relatório de Clientes - Jan 2026', date: '25/01/2026', size: '3.1 MB', format: 'CSV' },
                        { name: 'Relatório de Estoque - Jan 2026', date: '24/01/2026', size: '892 KB', format: 'PDF' },
                    ].map((item, i) => (
                        <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between hover:bg-zinc-900 transition-colors group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="rounded-lg bg-amber-500/20 p-3">
                                    <FileText size={20} className="text-amber-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{item.name}</p>
                                    <p className="text-xs text-zinc-500">{item.date} • {item.size} • {item.format}</p>
                                </div>
                            </div>
                            <button className="text-amber-500 hover:text-amber-400 transition-colors group-hover:scale-110">
                                <Download size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Premium Features */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="rounded-xl border border-amber-500/50 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-6 backdrop-blur-md"
            >
                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-amber-500/20 p-3">
                        <TrendingUp size={24} className="text-amber-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-black text-white mb-2">Relatórios Automáticos</h3>
                        <p className="text-sm text-zinc-300 mb-4">
                            Configure envios automáticos de relatórios por email. Receba análises semanais, mensais ou personalizadas diretamente na sua caixa de entrada.
                        </p>
                        <button className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-colors">
                            Ativar Automação
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
