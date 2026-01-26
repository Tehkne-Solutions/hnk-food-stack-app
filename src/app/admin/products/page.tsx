'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Plus, AlertCircle, Zap } from 'lucide-react'
import { PriceModal } from '@/components/admin/PriceModal'
import { PromotionModal } from '@/components/admin/PromotionModal'

interface Product {
    id: string
    name: string
    price: number
    stock: number
    is_available: boolean
    category: string
    is_promo?: boolean
    promo_price?: number
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Kit Fraldinha Premium',
        price: 189.90,
        stock: 5,
        is_available: true,
        category: 'Especiais',
        is_promo: true,
        promo_price: 159.90
    },
    {
        id: '2',
        name: 'Picanha Angus',
        price: 129.90,
        stock: 2,
        is_available: true,
        category: 'Cortes Nobres'
    },
    {
        id: '3',
        name: 'Assado de Tira',
        price: 99.90,
        stock: 0,
        is_available: false,
        category: 'Carnes'
    }
]

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [priceModalOpen, setPriceModalOpen] = useState(false)
    const [promoModalOpen, setPromoModalOpen] = useState(false)

    const lowStockItems = products.filter(p => p.stock <= 2)

    const handleSavePrice = (newPrice: number, promoPrice?: number) => {
        if (selectedProduct) {
            setProducts(
                products.map(p =>
                    p.id === selectedProduct.id
                        ? { ...p, price: newPrice, promo_price: promoPrice, is_promo: !!promoPrice }
                        : p
                )
            )
        }
    }

    const handleSavePromotion = (promoPrice: number) => {
        if (selectedProduct) {
            setProducts(
                products.map(p =>
                    p.id === selectedProduct.id
                        ? { ...p, is_promo: true, promo_price: promoPrice }
                        : p
                )
            )
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-black italic text-white">Produtos</h1>
                    <p className="text-zinc-400">Gerencie seu cardapio</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-3 font-bold text-black hover:bg-amber-400 transition-all">
                    <Plus size={20} />
                    Novo Produto
                </button>
            </div>

            {lowStockItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-4"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="text-amber-500 mt-0.5" />
                        <div>
                            <p className="font-bold text-amber-500">Aviso de Estoque</p>
                            <p className="text-sm text-zinc-300">{lowStockItems.length} produto com estoque baixo</p>
                        </div>
                    </div>
                </motion.div>
            )}

            <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Produto</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Categoria</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Preco</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Estoque</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Status</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Acoes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {product.is_promo && (
                                                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500 text-xs font-bold text-black">
                                                    <Zap size={12} />
                                                </span>
                                            )}
                                            <span className="font-semibold text-white">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{product.category}</td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="font-mono font-bold text-white">
                                                R$ {product.price.toFixed(2)}
                                            </div>
                                            {product.is_promo && product.promo_price && (
                                                <div className="font-mono font-bold text-emerald-400 text-sm">
                                                    R$ {product.promo_price.toFixed(2)}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={product.stock <= 2 ? 'text-red-400 font-bold' : 'text-white'}>
                                            {product.stock} un
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${product.is_available
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {product.is_available ? 'Disponivel' : 'Esgotado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product)
                                                setPriceModalOpen(true)
                                            }}
                                            className="text-amber-500 hover:text-amber-400"
                                            title="Editar preco"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product)
                                                setPromoModalOpen(true)
                                            }}
                                            className="text-emerald-500 hover:text-emerald-400"
                                            title="Criar promocao"
                                        >
                                            <Zap size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {priceModalOpen && selectedProduct && (
                <PriceModal
                    product={selectedProduct}
                    onClose={() => setPriceModalOpen(false)}
                    onSave={handleSavePrice}
                />
            )}

            {promoModalOpen && selectedProduct && (
                <PromotionModal
                    product={selectedProduct}
                    onClose={() => setPromoModalOpen(false)}
                    onSave={(promoPrice) => handleSavePromotion(promoPrice)}
                />
            )}
        </div>
    )
}
