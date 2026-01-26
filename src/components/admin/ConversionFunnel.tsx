'use client'

import { motion } from 'framer-motion'
import { Eye, ShoppingCart, CheckCircle } from 'lucide-react'

interface FunnelData {
  views: number
  addToCart: number
  purchases: number
}

export function ConversionFunnel({ data }: { data: FunnelData }) {
  const viewsToCart = ((data.addToCart / data.views) * 100).toFixed(1)
  const cartToPurchase = ((data.purchases / data.addToCart) * 100).toFixed(1)
  const overallConversion = ((data.purchases / data.views) * 100).toFixed(2)

  const stages = [
    {
      name: 'Visualizacoes',
      value: data.views,
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400',
      drop: null
    },
    {
      name: 'Adicionado ao Carrinho',
      value: data.addToCart,
      icon: ShoppingCart,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400',
      drop: viewsToCart
    },
    {
      name: 'Compras Concluidas',
      value: data.purchases,
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-500',
      textColor: 'text-emerald-400',
      drop: cartToPurchase
    }
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon
          const widthPercent = ((stage.value / data.views) * 100).toFixed(0)

          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg bg-gradient-to-br ${stage.color} p-2 text-white`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{stage.name}</p>
                    {stage.drop && (
                      <p className="text-xs text-zinc-500">
                        {stage.drop}% de retencao
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-black ${stage.textColor}`}>
                    {stage.value.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="w-full bg-zinc-800/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${stage.color} h-full`}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 backdrop-blur">
        <p className="text-sm text-zinc-400">Taxa de conversao geral</p>
        <p className={`text-3xl font-black text-emerald-400`}>{overallConversion}%</p>
      </div>
    </div>
  )
}
