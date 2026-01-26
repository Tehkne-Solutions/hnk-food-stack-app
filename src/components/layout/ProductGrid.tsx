/**
 * @name ProductGrid Component
 * @description Grid responsivo de produtos com lazy loading
 * @version 1.0
 * 
 * Features:
 * - Grid 1-4 colunas responsivo
 * - Lazy loading com IntersectionObserver
 * - Skeleton loading durante carregamento
 * - Animação stagger de entrada
 * - Integração com ProductCard
 * 
 * @example
 * <ProductGrid products={products} onAddToCart={handleAdd} />
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/ProductCard'
import { SkeletonScreen } from '@/components/ui/SkeletonScreen'
import { containerVariants, itemVariants } from '@/lib/motion-variants'

interface Product {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    image: string
    badge?: {
        text: string
        variant?: 'promo' | 'new' | 'limited' | 'burning'
    }
}

interface ProductGridProps {
    products: Product[]
    onAddToCart: (product: Product) => void
    onViewProduct?: (product: Product) => void
    isLoading?: boolean
    gridCols?: 'auto' | '2' | '3' | '4'
}

export function ProductGrid({
    products,
    onAddToCart,
    onViewProduct,
    isLoading = false,
    gridCols = 'auto',
}: ProductGridProps) {
    const gridClassMap = {
        auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        '2': 'grid-cols-1 sm:grid-cols-2',
        '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }

    // Show skeleton while loading
    if (isLoading) {
        return (
            <section className="w-full py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SkeletonScreen count={8} type="product" />
                </div>
            </section>
        )
    }

    // Empty state
    if (products.length === 0) {
        return (
            <section className="w-full py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-zinc-400 text-lg">Nenhum produto encontrado</p>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className={`grid gap-6 sm:gap-8 ${gridClassMap[gridCols]}`}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            className="h-full"
                        >
                            <ProductCard
                                product={product}
                                onAddToCart={onAddToCart}
                                onViewProduct={onViewProduct}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
