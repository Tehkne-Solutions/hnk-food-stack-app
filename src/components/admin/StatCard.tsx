'use client'

/**
 * @name Dashboard Stats Card
 * @description Card reutilizável para exibição de estatísticas
 * @author HNK Labs
 */

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatCardProps {
    title: string
    value: string | number
    icon: ReactNode
    trend?: {
        value: number
        isPositive: boolean
    }
    color?: 'amber' | 'emerald' | 'red' | 'blue'
}

const colorMap = {
    amber: 'from-amber-500/20 to-orange-500/10',
    emerald: 'from-emerald-500/20 to-green-500/10',
    red: 'from-red-500/20 to-pink-500/10',
    blue: 'from-blue-500/20 to-cyan-500/10'
}

export function StatCard({
    title,
    value,
    icon,
    trend,
    color = 'amber'
}: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-gradient-to-br ${colorMap[color]} p-6 backdrop-blur-md`}
        >
            {/* Decorative blur */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />

            <div className="relative space-y-3">
                {/* Header com ícone */}
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">{title}</h3>
                    <div className="rounded-lg bg-zinc-900/50 p-2 text-amber-500">{icon}</div>
                </div>

                {/* Valor principal */}
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{value}</span>

                    {/* Trend */}
                    {trend && (
                        <span className={`text-xs font-bold ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
