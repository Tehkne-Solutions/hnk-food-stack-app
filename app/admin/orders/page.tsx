'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, CheckCircle, Clock, Truck, Eye, Download, Phone, MapPin, Calendar, TrendingUp } from 'lucide-react'

interface OrderItem {
    name: string
    qty: number
    price: number
}

interface Order {
    id: string
    customer_name: string
    customer_phone: string
    customer_address: string
    total_price: number
    status: 'pendente' | 'preparando' | 'entregue'
    items_count: number
    created_at: string
    items: OrderItem[]
}

const mockOrders: Order[] = [
    {
        id: 'PED-001',
        customer_name: 'João Silva',
        customer_phone: '(11) 99999-0001',
        customer_address: 'Rua A, 123 - São Paulo, SP',
        total_price: 245.90,
        status: 'preparando',
        items_count: 3,
        created_at: '2025-01-27T14:30:00',
        items: [
            { name: 'Churrasco Misto', qty: 2, price: 85.00 },
            { name: 'Refrigerante 2L', qty: 1, price: 8.90 }
        ]
    },
    {
        id: 'PED-002',
        customer_name: 'Maria Santos',
        customer_phone: '(11) 99999-0002',
        customer_address: 'Av. B, 456 - São Paulo, SP',
        total_price: 189.50,
        status: 'pendente',
        items_count: 2,
        created_at: '2025-01-27T15:15:00',
        items: [
            { name: 'Espetinho Misto', qty: 3, price: 65.00 }
        ]
    },
    {
        id: 'PED-003',
        customer_name: 'Pedro Costa',
        customer_phone: '(11) 99999-0003',
        customer_address: 'Rua C, 789 - São Paulo, SP',
        total_price: 312.00,
        status: 'entregue',
        items_count: 4,
        created_at: '2025-01-27T12:45:00',
        items: [
            { name: 'Rodízio (4 pessoas)', qty: 1, price: 280.00 },
            { name: 'Bebidas', qty: 1, price: 32.00 }
        ]
    },
    {
        id: 'PED-004',
        customer_name: 'Ana Oliveira',
        customer_phone: '(11) 99999-0004',
        customer_address: 'Av. D, 321 - São Paulo, SP',
        total_price: 156.75,
        status: 'preparando',
        items_count: 2,
        created_at: '2025-01-27T16:00:00',
        items: [
            { name: 'Churrasco Bovino', qty: 1, price: 95.00 }
        ]
    },
    {
        id: 'PED-005',
        customer_name: 'Carlos Mendes',
        customer_phone: '(11) 99999-0005',
        customer_address: 'Rua E, 654 - São Paulo, SP',
        total_price: 201.50,
        status: 'pendente',
        items_count: 3,
        created_at: '2025-01-27T16:30:00',
        items: [
            { name: 'Costela Bovina', qty: 1, price: 110.00 },
            { name: 'Acompanhamentos', qty: 1, price: 91.50 }
        ]
    },
]

