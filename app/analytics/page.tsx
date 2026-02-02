'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    BarChart3, TrendingUp, PieChart, Eye, Activity, Zap
} from 'lucide-react'

export default function AnalyticsPage() {
    const features = [
        {
            icon: TrendingUp,
            title: "Gráficos em Tempo Real",
            description: "Visualize seu desempenho instantaneamente"
        },
        {
            icon: PieChart,
            title: "Análise de Vendas",
            description: "Entenda quais pratos vendem mais"
        },
        {
            icon: Eye,
            title: "Visibilidade Total",
            description: "Saiba exatamente como seu negócio está"
        },
        {
            icon: Activity,
            title: "Relatórios Personalizados",
            description: "Configure alertas e relatórios automáticos"
        }
    ]

    return (
        <main className="w-full bg-[#050505] min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-700/10 border border-amber-500/30 rounded-full">
                            <BarChart3 size={40} className="text-amber-500" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-4"
                    >
                        Analytics Pro
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-black text-amber-500 mb-6 uppercase tracking-wide"
                    >
                        Dados que Impulsionam Decisões
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        Transforme números em insights acionáveis com nosso painel de analytics avançado.
                    </motion.p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => {
                            const FeatureIcon = feature.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900/50 to-zinc-900/20 border border-zinc-800/50 hover:border-amber-500/30 transition-all duration-300 group"
                                >
                                    <div className="mb-4 flex items-center justify-center">
                                        <div className="p-3 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition">
                                            <FeatureIcon size={24} className="text-amber-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-white text-center mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 text-center leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <Link
                            href="/"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-bold text-lg rounded-full hover:shadow-fire-glow transition-all duration-300 transform hover:scale-105"
                        >
                            Acessar Analytics
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
