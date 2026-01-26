'use client'

/**
 * HandsUP FoodStack - Landing Page
 * Premium food ordering platform
 */

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Users, TrendingUp, CheckCircle2, MessageCircle, Smartphone, Lock } from 'lucide-react'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: Smartphone,
      title: 'Cardápio Digital',
      description: 'Visualize todos os pratos com fotos, descrições e valores em tempo real',
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: Zap,
      title: 'Pedidos Rápidos',
      description: 'Faça seu pedido em segundos com nossa interface intuitiva',
      color: 'from-amber-500/20 to-orange-500/20'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description: 'Receba confirmações e atualizações diretamente no WhatsApp',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: TrendingUp,
      title: 'Analytics em Tempo Real',
      description: 'Acompanhe seus gastos e histórico de pedidos',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Users,
      title: 'Comunidade Social',
      description: 'Veja reviews, compartilhe experiências e ganhe pontos',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Lock,
      title: 'Segurança Premium',
      description: 'Dados protegidos com autenticação segura e criptografia',
      color: 'from-indigo-500/20 to-purple-500/20'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-ember-dark to-zinc-900 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ember-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 flex items-center justify-between px-6 py-6 backdrop-blur-sm border-b border-zinc-800/50"
      >
        <div className="flex items-center gap-2">
          <div className="text-3xl">🔥</div>
          <span className="text-2xl font-bold bg-gradient-to-r from-ember-accent to-orange-400 bg-clip-text text-transparent">
            HandsUP
          </span>
          <span className="text-sm font-light text-zinc-400">FoodStack</span>
        </div>
        <Link
          href="/bem-estar"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-ember-accent to-orange-600 hover:from-ember-accent/90 hover:to-orange-600/90 text-white font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/20"
        >
          Entrar
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full border border-ember-accent/50 bg-ember-accent/10 backdrop-blur-sm"
              >
                <p className="text-sm text-ember-accent font-semibold">🚀 Plataforma de Alimentação Inteligente</p>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Alimentação
                </span>
                <br />
                <span className="bg-gradient-to-r from-ember-accent via-orange-400 to-red-500 bg-clip-text text-transparent">
                  Sem Limites
                </span>
              </h1>

              <p className="text-xl text-zinc-300 leading-relaxed max-w-lg">
                Descubra a plataforma de pedidos mais avançada. Cardápios digitais, pagamentos seguros, e entrega em tempo real — tudo integrado.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/bem-estar"
                  className="group px-8 py-4 rounded-xl bg-gradient-to-r from-ember-accent to-orange-600 hover:from-ember-accent/90 hover:to-orange-600/90 text-white font-bold flex items-center gap-2 transition-all hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105"
                >
                  Começar Agora
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <button className="px-8 py-4 rounded-xl border-2 border-zinc-600 hover:border-ember-accent text-white font-bold transition-all hover:bg-ember-accent/10">
                  Ver Demo
                </button>
              </div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800"
              >
                <div>
                  <p className="text-3xl font-bold text-ember-accent">50K+</p>
                  <p className="text-sm text-zinc-400">Pedidos/Mês</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-400">98%</p>
                  <p className="text-sm text-zinc-400">Satisfação</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-400">24/7</p>
                  <p className="text-sm text-zinc-400">Suporte</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-ember-accent/20 via-orange-500/20 to-red-500/20 rounded-2xl" />

                {/* Animated Circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-64 h-64 rounded-full border-2 border-ember-accent/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-48 h-48 rounded-full border-2 border-orange-500/30"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-ember-accent/40 to-orange-500/40 blur-2xl"
                  />
                </div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-8xl"
                  >
                    🍕
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Tudo que você precisa
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Recursos poderosos para restaurantes, pizzarias e entregas em geral
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-8 rounded-2xl border border-zinc-800 hover:border-ember-accent/50 bg-gradient-to-br ${feature.color} backdrop-blur-sm transition-all group cursor-pointer`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ember-accent/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:from-ember-accent/40 group-hover:to-orange-500/40 transition-all">
                    <Icon className="text-ember-accent group-hover:text-orange-400 transition-colors" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-32 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
          >
            <div className="relative p-12 lg:p-20 bg-gradient-to-r from-ember-accent/10 via-orange-500/10 to-red-500/10 border border-ember-accent/30 backdrop-blur-xl">
              {/* Background Glow */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-ember-accent/20 rounded-full blur-3xl" />
              </div>

              <motion.div variants={itemVariants} className="text-center space-y-8">
                <h2 className="text-5xl font-black">
                  <span className="bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">
                    Pronto para revolucionar suas vendas?
                  </span>
                </h2>
                <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                  Junte-se aos melhores restaurantes que já triplicaram suas vendas com HandsUP FoodStack
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/bem-estar"
                    className="group px-10 py-4 rounded-xl bg-gradient-to-r from-ember-accent to-orange-600 hover:from-ember-accent/90 hover:to-orange-600/90 text-white font-bold flex items-center gap-2 transition-all hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105"
                  >
                    Acessar Platform
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-8 pt-12 border-t border-zinc-700/50">
                  {[
                    { icon: '✓', text: 'Setup em 5 minutos' },
                    { icon: '✓', text: 'Sem taxa de setup' },
                    { icon: '✓', text: 'Suporte 24/7' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300">
                      <span className="text-emerald-400 font-bold">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-zinc-500">
          <p>© 2026 HandsUP FoodStack. Transformando o setor de alimentação. 🔥</p>
        </div>
      </footer>
    </div>
  )
}