const statusConfig = {
    pendente: { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50', icon: Clock, label: 'Pendente' },
    preparando: { color: 'bg-blue-500/20 text-blue-300 border-blue-500/50', icon: Truck, label: 'Preparando' },
    entregue: { color: 'bg-green-500/20 text-green-300 border-green-500/50', icon: CheckCircle, label: 'Entregue' }
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders)
    const [filterStatus, setFilterStatus] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const filteredOrders = orders.filter(o => {
        const matchStatus = !filterStatus || o.status === filterStatus
        const matchSearch = !searchTerm ||
            o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.id.includes(searchTerm)
        return matchStatus && matchSearch
    })

    const stats = {
        total: orders.length,
        pendente: orders.filter(o => o.status === 'pendente').length,
        preparando: orders.filter(o => o.status === 'preparando').length,
        entregue: orders.filter(o => o.status === 'entregue').length,
        revenue: orders.reduce((sum, o) => sum + o.total_price, 0)
    }

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
                        Pedidos <span className="text-amber-500">Recentes</span>
                    </h1>
                    <p className="text-zinc-400 mt-2">Gerencie todos os pedidos • Total: {stats.total} pedidos</p>
                </div>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg flex items-center gap-2 transition-colors">
                    <Download size={18} />
                    Exportar
                </button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: stats.total, color: 'from-blue-500/20 to-cyan-500/10' },
                    { label: 'Pendentes', value: stats.pendente, color: 'from-yellow-500/20 to-orange-500/10' },
                    { label: 'Preparando', value: stats.preparando, color: 'from-purple-500/20 to-pink-500/10' },
                    { label: 'Receita', value: `R$ ${stats.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'from-green-500/20 to-emerald-500/10' }
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-lg border border-zinc-800/50 bg-gradient-to-br ${stat.color} p-4 backdrop-blur-md`}
                    >
                        <p className="text-xs text-zinc-400 font-semibold">{stat.label}</p>
                        <p className="text-2xl font-black text-white mt-2">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters and Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 p-4 backdrop-blur-md space-y-4"
            >
                <div className="flex items-center gap-2 bg-zinc-950 rounded-lg px-4 py-2 border border-zinc-800">
                    <Search size={18} className="text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Buscar por cliente ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={18} className="text-zinc-400" />
                    <button
                        onClick={() => setFilterStatus('')}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${!filterStatus ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                    >
                        Todos ({stats.total})
                    </button>
                    {Object.entries(statusConfig).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setFilterStatus(key)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${filterStatus === key
                                ? 'bg-amber-500 text-black'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            <config.icon size={16} />
                            {config.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Orders Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">ID</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Cliente</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Itens</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Total</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Status</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Horário</th>
                                <th className="px-6 py-4 text-center font-bold text-zinc-300">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredOrders.map((order) => {
                                const config = statusConfig[order.status]
                                const Icon = config.icon
                                return (
                                    <tr key={order.id} className="hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-bold text-amber-500">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-white">{order.customer_name}</p>
                                            <p className="text-xs text-zinc-500">{order.customer_phone}</p>
                                        </td>
                                        <td className="px-6 py-4 text-white">{order.items_count} itens</td>
                                        <td className="px-6 py-4 font-mono font-bold text-amber-400">
                                            R$ {order.total_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${config.color}`}>
                                                <Icon size={14} />
                                                {config.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 text-xs">
                                            {new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-amber-500 hover:text-amber-400 transition-colors"
                                            >
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

            {/* Order Detail Modal */}
            {selectedOrder && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedOrder(null)}
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-white">Detalhes do Pedido {selectedOrder.id}</h2>
                            <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-white text-2xl">×</button>
                        </div>

                        <div className="space-y-6">
                            {/* Client Info */}
                            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-zinc-800">
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">CLIENTE</p>
                                    <p className="text-white font-semibold">{selectedOrder.customer_name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">TELEFONE</p>
                                    <p className="text-white font-semibold flex items-center gap-2">
                                        <Phone size={14} /> {selectedOrder.customer_phone}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">ENDEREÇO</p>
                                    <p className="text-white font-semibold flex items-center gap-2">
                                        <MapPin size={14} /> {selectedOrder.customer_address}
                                    </p>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <p className="text-xs text-zinc-400 font-semibold mb-3">ITENS DO PEDIDO</p>
                                <div className="space-y-2 bg-zinc-900/50 rounded-lg p-4">
                                    {selectedOrder.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-white pb-2 border-b border-zinc-800 last:border-0">
                                            <span>{item.name} × {item.qty}</span>
                                            <span className="font-mono font-bold">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total and Status */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">TOTAL</p>
                                    <p className="text-3xl font-black text-amber-500">R$ {selectedOrder.total_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className={`px-6 py-3 rounded-lg border font-bold flex items-center gap-2 ${statusConfig[selectedOrder.status].color}`}>
                                    <statusConfig[selectedOrder.status].icon size={20} />
                                    {statusConfig[selectedOrder.status].label}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-colors">
                                    Atualizar Status
                                </button>
                                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors" onClick={() => setSelectedOrder(null)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
