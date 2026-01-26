/**
 * @name ShopContent Component
 * @description Conteúdo da loja com filtro de categorias
 * @version 1.0
 */

'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { CategorySlider } from '@/components/ui/CategorySlider'
import { ProductGrid } from '@/components/layout/ProductGrid'
import { useCategoryFilter, type Product } from '@/hooks/use-category-filter'

interface ShopContentProps {
    products: Product[]
}

export function ShopContent({ products }: ShopContentProps) {
    const { selectedCategory, filteredProducts, categories, handleCategoryChange } =
        useCategoryFilter(products)

    return (
        <div className="space-y-12">
            {/* Category Filter Section */}
            {categories.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <SectionTitle
                        title="Filtrar por Categoria"
                        subtitle="Escolha os cortes que deseja"
                    />
                    <CategorySlider
                        categories={['Todos', ...categories]}
                        selectedCategory={selectedCategory || 'Todos'}
                        onSelect={(category) => {
                            handleCategoryChange(category === 'Todos' ? null : category)
                        }}
                    />
                </motion.section>
            )}

            {/* Product Grid with Animation */}
            <AnimatePresence mode="wait">
                <motion.section
                    key={selectedCategory || 'all'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                >
                    <SectionTitle
                        title={selectedCategory ? `Cortes de ${selectedCategory}` : 'Todos os Cortes'}
                        subtitle={`${filteredProducts.length} produto${filteredProducts.length !== 1 ? 's' : ''
                            } disponível${filteredProducts.length !== 1 ? 's' : ''}`}
                    />
                    <ProductGrid
                        products={filteredProducts}
                        onAddToCart={() => {
                            console.log('Adicionar ao carrinho')
                        }}
                        onViewProduct={() => {
                            console.log('Ver produto')
                        }}
                    />
                </motion.section>
            </AnimatePresence>
        </div>
    )
}
