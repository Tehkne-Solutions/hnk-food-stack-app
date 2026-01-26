'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, ShoppingBag, Users, AlertCircle, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        salesToday: 0,
        salesWeek: 0,
        salesMonth: 0,
        ordersToday: 0,
        ordersPending: 0,
        activeCustomers: 0,
        lowStockProducts: 0
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black italic text-white">Dashboard</h1>
                <p className="text-zinc-400">Bem-vindo de volta, Seu Junior!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card: Vendas Hoje */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Vendas Hoje</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-amber-500">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">
                        R$ {stats.salesToday.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                </motion.div>

                {/* Card: Pedidos Pendentes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-red-500/20 to-pink-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Pendentes</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-red-500">
                            <ShoppingBag size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">{stats.ordersPending}</div>
                </motion.div>

                {/* Card: Clientes Ativos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Clientes</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-blue-500">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">{stats.activeCustomers}</div>
                </motion.div>

                {/* Card: Estoque Baixo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Estoque Baixo</h3>
                        <div className="rounded-lg bg-zinc-900/50 p-2 text-yellow-500">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white">{stats.lowStockProducts}</div>
                </motion.div>
            </div>

            {/* Section: Últimos Pedidos */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 backdrop-blur-md"
            >
                <h2 className="mb-4 text-xl font-black italic text-white">Últimos <span className="text-amber-500">Pedidos</span></h2>
                <div className="space-y-3">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">#PED-001</p>
                            <p className="text-sm text-zinc-400">João Silva - R$ 189.90</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">Preparando</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
