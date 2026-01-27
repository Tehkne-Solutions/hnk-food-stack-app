'use client'

import { motion } from 'framer-motion'

interface TrafficSource {
    name: string
    value: number
    color: string
    icon: string
}

export function TrafficSourceChart({ sources }: { sources: TrafficSource[] }) {
    const total = sources.reduce((sum, s) => sum + s.value, 0)

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                {sources.map((source, index) => {
                    const percentage = ((source.value / total) * 100).toFixed(1)
                    return (
                        <motion.div
                            key={source.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{source.icon}</span>
                                    <p className="font-semibold text-white">{source.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-white">{source.value.toLocaleString('pt-BR')}</p>
                                    <p className="text-xs text-zinc-500">{percentage}%</p>
                                </div>
                            </div>

                            <div className="w-full bg-zinc-800/50 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    style={{ backgroundColor: source.color }}
                                    className="h-full rounded-full"
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
                <div className="rounded-lg bg-zinc-900/50 p-3 text-center">
                    <p className="text-xs text-zinc-400 mb-1">Total de Visitas</p>
                    <p className="text-2xl font-black text-amber-400">{total.toLocaleString('pt-BR')}</p>
                </div>
                <div className="rounded-lg bg-zinc-900/50 p-3 text-center">
                    <p className="text-xs text-zinc-400 mb-1">Maior Fonte</p>
                    <p className="text-lg font-bold text-white">{sources[0].name}</p>
                </div>
            </div>
        </div>
    )
}
