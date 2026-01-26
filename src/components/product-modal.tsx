'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, X, Minus, Plus } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface ProductModalProps {
    product: Product
    isOpen: boolean
    onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1)
    const [isFavorited, setIsFavorited] = useState(false)
    const { addItem } = useCart()

    const handleAddToCart = () => {
        addItem(product, quantity)
        onClose()
        setQuantity(1)
    }

    const handleToggleFavorite = () => {
        setIsFavorited(!isFavorited)
        // TODO: Salvar no Supabase na tabela 'favoritos'
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
                <Dialog.Content className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0a] border border-[#d97706]/20 shadow-2xl">
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-8"
                        >
                            {/* Close Button */}
                            <Dialog.Close className="absolute right-6 top-6 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </Dialog.Close>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Imagem do Produto */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#d97706]/20">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {product.badge && (
                                            <div className="absolute top-4 right-4 bg-[#d97706] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                                                {product.badge === 'mais-pedido' && '⭐ Mais Pedido'}
                                                {product.badge === 'promocao' && '🎉 Promoção'}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Detalhes do Produto */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="flex flex-col justify-between"
                                >
                                    {/* Cabeçalho */}
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
                                                <p className="text-gray-400 text-sm capitalize">
                                                    {product.category.replace('-', ' ')}
                                                </p>
                                            </div>
                                            <button
                                                onClick={handleToggleFavorite}
                                                className="p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                                            >
                                                <Heart
                                                    className={`w-6 h-6 transition-colors ${isFavorited
                                                            ? 'fill-red-500 text-red-500'
                                                            : 'text-gray-400 hover:text-red-500'
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        {/* Descrição */}
                                        <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                                        {/* Preço */}
                                        <div className="mb-8">
                                            <p className="text-sm text-gray-400 mb-2">Preço</p>
                                            <p className="text-4xl font-bold text-[#d97706]">
                                                R$ {product.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Seletor de Quantidade e Botões */}
                                    <div className="space-y-4">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-400 text-sm">Quantidade:</span>
                                            <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-lg p-2 border border-[#d97706]/20">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
                                                >
                                                    <Minus className="w-4 h-4 text-[#d97706]" />
                                                </button>
                                                <span className="w-12 text-center font-semibold text-white">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
                                                >
                                                    <Plus className="w-4 h-4 text-[#d97706]" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={onClose}
                                                className="px-6 py-3 rounded-lg border border-[#d97706]/30 text-white hover:bg-[#1a1a1a] transition-colors font-semibold"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handleAddToCart}
                                                className="px-6 py-3 rounded-lg bg-[#d97706] text-white hover:bg-[#d97706]/90 transition-colors font-semibold flex items-center justify-center gap-2"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                Adicionar
                                            </button>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="pt-4 border-t border-[#d97706]/10">
                                            <p className="text-gray-400 text-sm mb-2">Subtotal</p>
                                            <p className="text-2xl font-bold text-white">
                                                R$ {(product.price * quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Seção de Upsell (Produtos Recomendados) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 pt-8 border-t border-[#d97706]/10"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">✨ Recomendações</h3>
                                <p className="text-gray-400 text-sm">
                                    Produtos que combinam bem com essa seleção aparecerão aqui
                                </p>
                            </motion.div>

                            {/* Seção Institucional */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="mt-8 pt-8 border-t border-[#d97706]/10"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">🎉 Eventos e Ocasiões</h3>
                                <p className="text-gray-300 mb-4">
                                    Deixe o evento da sua empresa conosco! Temos pacotes especiais de churrasco.
                                </p>
                                <button className="w-full px-6 py-3 rounded-lg bg-[#d97706]/10 text-[#d97706] hover:bg-[#d97706]/20 transition-colors font-semibold">
                                    Consulte Eventos →
                                </button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
