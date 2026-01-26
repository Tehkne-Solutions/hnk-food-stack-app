'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Product {
    id: string
    name: string
    price: number
    is_promo?: boolean
    promo_price?: number
}

interface PromotionModalProps {
    product: Product | null
    onClose: () => void
    onSave: (promoPrice: number, startDate: string, endDate: string) => void
}

export function PromotionModal({ product, onClose, onSave }: PromotionModalProps) {
    const [promoPrice, setPromoPrice] = useState(product?.promo_price?.toString() || '')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    if (!product) return null

    const discount = promoPrice
        ? (((product.price - parseFloat(promoPrice)) / product.price) * 100).toFixed(0)
        : 0

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-black italic text-white">
                        <span className="text-amber-500">Oferta do</span> Mestre
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                        <p className="text-lg font-bold text-white">{product.name}</p>
                        <p className="text-sm text-amber-400">
                            Preco Normal: R$ {product.price.toFixed(2)}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-400 mb-2">
                            Preco Promocional
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-zinc-500">R$</span>
                            <input
                                type="number"
                                step="0.01"
                                value={promoPrice}
                                onChange={(e) => setPromoPrice(e.target.value)}
                                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                            />
                            {discount > 0 && (
                                <span className="text-sm font-bold text-emerald-400">-{discount}%</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-2">
                                Data Inicio
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-2">
                                Data Fim
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-zinc-700 bg-transparent px-4 py-2 font-bold text-white transition-all hover:bg-zinc-900"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                if (promoPrice && startDate && endDate) {
                                    onSave(parseFloat(promoPrice), startDate, endDate)
                                    onClose()
                                }
                            }}
                            disabled={!promoPrice || !startDate || !endDate}
                            className="flex-1 rounded-lg bg-amber-500 px-4 py-2 font-bold text-black transition-all hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Criar Oferta
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
