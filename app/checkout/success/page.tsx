'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Flame } from 'lucide-react'
import { ConversionTracker } from '@/components/analytics/ConversionTracker'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || 'HNK-' + Date.now()
  const amount = parseFloat(searchParams.get('amount') || '0')

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <ConversionTracker amount={amount} orderId={orderId} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
            <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-black uppercase italic text-white mb-4"
        >
          PEDIDO CONFIRMADO!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-zinc-400 text-lg mb-2"
        >
          Seu pedido #{orderId} foi recebido
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-amber-500 font-bold text-xl mb-8"
        >
          Total: R$ {amount.toFixed(2)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-zinc-300 text-sm">
            <Flame size={16} className="text-amber-500" />
            <span>A brasa já está acesa para seu pedido!</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/pedidos"
              className="px-6 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Acompanhar Pedido
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-zinc-700 text-white font-bold rounded-lg hover:border-amber-500 transition-colors"
            >
              Voltar ao Início
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}