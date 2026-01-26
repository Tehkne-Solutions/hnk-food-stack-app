'use client'

import { motion } from 'framer-motion'

export function StatCard({ title, value, icon, color }: any) {
    const colors: Record<string, string> = {
        amber: 'from-amber-500/20 to-orange-500/10',
        emerald: 'from-emerald-500/20 to-green-500/10',
        red: 'from-red-500/20 to-pink-500/10',
        blue: 'from-blue-500/20 to-cyan-500/10'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border border-zinc-800/50 bg-gradient-to-br ${colors[color] || colors.amber} p-6 backdrop-blur-md`}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">{title}</h3>
                <div className="rounded-lg bg-zinc-900/50 p-2 text-amber-500">{icon}</div>
            </div>
            <div className="text-3xl font-black text-white">{value}</div>
        </motion.div>
    )
}
