'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, CheckCircle, Clock, Truck, Eye } from 'lucide-react'

interface Order {
    id: string
    customer_name: string
    customer_phone: string
    total_price: number
    status: 'pendente' | 'preparando' | 'entregue'
    items_count: number
    created_at: string
}

const mockOrders: Order[] = [
    {
        id: 'PED-001',
        customer_name: 'Joao Silva',
        customer_phone: '(11) 99999-0001',
        total_price: 189.90,
        status: 'preparando',
        items_count: 3,
        created_at: '2025-01-26T14:30:00'
    },
    {
        id: 'PED-002',
        customer_name: 'Maria Santos',
        customer_phone: '(11) 99999-0002',
        total_price: 249.90,
        status: 'pendente',
        items_count: 5,
        created_at: '2025-01-26T14:45:00'
    },
    {
        id: 'PED-003',
        customer_name: 'Pedro Costa',
        customer_phone: '(11) 99999-0003',
        total_price: 120.00,
        status: 'entregue',
        items_count: 2,
        created_at: '2025-01-26T13:20:00'
    }
]

const statusConfig = {
    pendente: { color: 'bg-amber-500/20 text-amber-400', icon: Clock, label: 'Pendente' },
    preparando: { color: 'bg-blue-500/20 text-blue-400', icon: Truck, label: 'Preparando' },
    entregue: { color: 'bg-emerald-500/20 text-emerald-400', icon: CheckCircle, label: 'Entregue' }
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders)
    const [filterStatus, setFilterStatus] = useState<string>('')

    const filteredOrders = filterStatus
        ? orders.filter(o => o.status === filterStatus)
        : orders

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black italic text-white">Pedidos</h1>
                <p className="text-zinc-400">Gerencie todos os pedidos da Bem Estar</p>
            </div>

            <div className="flex gap-3 flex-wrap">
                <button className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${!filterStatus ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`} onClick={() => setFilterStatus('')}>
                    Todos ({orders.length})
                </button>
                {Object.entries(statusConfig).map(([key, config]) => {
                    const count = orders.filter(o => o.status === key).length
                    return (
                        <button
                            key={key}
                            onClick={() => setFilterStatus(key)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${filterStatus === key
                                    ? 'bg-amber-500 text-black'
                                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            {config.label} ({count})
                        </button>
                    )
                })}
            </div>

            <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Pedido</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Cliente</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Itens</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Valor</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Status</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const config = statusConfig[order.status]
                                const Icon = config.icon
                                return (
                                    <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-amber-500">#{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-white">{order.customer_name}</p>
                                                <p className="text-xs text-zinc-500">{order.customer_phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white">{order.items_count} itens</td>
                                        <td className="px-6 py-4 font-mono font-bold text-amber-500">
                                            R$ {order.total_price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
                                                <Icon size={14} />
                                                {config.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-amber-500 hover:text-amber-400">
                                                <Eye size={18} />
                                            </button>
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
