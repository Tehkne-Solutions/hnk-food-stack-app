'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, LogOut, Edit, Trash2, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface ActivityLog {
    id: string
    type: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'error'
    user: string
    action: string
    details: string
    timestamp: string
    status: 'success' | 'error' | 'pending'
}

export default function ActivityPage() {
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    const mockLogs: ActivityLog[] = [
        {
            id: '1',
            type: 'login',
            user: 'admin@hnk.com',
            action: 'Login realizado',
            details: 'IP: 192.168.1.100',
            timestamp: '2 min',
            status: 'success'
        },
        {
            id: '2',
            type: 'create',
            user: 'gerente@hnk.com',
            action: 'Novo pedido criado',
            details: 'Pedido #005 - R$ 245.50',
            timestamp: '15 min',
            status: 'success'
        },
        {
            id: '3',
            type: 'update',
            user: 'admin@hnk.com',
            action: 'Preço do produto atualizado',
            details: 'Picanha Angus - R$ 89.90 → R$ 99.90',
            timestamp: '1h',
            status: 'success'
        },
        {
            id: '4',
            type: 'delete',
            user: 'gerente@hnk.com',
            action: 'Produto removido do estoque',
            details: 'Espetinho Frango - 10 unidades',
            timestamp: '2h',
            status: 'success'
        },
        {
            id: '5',
            type: 'error',
            user: 'system',
            action: 'Erro de sincronização',
            details: 'Falha ao conectar com Supabase',
            timestamp: '3h',
            status: 'error'
        },
        {
            id: '6',
            type: 'logout',
            user: 'vendedor@hnk.com',
            action: 'Logout realizado',
            details: 'Sessão encerrada normalmente',
            timestamp: '4h',
            status: 'success'
        },
        {
            id: '7',
            type: 'create',
            user: 'admin@hnk.com',
            action: 'Novo cliente cadastrado',
            details: 'João Silva - joao@email.com',
            timestamp: '5h',
            status: 'success'
        },
        {
            id: '8',
            type: 'update',
            user: 'gerente@hnk.com',
            action: 'Configurações salvas',
            details: 'Email de notificação atualizado',
            timestamp: '6h',
            status: 'success'
        },
    ]

    const filteredLogs = mockLogs.filter(log => {
        const matchesFilter = filter === 'all' || log.type === filter
        const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) ||
            log.user.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const getIcon = (type: ActivityLog['type']) => {
        switch (type) {
            case 'login': return <LogIn size={18} className="text-green-400" />
            case 'logout': return <LogOut size={18} className="text-orange-400" />
            case 'create': return <Plus size={18} className="text-blue-400" />
            case 'update': return <Edit size={18} className="text-purple-400" />
            case 'delete': return <Trash2 size={18} className="text-red-400" />
            case 'error': return <AlertCircle size={18} className="text-red-500" />
            default: return <Clock size={18} className="text-zinc-400" />
        }
    }

    const getTypeLabel = (type: ActivityLog['type']) => {
        const labels = {
            login: 'Login',
            logout: 'Logout',
            create: 'Criação',
            update: 'Atualização',
            delete: 'Deleção',
            error: 'Erro'
        }
        return labels[type]
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white">Log de Atividades</h1>
                <p className="mt-1 text-zinc-400">Registre todas as ações do sistema e de usuários</p>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col md:flex-row gap-4"
            >
                <input
                    type="text"
                    placeholder="Buscar por ação ou usuário..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
                <div className="flex gap-2">
                    {['all', 'login', 'logout', 'create', 'update', 'delete', 'error'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === f
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            {f === 'all' ? 'Todos' : getTypeLabel(f as any)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Activity Log */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
            >
                {filteredLogs.map((log, idx) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-4 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-all"
                    >
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="p-2 bg-zinc-800 rounded-lg mt-1">
                                {getIcon(log.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-white font-semibold">{log.action}</h3>
                                    <span className="text-xs text-zinc-400">{log.timestamp}</span>
                                </div>
                                <p className="text-sm text-zinc-400 mb-2">{log.details}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-300">
                                        {log.user}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded font-semibold flex items-center gap-1 ${log.status === 'success'
                                            ? 'bg-green-500/20 text-green-400'
                                            : log.status === 'error'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {log.status === 'success' && <CheckCircle size={12} />}
                                        {log.status === 'error' && <AlertCircle size={12} />}
                                        {log.status === 'pending' && <Clock size={12} />}
                                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredLogs.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 border border-zinc-800 rounded-lg bg-zinc-900/50 text-center"
                >
                    <AlertCircle size={48} className="mx-auto text-zinc-600 mb-4" />
                    <p className="text-zinc-400">Nenhuma atividade encontrada</p>
                </motion.div>
            )}
        </div>
    )
}
