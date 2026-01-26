/**
 * @name Order Confirmation Client Component
 * @description Client component para exibição de confirmação de pedido
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Package, Truck, MessageCircle, Download, Share2 } from 'lucide-react'

interface OrderItem {
    name: string
    quantity: number
    price: number
}

interface OrderAddress {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
}

interface OrderData {
    id: string
    total: number
    items: OrderItem[]
    address: OrderAddress
    shippingMethod: string
    paymentMethod: string
    estimatedDelivery: string
    trackingCode?: string
}

export default function ConfirmationClient() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [order, setOrder] = useState<OrderData | null>(null)
    const [loading, setLoading] = useState(true)

    const orderId = searchParams.get('orderId')

    useEffect(() => {
        if (!orderId) {
            router.push('/cart')
            return
        }

        // Simular carregamento de dados do pedido
        // Em produção, buscar do servidor/banco de dados
        const simulateOrderLoad = () => {
            setTimeout(() => {
                setOrder({
                    id: orderId,
                    total: 125.90,
                    items: [
                        { name: 'Pizza Margherita', quantity: 1, price: 45.00 },
                        { name: 'Refrigerante 2L', quantity: 1, price: 8.90 },
                        { name: 'Sobremesa', quantity: 1, price: 25.00 },
                    ],
                    address: {
                        street: 'Rua das Flores',
                        number: '123',
                        neighborhood: 'Centro',
                        city: 'São Paulo',
                        state: 'SP',
                    },
                    shippingMethod: 'express',
                    paymentMethod: 'card',
                    estimatedDelivery: '45 minutos',
                    trackingCode: `TRK-${orderId}`,
                })
                setLoading(false)
            }, 800)
        }

        simulateOrderLoad()
    }, [orderId, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-ember-accent border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-zinc-400">Processando seu pedido...</p>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-zinc-400 mb-4">Pedido não encontrado</p>
                    <Link href="/cart" className="text-ember-accent hover:underline">
                        Voltar ao carrinho
                    </Link>
                </div>
            </div>
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <div className="min-h-screen bg-zinc-900 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    {/* Success Header */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="inline-block mb-6"
                        >
                            <CheckCircle className="w-20 h-20 text-green-500" />
                        </motion.div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Pedido Confirmado!
                        </h1>
                        <p className="text-zinc-400">
                            Seu pedido #{order.id} foi recebido com sucesso
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Order Summary */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2 bg-zinc-800 rounded-xl p-6 border border-zinc-700"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-ember-accent" />
                                Resumo do Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-zinc-700 last:border-0">
                                        <div>
                                            <p className="text-white font-medium">{item.name}</p>
                                            <p className="text-sm text-zinc-400">Quantidade: {item.quantity}</p>
                                        </div>
                                        <p className="text-ember-accent font-bold">
                                            R$ {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-zinc-900 rounded-lg p-4">
                                <div className="flex justify-between mb-3 pb-3 border-b border-zinc-700">
                                    <span className="text-zinc-400">Subtotal</span>
                                    <span className="text-white">R$ {(order.total * 0.85).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-3 pb-3 border-b border-zinc-700">
                                    <span className="text-zinc-400">Entrega (Express)</span>
                                    <span className="text-white">R$ {(order.total * 0.15).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white font-bold">Total</span>
                                    <span className="text-2xl font-bold text-ember-accent">
                                        R$ {order.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Info */}
                        <motion.div variants={itemVariants}>
                            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 mb-4">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-ember-accent" />
                                    Entrega
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-zinc-400 uppercase tracking-wider">Tempo estimado</p>
                                        <p className="text-white font-bold text-lg">{order.estimatedDelivery}</p>
                                    </div>
                                    {order.trackingCode && (
                                        <div>
                                            <p className="text-xs text-zinc-400 uppercase tracking-wider">Rastreamento</p>
                                            <p className="text-ember-accent font-mono text-sm break-all">{order.trackingCode}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
                                <h3 className="text-lg font-bold text-white mb-4">Endereço</h3>
                                <div className="text-sm text-zinc-400 space-y-1">
                                    <p className="text-white">{order.address.street}, {order.address.number}</p>
                                    {order.address.complement && <p>{order.address.complement}</p>}
                                    <p>{order.address.neighborhood}</p>
                                    <p>
                                        {order.address.city}, {order.address.state}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
                    >
                        <button className="bg-gradient-to-r from-ember-accent to-orange-600 hover:from-ember-accent/90 hover:to-orange-600/90 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group">
                            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            WhatsApp
                        </button>
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-lg border border-zinc-700 transition-all flex items-center justify-center gap-2 group">
                            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Recibo
                        </button>
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-lg border border-zinc-700 transition-all flex items-center justify-center gap-2 group">
                            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Compartilhar
                        </button>
                        <Link
                            href="/"
                            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-lg border border-zinc-700 transition-all flex items-center justify-center gap-2 group"
                        >
                            Continuar Comprando
                        </Link>
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-xl p-6"
                    >
                        <h3 className="text-white font-bold mb-2">O que vem por aí?</h3>
                        <ul className="text-zinc-300 space-y-2 text-sm">
                            <li>✓ Você receberá um SMS com atualizações de entrega</li>
                            <li>✓ Nosso restaurante está preparando seu pedido</li>
                            <li>✓ Você será notificado quando sair para entrega</li>
                            <li>✓ Acompanhe seu pedido em tempo real</li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
