'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, BarChart3, ShoppingBag, AlertCircle, Users, LogOut, TrendingUp, FileText, Settings, Activity, History } from 'lucide-react'
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext'
import { MetalButton } from '@/components/metal'
import Link from 'next/link'

/**
 * Layout Admin com Autenticação
 * FASE 8.2: Industrial-Ember Design System
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
        { name: 'Análise', href: '/admin/analytics', icon: Activity },
        { name: 'Atividades', href: '/admin/activity', icon: History },
        { name: 'Relatórios', href: '/admin/reports', icon: FileText },
        { name: 'Configurações', href: '/admin/settings', icon: Settings },
    ]

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-deep-charcoal to-zinc-900">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-steel-brushed/20 bg-gradient-to-b from-deep-charcoal to-zinc-900 p-6 lg:relative lg:translate-x-0 shadow-steel-shadow"
            >
                {/* Header */}
                <div className="mb-8 space-y-2">
                    <h1 className="text-2xl font-geist-black italic text-steel-silver">
                        HNK <span className="text-ember-core">Admin</span>
                    </h1>
                    <p className="text-xs text-steel-brushed">Industrial-Ember System</p>
                </div>

                {/* User Info Card */}
                {user && (
                    <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-steel-brushed/30 shadow-metal-inset">
                        <p className="text-xs text-steel-brushed mb-1">Conectado como</p>
                        <p className="text-sm font-geist-black text-steel-silver truncate">{user.name}</p>
                        <p className="text-xs text-ember-core mt-1">{user.role}</p>
                    </div>
                )}

                {/* Navigation */}
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-steel-brushed transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-900/20 hover:to-transparent hover:text-ember-core hover:border-l-2 hover:border-ember-core"
                            >
                                <Icon size={20} className="flex-shrink-0 group-hover:text-ember-core transition-colors" />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-600/30 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:from-red-900/50 hover:to-red-800/40 hover:border-red-600/50 hover:shadow-fire-glow"
                    >
                        <LogOut size={18} />
                        Sair
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="w-full">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-steel-brushed/20 bg-gradient-to-r from-deep-charcoal to-zinc-900/80 px-6 py-4 backdrop-blur-md shadow-steel-shadow lg:hidden">
                    <h1 className="text-lg font-geist-black text-steel-silver">HNK Admin</h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-ember-core hover:text-amber-400 transition-colors"
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </header>

                {/* Page Content */}
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
