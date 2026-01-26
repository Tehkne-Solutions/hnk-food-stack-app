'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, DollarSign, ShoppingBag } from 'lucide-react'

interface Customer {
    id: string
    name: string
    phone: string
    email: string
    total_spent: number
    orders_count: number
    last_order: string
}

const mockCustomers: Customer[] = [
    {
        id: '1',
        name: 'Joao Silva',
        phone: '(11) 99999-0001',
        email: 'joao@email.com',
        total_spent: 567.80,
        orders_count: 5,
        last_order: '2025-01-26'
    },
    {
        id: '2',
        name: 'Maria Santos',
        phone: '(11) 99999-0002',
        email: 'maria@email.com',
        total_spent: 1250.00,
        orders_count: 12,
        last_order: '2025-01-25'
    },
    {
        id: '3',
        name: 'Pedro Costa',
        phone: '(11) 99999-0003',
        email: 'pedro@email.com',
        total_spent: 340.50,
        orders_count: 3,
        last_order: '2025-01-20'
    }
]

export default function CustomersPage() {
    const [customers] = useState<Customer[]>(mockCustomers)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black italic text-white">Clientes</h1>
                <p className="text-zinc-400">Conheca melhor quem compra na Bem Estar</p>
            </div>

            <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Cliente</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Contato</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Pedidos</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Gasto Total</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Ultimo Pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-white">{customer.name}</p>
                                            <p className="text-xs text-zinc-500">{customer.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`tel:${customer.phone}`} className="flex items-center gap-2 text-amber-500 hover:text-amber-400">
                                            <Phone size={16} />
                                            {customer.phone}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2 text-white">
                                        <ShoppingBag size={16} className="text-zinc-500" />
                                        {customer.orders_count}
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                                        R$ {customer.total_spent.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">
                                        {new Date(customer.last_order).toLocaleDateString('pt-BR')}
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
