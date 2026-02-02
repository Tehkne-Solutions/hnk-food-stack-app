'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Smartphone, Sparkles, Zap, CheckCircle, Clock, Users, DollarSign, Bot, Activity, Target, BarChart2, TrendingUp, Filter, Download, BookOpen, Lightbulb, Calendar, Award, Globe, Handshake } from 'lucide-react'

const pageData: Record<string, any> = {
  'cardapio-digital': {
    title: 'Cardápio Digital Premium',
    subtitle: 'Transforme seu menu em uma experiência interativa',
    description: 'Sistema completo de cardápio digital com IA, personalização e analytics em tempo real.',
    features: [
      { icon: 'smartphone', text: 'Interface mobile-first responsiva' },
      { icon: 'sparkles', text: 'IA para recomendações personalizadas' },
      { icon: 'zap', text: 'Carregamento ultra-rápido' },
      { icon: 'check', text: 'Integração com sistemas de pagamento' }
    ],
    cta: { text: 'Testar Cardápio', href: '/demo/cardapio' }
  },
  'pedidos-rapidos': {
    title: 'Sistema de Pedidos Rápidos',
    subtitle: 'Otimize seu fluxo de pedidos com inteligência artificial',
    description: 'Gerencie pedidos em tempo real, reduza tempo de espera e maximize a satisfação do cliente.',
    features: [
      { icon: 'clock', text: 'Processamento em tempo real' },
      { icon: 'users', text: 'Gestão de filas inteligente' },
      { icon: 'dollar', text: 'Aumento de 40% no ticket médio' },
      { icon: 'bot', text: 'Automação completa do fluxo' }
    ],
    cta: { text: 'Ver Demo', href: '/demo/pedidos' }
  }
}

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    smartphone: <Smartphone size={20} className="text-amber-500" />,
    sparkles: <Sparkles size={20} className="text-amber-500" />,
    zap: <Zap size={20} className="text-amber-500" />,
    check: <CheckCircle size={20} className="text-amber-500" />,
    clock: <Clock size={20} className="text-amber-500" />,
    users: <Users size={20} className="text-amber-500" />,
    dollar: <DollarSign size={20} className="text-amber-500" />,
    bot: <Bot size={20} className="text-amber-500" />
  }
  return icons[iconName] || <CheckCircle size={20} className="text-amber-500" />
}

export default function SistemaPage({ params }: { params: { slug: string } }) {
  const page = pageData[params.slug]

  if (!page) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Página não encontrada</h1>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold rounded-lg"
          >
            Voltar ao Início <ChevronRight size={20} />
          </motion.a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.9] tracking-tighter text-white">
                {page.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-amber-500 font-bold">
                {page.subtitle}
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                {page.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {page.features.map((feature: any, i: number) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300 font-bold text-sm">
                  {getIcon(feature.icon)}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <motion.a
              href={page.cta.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-black uppercase italic tracking-widest rounded-sm shadow-lg hover:bg-amber-600 transition-colors"
            >
              {page.cta.text} <ChevronRight size={20} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-[600px] h-96 bg-gradient-to-br from-zinc-300 via-amber-600 to-zinc-800 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🔥</div>
                <p className="text-white font-black text-xl">{page.title}</p>
                <p className="text-amber-200 text-sm mt-2">Preview • Coming Soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}