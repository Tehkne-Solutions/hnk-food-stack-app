'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Trash2, Plus, AlertCircle } from 'lucide-react'

interface Product {
    id: string
    name: string
    price: number
    stock: number
    is_available: boolean
    category: string
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Kit Fraldinha Premium',
        price: 189.90,
        stock: 5,
        is_available: true,
        category: 'Especiais'
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

    const lowStockItems = products.filter(p => p.stock <= 2)

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
                            <p className="text-sm text-zinc-300">{lowStockItems.length} produto(s) com estoque baixo</p>
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
                                    <td className="px-6 py-4 font-semibold text-white">{product.name}</td>
                                    <td className="px-6 py-4 text-zinc-400">{product.category}</td>
                                    <td className="px-6 py-4 font-mono font-bold text-amber-500">
                                        R$ {product.price.toFixed(2)}
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
                                        <button className="text-amber-500 hover:text-amber-400">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}
