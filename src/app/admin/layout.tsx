'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, BarChart3, ShoppingBag, AlertCircle, Users, LogOut, TrendingUp } from 'lucide-react'
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext'
import Link from 'next/link'

/**
 * Layout Admin com Autenticação
 * FASE 7: Proteção de rotas com context
 */

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, logout } = useAdminAuth()

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: BarChart3 },
        { name: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Produtos', href: '/admin/products', icon: AlertCircle },
        { name: 'Clientes', href: '/admin/customers', icon: Users },
        { name: 'Marketing', href: '/admin/marketing', icon: TrendingUp },
    ]

    return (
        <div className="flex min-h-screen bg-[#09090b]">
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950 p-6 lg:relative lg:translate-x-0"
            >
                <div className="mb-8 space-y-2">
                    <h1 className="text-2xl font-black italic text-white">
                        HNK <span className="text-amber-500">Admin</span>
                    </h1>
                    <p className="text-xs text-zinc-500">Controle da Bem Estar</p>
                </div>

                {/* User Info */}
                {user && (
                    <div className="mb-6 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                        <p className="text-xs text-zinc-400">Conectado como</p>
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-amber-500">{user.role}</p>
                    </div>
                )}

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-zinc-300 transition-all hover:bg-zinc-900 hover:text-amber-500"
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <button
                    onClick={logout}
                    className="absolute bottom-6 left-6 right-6 flex items-center gap-2 rounded-lg bg-red-900/20 px-4 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-900/40"
                >
                    <LogOut size={20} />
                    Sair
                </button>
            </motion.aside>

            <div className="w-full lg:ml-0">
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4 backdrop-blur-md lg:hidden">
                    <h1 className="text-lg font-black text-white">HNK Admin</h1>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-amber-500">
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </header>

                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}

/**
 * Root Layout com Provider
 */
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminAuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminAuthProvider>
    )
}
