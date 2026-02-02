'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Plus, AlertCircle, Zap, Search, Filter, TrendingUp, Package, Trash2, Save } from 'lucide-react'

interface Product {
    id: string
    name: string
    price: number
    stock: number
    is_available: boolean
    category: string
    sku: string
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
        sku: 'SKU-001',
        is_promo: true,
        promo_price: 159.90
    },
    {
        id: '2',
        name: 'Picanha Angus',
        price: 129.90,
        stock: 2,
        is_available: true,
        category: 'Cortes Nobres',
        sku: 'SKU-002'
    },
    {
        id: '3',
        name: 'Assado de Tira',
        price: 99.90,
        stock: 0,
        is_available: false,
        category: 'Carnes',
        sku: 'SKU-003'
    },
    {
        id: '4',
        name: 'Costela Bovina',
        price: 110.00,
        stock: 8,
        is_available: true,
        category: 'Cortes Nobres',
        sku: 'SKU-004'
    },
    {
        id: '5',
        name: 'Churrasco Misto',
        price: 85.00,
        stock: 1,
        is_available: true,
        category: 'Especiais',
        sku: 'SKU-005',
        is_promo: true,
        promo_price: 69.90
    },
    {
        id: '6',
        name: 'Espetinho Misto',
        price: 65.00,
        stock: 15,
        is_available: true,
        category: 'Acompanhamentos',
        sku: 'SKU-006'
    }
]

const categories = ['Todas', 'Especiais', 'Cortes Nobres', 'Carnes', 'Acompanhamentos']

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Todas')
    const [editingProduct, setEditingProduct] = useState<string | null>(null)
    const [editPrice, setEditPrice] = useState<number>(0)

    const lowStockItems = products.filter(p => p.stock <= 3)
    const outOfStockItems = products.filter(p => p.stock === 0)

    const filteredProducts = products.filter(product => {
        const matchSearch = !searchTerm ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.includes(searchTerm)
        const matchCategory = selectedCategory === 'Todas' || product.category === selectedCategory
        return matchSearch && matchCategory
    })

    const stats = {
        total: products.length,
        available: products.filter(p => p.is_available).length,
        lowStock: lowStockItems.length,
        outOfStock: outOfStockItems.length
    }

    const handleSavePrice = (productId: string) => {
        setProducts(products.map(p =>
            p.id === productId ? { ...p, price: editPrice } : p
        ))
        setEditingProduct(null)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-4xl font-black italic text-white">
                        Cardápio <span className="text-amber-500">Completo</span>
                    </h1>
                    <p className="text-zinc-400 mt-2">Gerencie produtos e estoque • Total: {stats.total} produtos</p>
                </div>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg flex items-center gap-2 transition-colors">
                    <Plus size={18} />
                    Novo Produto
                </button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: stats.total, color: 'from-blue-500/20 to-cyan-500/10', icon: Package },
                    { label: 'Disponíveis', value: stats.available, color: 'from-green-500/20 to-emerald-500/10', icon: TrendingUp },
                    { label: 'Estoque Baixo', value: stats.lowStock, color: 'from-yellow-500/20 to-orange-500/10', icon: AlertCircle },
                    { label: 'Esgotados', value: stats.outOfStock, color: 'from-red-500/20 to-pink-500/10', icon: Trash2 }
                ].map((stat, i) => {
                    const StatIcon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`rounded-lg border border-zinc-800/50 bg-gradient-to-br ${stat.color} p-4 backdrop-blur-md`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold">{stat.label}</p>
                                    <p className="text-2xl font-black text-white mt-2">{stat.value}</p>
                                </div>
                                <StatIcon size={24} className="text-zinc-500" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Alerts */}
            {lowStockItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-4"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="text-amber-500 mt-0.5" />
                        <div>
                            <p className="font-bold text-amber-500">Aviso de Estoque Baixo</p>
                            <p className="text-sm text-zinc-300">{lowStockItems.length} produtos com estoque inferior a 3 unidades</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 p-4 backdrop-blur-md space-y-4"
            >
                <div className="flex items-center gap-2 bg-zinc-950 rounded-lg px-4 py-2 border border-zinc-800">
                    <Search size={18} className="text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou SKU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={18} className="text-zinc-400" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedCategory === cat
                                    ? 'bg-amber-500 text-black'
                                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Products Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Produto</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">SKU</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Categoria</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Preço</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Estoque</th>
                                <th className="px-6 py-4 text-left font-bold text-zinc-300">Status</th>
                                <th className="px-6 py-4 text-center font-bold text-zinc-300">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-zinc-900/50 transition-colors">
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
                                    <td className="px-6 py-4 text-xs text-zinc-500 font-mono">{product.sku}</td>
                                    <td className="px-6 py-4 text-zinc-400">{product.category}</td>
                                    <td className="px-6 py-4">
                                        {editingProduct === product.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Preço"
                                                    value={editPrice}
                                                    onChange={(e) => setEditPrice(parseFloat(e.target.value))}
                                                    className="w-24 px-2 py-1 bg-zinc-800 text-white rounded border border-zinc-700"
                                                />
                                                <button
                                                    onClick={() => handleSavePrice(product.id)}
                                                    className="text-green-500 hover:text-green-400"
                                                    title="Salvar preço"
                                                >
                                                    <Save size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="font-mono font-bold text-amber-500">
                                                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </div>
                                                {product.is_promo && product.promo_price && (
                                                    <div className="font-mono font-bold text-green-400 text-sm">
                                                        R$ {product.promo_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${product.stock === 0
                                                ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                                                : product.stock <= 3
                                                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                                                    : 'bg-green-500/20 text-green-300 border border-green-500/50'
                                            }`}>
                                            {product.stock} un
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${product.is_available
                                                ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                                : 'bg-red-500/20 text-red-300 border border-red-500/50'
                                            }`}>
                                            {product.is_available ? 'Disponível' : 'Esgotado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center flex gap-2 justify-center">
                                        <button
                                            onClick={() => {
                                                setEditingProduct(product.id)
                                                setEditPrice(product.price)
                                            }}
                                            className="text-amber-500 hover:text-amber-400 transition-colors"
                                            title="Editar preço"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            className="text-emerald-500 hover:text-emerald-400 transition-colors"
                                            title="Criar promoção"
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
        </div>
    )
}
