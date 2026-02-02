'use client'

import { motion } from 'framer-motion'
import { Check, Flame, Crown, Zap } from 'lucide-react'

const plans = [
  {
    name: 'BRASA',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para começar sua jornada',
    icon: Flame,
    commission: '15% por pedido',
    features: [
      'Até 10 produtos',
      'Tema Noir padrão',
      'Suporte via ticket',
      'Analytics básico'
    ],
    cta: 'Começar Grátis',
    popular: false
  },
  {
    name: 'LENHA',
    price: 'R$ 197',
    period: '/mês',
    description: 'Para crescer seu negócio',
    icon: Zap,
    commission: '8% por pedido',
    features: [
      'Produtos ilimitados',
      'Cores da marca',
      'WhatsApp prioritário',
      'Analytics avançado + Exportação'
    ],
    cta: 'Upgrade Pro',
    popular: true
  },
  {
    name: 'FORJA',
    price: 'R$ 497',
    period: '/mês',
    description: 'Para dominar o mercado',
    icon: Crown,
    commission: '5% por pedido',
    features: [
      'Lojas ilimitadas (Franquias)',
      'Design 100% White Label',
      'Gerente de Conta (vCTO)',
      'Predição de Demanda por IA'
    ],
    cta: 'Ir Enterprise',
    popular: false
  }
]

export function SaasPricingPlans() {
  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black uppercase italic text-white mb-4">
            ESCOLHA SEU <span className="text-amber-500">PODER</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Do churrasqueiro autônomo às grandes redes. Temos o plano perfeito para sua brasa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl border-2 ${
                plan.popular 
                  ? 'border-amber-500 bg-amber-500/5' 
                  : 'border-zinc-800 bg-zinc-900/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase">
                    MAIS POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="mb-4">
                  <plan.icon size={48} className="text-amber-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-black uppercase italic text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-amber-500 text-sm font-bold mt-2">{plan.commission}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-amber-500 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-colors ${
                  plan.popular
                    ? 'bg-amber-500 text-black hover:bg-amber-600'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-zinc-500 text-sm">
            Todos os planos incluem: SSL gratuito, backup automático e suporte técnico
          </p>
        </motion.div>
      </div>
    </section>
  )
}