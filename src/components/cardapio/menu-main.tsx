'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, MessageCircle, Loader, AlertTriangle } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-react'
import { useTenant } from '@/context/TenantContext'
import { Product } from '@/types' // Assumindo que você tem um tipo Product
import { categories } from '@/lib/mock-data' // Categorias ainda mockadas por enquanto
import { ProductCard } from './product-card'
import { CategoryScrollBar } from './category-scroll-bar'
import { CartButton } from '@/components/cart-button'
import { type ProductCategory } from '@/types'

export function MenuMain() {
    const { organization } = useTenant()
    const supabase = createClientComponentClient()

    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('carnes')
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Buscar produtos do Supabase quando a organização for identificada
    useEffect(() => {
        const fetchProducts = async () => {
            if (!organization) {
                setLoading(false)
                // Poderia mostrar uma mensagem "Organização não encontrada"
                return
            }

            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('org_id', organization.id)

            if (error) {
                console.error('Erro ao buscar produtos:', error)
                setError('Não foi possível carregar os produtos. Tente novamente mais tarde.')
                setAllProducts([])
            } else {
                setAllProducts(data || [])
            }
            setLoading(false)
        }

        fetchProducts()
    }, [organization, supabase])

    // Filtrar produtos localmente por categoria e busca
    useEffect(() => {
        let filtered = allProducts.filter(
            (product) => product.category === selectedCategory
        )

        if (searchQuery) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        }

        setFilteredProducts(filtered)
    }, [selectedCategory, searchQuery, allProducts])
    
    // Renderização de conteúdo principal baseada no estado
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Loader className="w-8 h-8 animate-spin mb-4" />
                    <p>Carregando o cardápio...</p>
                </div>
            )
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-amber-500">
                    <AlertTriangle className="w-8 h-8 mb-4" />
                    <p>{error}</p>
                </div>
            )
        }

        if (filteredProducts.length > 0) {
            return (
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
            )
        }
        
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
            >
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-gray-400 text-center">
                    Nenhum produto encontrado para esta categoria ou busca.
                </p>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
            {/* Header Fixo */}
            <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d97706]/20 py-4 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Localização e Carrinho */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between gap-2 mb-4"
                    >
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#d97706]" />
                            <span className="text-sm text-gray-400">Cardápio de</span>
                            <span className="text-sm font-semibold text-white">{organization?.name || 'HNK Food'}</span>
                        </div>
                        <CartButton />
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
                    {renderContent()}
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
