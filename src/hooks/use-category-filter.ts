/**
 * @name useCategoryFilter Hook
 * @description Hook para gerenciar filtro de categorias e produtos
 * @version 1.0
 * 
 * Features:
 * - Gerenciar categoria selecionada
 * - Filtrar produtos por categoria
 * - Manter estado de filtro
 * 
 * @example
 * const { selectedCategory, filteredProducts, handleCategoryChange } = useCategoryFilter(products)
 */

import { useState, useMemo } from 'react'

export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category?: string
}

interface UseCategoryFilterReturn {
    selectedCategory: string | null
    filteredProducts: Product[]
    categories: string[]
    handleCategoryChange: (category: string | null) => void
}

export function useCategoryFilter(products: Product[]): UseCategoryFilterReturn {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Extrair categorias únicas dos produtos
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(products.map((p) => p.category).filter(Boolean))
        )
        return uniqueCategories as string[]
    }, [products])

    // Filtrar produtos baseado na categoria selecionada
    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return products
        return products.filter((p) => p.category === selectedCategory)
    }, [products, selectedCategory])

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category)
    }

    return {
        selectedCategory,
        filteredProducts,
        categories,
        handleCategoryChange,
    }
}
