'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import * as Sheet from '@radix-ui/react-dialog'
import { useCart } from '@/context/CartContext'

interface CartSheetProps {
    isOpen: boolean
    onClose: () => void
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
    const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCart()

    const handleCheckout = () => {
        // TODO: Redirecionar para checkout
        console.log('Ir para checkout')
        onClose()
    }

    return (
        <Sheet.Root open={isOpen} onOpenChange={onClose}>
            <Sheet.Portal>
                <Sheet.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
                <Sheet.Content className="fixed z-50 right-0 top-0 w-[90%] max-w-md h-screen overflow-y-auto rounded-l-2xl bg-[#0a0a0a] border-l border-[#d97706]/20 shadow-2xl">
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="flex flex-col h-full"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d97706]/10 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-[#d97706]" />
                                <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
                            </div>
                            <Sheet.Close className="p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </Sheet.Close>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <AnimatePresence>
                                {items.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center h-96 text-center"
                                    >
                                        <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg">Seu carrinho está vazio</p>
                                        <p className="text-gray-500 text-sm mt-2">Adicione produtos para começar</p>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.product.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="bg-[#1a1a1a] rounded-lg p-4 border border-[#d97706]/10 hover:border-[#d97706]/30 transition-colors"
                                            >
                                                {/* Produto Info */}
                                                <div className="flex gap-4 mb-4">
                                                    <img
                                                        src={item.product.image_url}
                                                        alt={item.product.name}
                                                        className="w-20 h-20 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-white text-sm mb-1">
                                                            {item.product.name}
                                                        </h3>
                                                        <p className="text-[#d97706] font-bold">
                                                            R$ {item.product.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </button>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3 bg-[#0a0a0a] rounded-lg p-2 border border-[#d97706]/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3 text-[#d97706]" />
                                                    </button>
                                                    <span className="flex-1 text-center font-semibold text-white text-sm">
                                                        {item.quantity}x
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3 text-[#d97706]" />
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="mt-2 text-right">
                                                    <p className="text-gray-400 text-xs">Subtotal</p>
                                                    <p className="text-white font-bold">
                                                        R$ {(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Seção "Você também pode gostar" */}
                        {items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="px-6 py-4 border-t border-[#d97706]/10"
                            >
                                <p className="text-sm text-gray-400 mb-3">✨ Você também pode gostar</p>
                                <div className="text-sm text-gray-500">
                                    Recomendações baseadas no seu carrinho aparecerão aqui
                                </div>
                            </motion.div>
                        )}

                        {/* Footer - Total e Checkout */}
                        {items.length > 0 && (
                            <motion.div
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#d97706]/10 px-6 py-4 space-y-4"
                            >
                                {/* Resumo */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-gray-400 text-sm">
                                        <span>Subtotal ({getItemCount()} itens)</span>
                                        <span>R$ {getTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-400 text-sm">
                                        <span>Taxa de entrega</span>
                                        <span>R$ 5,00</span>
                                    </div>
                                    <div className="h-px bg-[#d97706]/10 my-2" />
                                    <div className="flex items-center justify-between font-bold text-white text-lg">
                                        <span>Total</span>
                                        <span className="text-[#d97706]">R$ {(getTotal() + 5).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="space-y-3 pt-4">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full px-6 py-3 rounded-lg bg-[#d97706] text-white hover:bg-[#d97706]/90 transition-colors font-semibold"
                                    >
                                        Ir para Checkout
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full px-6 py-3 rounded-lg border border-[#d97706]/30 text-white hover:bg-[#1a1a1a] transition-colors font-semibold"
                                    >
                                        Continuar Comprando
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </Sheet.Content>
            </Sheet.Portal>
        </Sheet.Root>
    )
}
