'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { type Product } from '@/types'
import { ProductModal } from '@/components/product-modal'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#d97706]/10 hover:border-[#d97706]/30 transition-all cursor-pointer group"
            >
                <div className="flex gap-4 p-4">
                    {/* Imagem */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#d97706]/20 to-[#d97706]/5">
                        <motion.div
                            className="w-full h-full bg-gradient-to-br from-[#d97706]/30 to-[#d97706]/10 flex items-center justify-center text-2xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            🍖
                        </motion.div>

                        {/* Badge */}
                        {product.badge && (
                            <div
                                className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-lg ${product.badge === 'mais-pedido'
                                        ? 'bg-[#d97706] text-white'
                                        : 'bg-red-500 text-white'
                                    }`}
                            >
                                {product.badge === 'mais-pedido' ? '🔥 Top' : '⚡ Promo'}
                            </div>
                        )}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="text-white font-semibold text-sm leading-tight mb-1">
                                {product.name}
                            </h3>
                            <p className="text-gray-400 text-xs leading-tight line-clamp-2">
                                {product.description}
                            </p>
                        </div>

                        {/* Preço e Botão */}
                        <div className="flex items-center justify-between mt-2">
                            <div>
                                <span className="text-[#d97706] font-bold text-lg">
                                    R$ {product.price.toFixed(2)}
                                </span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsModalOpen(true)
                                }}
                                className="bg-gradient-to-br from-[#d97706] to-[#b45309] p-2 rounded-lg text-white hover:shadow-lg hover:shadow-[#d97706]/40 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Modal */}
            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
