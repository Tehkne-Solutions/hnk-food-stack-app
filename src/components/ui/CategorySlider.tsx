/**
 * @name CategorySlider Component
 * @description Scroll horizontal de categorias com snap-scroll no mobile
 * @version 1.0
 * 
 * Features:
 * - Scroll horizontal smooth (snap-scroll mobile)
 * - Categorias customizáveis
 * - Active state visual
 * - onSelect callback
 * - Scroll buttons (prev/next) opcional
 * - Mobile responsive (hide buttons)
 * 
 * @example
 * <CategorySlider
 *   categories={['Fraldinha', 'Picanha', 'Assado', 'Bebidas']}
 *   onSelect={(category) => filterProducts(category)}
 * />
 */

'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CategorySliderProps {
    categories: string[]
    onSelect: (category: string) => void
    selectedCategory?: string
    showScrollButtons?: boolean
}

export function CategorySlider({
    categories,
    onSelect,
    selectedCategory,
    showScrollButtons = true,
}: CategorySliderProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const scrollAmount = 200

        if (direction === 'left') {
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            })
        } else {
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            })
        }

        // Update button states after scroll
        setTimeout(() => checkScroll(), 200)
    }

    const checkScroll = () => {
        if (!scrollContainerRef.current) return

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }

    React.useEffect(() => {
        checkScroll()
        window.addEventListener('resize', checkScroll)
        return () => window.removeEventListener('resize', checkScroll)
    }, [])

    return (
        <div className="w-full px-4 py-4 sm:py-6">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-sm font-semibold text-ember-secondary mb-4 hidden sm:block">
                    Categorias
                </h3>

                <div className="relative group">
                    {/* Left Scroll Button */}
                    {showScrollButtons && canScrollLeft && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => scroll('left')}
                            className={`
                absolute left-0 top-1/2 -translate-y-1/2 z-10
                hidden sm:flex items-center justify-center
                w-8 h-8 rounded-full
                bg-zinc-900/80 border border-zinc-700/50
                backdrop-blur-sm
                hover:bg-zinc-800
                transition-all duration-200
              `}
                        >
                            <ChevronLeft size={16} className="text-white" />
                        </motion.button>
                    )}

                    {/* Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className={`
              flex gap-3 overflow-x-auto
              snap-x snap-mandatory scroll-smooth
              pb-2 -mb-2
              sm:gap-4
            `}
                        style={{
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => onSelect(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                  flex-shrink-0 px-4 py-2 rounded-lg
                  font-medium text-sm whitespace-nowrap
                  snap-center
                  transition-all duration-300
                  ${selectedCategory === category
                                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50'
                                        : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50'
                                    }
                  border border-zinc-700/30
                `}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Scroll Button */}
                    {showScrollButtons && canScrollRight && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => scroll('right')}
                            className={`
                absolute right-0 top-1/2 -translate-y-1/2 z-10
                hidden sm:flex items-center justify-center
                w-8 h-8 rounded-full
                bg-zinc-900/80 border border-zinc-700/50
                backdrop-blur-sm
                hover:bg-zinc-800
                transition-all duration-200
              `}
                        >
                            <ChevronRight size={16} className="text-white" />
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    )
}
