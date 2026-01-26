/**
 * @name Cart View Component
 * @description Interface visual do carrinho com Framer Motion e integração completa
 * @version 1.0
 */

'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/stores/cartStore'
import { trackCartView } from '@/lib/event-tracker'
import { trackCartView as trackDataLayerCartView } from '@/lib/data-layer'

export function CartView() {
    const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCart()

    React.useEffect(() => {
        // Rastrear visualização do carrinho
        if (items.length > 0) {
            trackCartView(getTotal(), getItemCount())
            trackDataLayerCartView({
                cartValue: getTotal(),
                itemCount: getItemCount(),
                items: items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    quantity: item.quantity,
                })),
            })
        }
    }, [items, getTotal, getItemCount])

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-ember-dark flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="flex justify-center">
                        <ShoppingBag className="w-16 h-16 text-ember-secondary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Carrinho Vazio</h1>
                        <p className="text-ember-secondary mb-6">
                            Adicione alguns itens para começar seu pedido
                        </p>
                    </div>
                    <Link
                        href="/bem-estar"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-ember-accent to-amber-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                    >
                        Continuar Comprando
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-ember-dark">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-ember-dark/95 backdrop-blur-md border-b border-zinc-800/50 px-4 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">
                        Carrinho ({getItemCount()})
                    </h1>
                    <button
                        onClick={() => clearCart()}
                        className="text-sm px-3 py-1 rounded text-amber-500 hover:bg-amber-500/10 transition-colors"
                    >
                        Limpar
                    </button>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="max-w-4xl mx-auto px-4 py-6 pb-40">
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-xl p-4 flex gap-4 hover:border-zinc-700/50 transition-colors"
                            >
                                {/* Imagem */}
                                {item.image && (
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            quality={85}
                                        />
                                    </div>
                                )}

                                {/* Informações */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white truncate">{item.name}</h3>
                                    {item.category && (
                                        <p className="text-xs text-ember-secondary mt-1">{item.category}</p>
                                    )}
                                    <p className="text-sm text-amber-400 font-semibold mt-2">
                                        R$ {item.price.toFixed(2)}
                                    </p>
                                </div>

                                {/* Quantidade */}
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                                    >
                                        <Minus size={16} />
                                    </motion.button>

                                    <span className="w-8 text-center font-semibold text-white">
                                        {item.quantity}
                                    </span>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                                    >
                                        <Plus size={16} />
                                    </motion.button>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right flex flex-col items-end justify-between">
                                    <p className="text-sm text-white font-semibold">
                                        R$ {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Resumo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 p-6 bg-zinc-900/60 border border-zinc-800/50 rounded-xl space-y-3"
                >
                    <div className="flex justify-between text-white">
                        <span>Subtotal:</span>
                        <span>R$ {getTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                        <span>Frete:</span>
                        <span className="text-emerald-400">A calcular</span>
                    </div>
                    <div className="h-px bg-zinc-700/50" />
                    <div className="flex justify-between text-lg font-bold text-amber-400">
                        <span>Total:</span>
                        <span>R$ {getTotal().toFixed(2)}</span>
                    </div>
                </motion.div>
            </div>

            {/* Footer - CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-ember-dark/95 backdrop-blur-md border-t border-zinc-800/50 px-4 py-4">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <Link
                        href="/bem-estar"
                        className="flex-1 px-4 py-3 rounded-lg border border-ember-accent text-ember-accent font-bold hover:bg-ember-accent/10 transition-colors text-center"
                    >
                        Continuar Comprando
                    </Link>
                    <Link
                        href="/checkout"
                        className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-ember-accent to-amber-600 text-white font-bold hover:shadow-lg hover:shadow-amber-500/20 transition-all text-center"
                    >
                        Ir para Checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}
