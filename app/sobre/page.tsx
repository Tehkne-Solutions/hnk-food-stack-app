'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Flame, Award, Users, Target, Zap, Heart
} from 'lucide-react'

export default function SobrePage() {
    const features = [
        {
            icon: Award,
            title: "Reconhecimento Indústria",
            description: "Líderes em inovação e excelência"
        },
        {
            icon: Users,
            title: "Comunidade Global",
            description: "Milhares de restaurantes usam HNK"
        },
        {
            icon: Target,
            title: "Missão Clara",
            description: "Transformar a gestão de restaurantes"
        },
        {
            icon: Heart,
            title: "Paixão pelo Detalhe",
            description: "Cada feature é pensada com cuidado"
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
                            <Flame size={40} className="text-amber-500" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-4"
                    >
                        Sobre HNK
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-black text-amber-500 mb-6 uppercase tracking-wide"
                    >
                        A História da Inovação
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        Somos uma empresa dedicada a revolucionar a forma como restaurantes operam, com tecnologia de ponta e paixão pelo detalhe.
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
                            Conectar com HNK
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
