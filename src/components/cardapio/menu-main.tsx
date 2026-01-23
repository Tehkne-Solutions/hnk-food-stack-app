'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Plus, MessageCircle } from 'lucide-react'
import { mockProducts, categories } from '@/lib/mock-data'
import { ProductCard } from './product-card'
import { CategoryScrollBar } from './category-scroll-bar'
import { type ProductCategory } from '@/types'

export function MenuMain() {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('carnes')
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(mockProducts)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Filtrar produtos por categoria e busca
    useEffect(() => {
        let filtered = mockProducts.filter(
            (product) => product.category === selectedCategory
        )

        if (searchQuery) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setFilteredProducts(filtered)
    }, [selectedCategory, searchQuery])

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
            {/* Header Fixo */}
            <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d97706]/20 py-4 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Localização e Nome */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <MapPin className="w-4 h-4 text-[#d97706]" />
                        <span className="text-sm text-gray-400">Entrega em</span>
                        <span className="text-sm font-semibold text-white">São Paulo, SP</span>
                    </motion.div>

                    {/* Barra de Busca */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar no cardápio..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#1a1a1a] text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 border border-[#d97706]/20 focus:outline-none focus:border-[#d97706]/50 transition-colors"
                        />
                    </motion.div>
                </div>
            </header>

            {/* Carrossel de Categorias */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="sticky top-[88px] z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#d97706]/10 py-3"
            >
                <CategoryScrollBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(id) => setSelectedCategory(id as ProductCategory)}
                    scrollContainerRef={scrollContainerRef}
                />
            </motion.div>

            {/* Conteúdo Principal - Produtos */}
            <main className="max-w-4xl mx-auto px-4 py-6 pb-32">
                {/* Título da Categoria */}
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <h1 className="text-2xl font-bold text-white mb-1">
                        {categories.find((c) => c.id === selectedCategory)?.label}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {filteredProducts.length} itens disponíveis
                    </p>
                </motion.div>

                {/* Grid de Produtos com Animação */}
                <AnimatePresence mode="wait">
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.3,
                                        ease: 'easeOut',
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-12"
                        >
                            <div className="text-4xl mb-4">🔍</div>
                            <p className="text-gray-400 text-center">
                                Nenhum produto encontrado para "{searchQuery}"
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Botão Flutuante WhatsApp */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/5511999999999')}
                className="fixed bottom-8 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#25d366] to-[#1ea853] shadow-2xl flex items-center justify-center text-white hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-shadow"
            >
                {/* Pulsação suave */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[#25d366]/20"
                />
                <MessageCircle className="w-6 h-6 relative z-10" />
            </motion.button>
        </div>
    )
}
