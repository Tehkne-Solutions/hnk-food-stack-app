'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, DollarSign, ShoppingBag, Mail, Eye, Search, Filter, TrendingUp, Users, Award } from 'lucide-react'

interface Customer {
    id: string
    name: string
    phone: string
    email: string
    address: string
    total_spent: number
    orders_count: number
    last_order: string
    lifetime_value: number
    first_order: string
}

const mockCustomers: Customer[] = [
    {
        id: '1',
        name: 'João Silva',
        phone: '(11) 99999-0001',
        email: 'joao@email.com',
        address: 'Rua A, 123 - São Paulo, SP',
        total_spent: 567.80,
        orders_count: 5,
        last_order: '2025-01-26',
        lifetime_value: 567.80,
        first_order: '2024-06-15'
    },
    {
        id: '2',
        name: 'Maria Santos',
        phone: '(11) 99999-0002',
        email: 'maria@email.com',
        address: 'Av. B, 456 - São Paulo, SP',
        total_spent: 1250.00,
        orders_count: 12,
        last_order: '2025-01-25',
        lifetime_value: 1250.00,
        first_order: '2024-02-10'
    },
    {
        id: '3',
        name: 'Pedro Costa',
        phone: '(11) 99999-0003',
        email: 'pedro@email.com',
        address: 'Rua C, 789 - São Paulo, SP',
        total_spent: 340.50,
        orders_count: 3,
        last_order: '2025-01-20',
        lifetime_value: 340.50,
        first_order: '2024-12-01'
    },
    {
        id: '4',
        name: 'Ana Oliveira',
        phone: '(11) 99999-0004',
        email: 'ana@email.com',
        address: 'Av. D, 321 - São Paulo, SP',
        total_spent: 892.50,
        orders_count: 8,
        last_order: '2025-01-27',
        lifetime_value: 892.50,
        first_order: '2024-05-22'
    },
    {
        id: '5',
        name: 'Carlos Mendes',
        phone: '(11) 99999-0005',
        email: 'carlos@email.com',
        address: 'Rua E, 654 - São Paulo, SP',
        total_spent: 450.75,
        orders_count: 4,
        last_order: '2025-01-24',
        lifetime_value: 450.75,
        first_order: '2024-09-08'
    },
]

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

    const filteredCustomers = customers.filter(c => {
        const matchSearch = !searchTerm ||
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm) ||
            c.email.includes(searchTerm)
        return matchSearch
    })

    const stats = {
        total: customers.length,
        totalSpent: customers.reduce((sum, c) => sum + c.total_spent, 0),
        avgSpent: customers.reduce((sum, c) => sum + c.total_spent, 0) / customers.length,
        totalOrders: customers.reduce((sum, c) => sum + c.orders_count, 0)
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
                        Clientes <span className="text-amber-500">VIP</span>
                    </h1>
                    <p className="text-zinc-400 mt-2">Gerencie relacionamento com clientes • Total: {stats.total} clientes</p>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total de Clientes', value: stats.total, color: 'from-blue-500/20 to-cyan-500/10', icon: Users },
                    { label: 'Receita Total', value: `R$ ${stats.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'from-green-500/20 to-emerald-500/10', icon: DollarSign },
                    { label: 'Ticket Médio', value: `R$ ${stats.avgSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'from-purple-500/20 to-pink-500/10', icon: TrendingUp },
                    { label: 'Total de Pedidos', value: stats.totalOrders, color: 'from-orange-500/20 to-amber-500/10', icon: ShoppingBag }
                ].map((stat, i) => {
                    const StatIcon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`rounded-lg border border-zinc-800/50 bg-gradient-to-br ${stat.color} p-4 backdrop-blur-md`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold">{stat.label}</p>
                                    <p className="text-2xl font-black text-white mt-2">{stat.value}</p>
                                </div>
                                <StatIcon size={24} className="text-zinc-500" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 p-4 backdrop-blur-md"
            >
                <div className="flex items-center gap-2 bg-zinc-950 rounded-lg px-4 py-2 border border-zinc-800">
                    <Search size={18} className="text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
                    />
                </div>
            </motion.div>

            {/* Customers Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Cliente</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Contato</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Pedidos</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Gasto Total</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Ticket Médio</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Último Pedido</th>
                                <th className="px-6 py-4 text-center font-bold text-zinc-300">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-white">{customer.name}</p>
                                            <p className="text-xs text-zinc-500">{customer.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`tel:${customer.phone}`} className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors">
                                            <Phone size={16} />
                                            <span className="text-xs">{customer.phone}</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2 text-white">
                                        <ShoppingBag size={16} className="text-zinc-500" />
                                        {customer.orders_count}
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold text-green-400">
                                        R$ {customer.total_spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold text-amber-400">
                                        R$ {(customer.total_spent / customer.orders_count).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400 text-xs">
                                        {new Date(customer.last_order).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => setSelectedCustomer(customer)}
                                            className="text-amber-500 hover:text-amber-400 transition-colors"
                                            title="Ver detalhes"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Customer Detail Modal */}
            {selectedCustomer && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedCustomer(null)}
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-white">Perfil do Cliente</h2>
                            <button onClick={() => setSelectedCustomer(null)} className="text-zinc-400 hover:text-white text-2xl">×</button>
                        </div>

                        <div className="space-y-6">
                            {/* Client Info */}
                            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-zinc-800">
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">NOME</p>
                                    <p className="text-white font-semibold">{selectedCustomer.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">EMAIL</p>
                                    <p className="text-white font-semibold break-all">{selectedCustomer.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">TELEFONE</p>
                                    <p className="text-white font-semibold flex items-center gap-2">
                                        <Phone size={14} /> {selectedCustomer.phone}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">CLIENTE DESDE</p>
                                    <p className="text-white font-semibold">
                                        {new Date(selectedCustomer.first_order).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-zinc-400 font-semibold mb-1">ENDEREÇO</p>
                                    <p className="text-white font-semibold flex items-center gap-2">
                                        <MapPin size={14} /> {selectedCustomer.address}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-zinc-900/50 rounded-lg p-4">
                                    <p className="text-xs text-zinc-400 font-semibold">TOTAL GASTO</p>
                                    <p className="text-2xl font-black text-green-400 mt-2">
                                        R$ {selectedCustomer.total_spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div className="bg-zinc-900/50 rounded-lg p-4">
                                    <p className="text-xs text-zinc-400 font-semibold">TOTAL DE PEDIDOS</p>
                                    <p className="text-2xl font-black text-amber-400 mt-2">{selectedCustomer.orders_count}</p>
                                </div>
                                <div className="bg-zinc-900/50 rounded-lg p-4">
                                    <p className="text-xs text-zinc-400 font-semibold">TICKET MÉDIO</p>
                                    <p className="text-2xl font-black text-blue-400 mt-2">
                                        R$ {(selectedCustomer.total_spent / selectedCustomer.orders_count).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-colors">
                                    Enviar Promoção
                                </button>
                                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors" onClick={() => setSelectedCustomer(null)}>
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
