'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface CategoryScrollBarProps {
    categories: Array<{ id: string; label: string; icon: string }>
    selectedCategory: string
    onSelectCategory: (id: string) => void
    scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export function CategoryScrollBar({
    categories,
    selectedCategory,
    onSelectCategory,
    scrollContainerRef,
}: CategoryScrollBarProps) {
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)

    const checkScroll = () => {
        const container = scrollContainerRef.current
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0)
            setShowRightArrow(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            )
        }
    }

    useEffect(() => {
        checkScroll()
        const container = scrollContainerRef.current
        container?.addEventListener('scroll', checkScroll)
        window.addEventListener('resize', checkScroll)

        return () => {
            container?.removeEventListener('scroll', checkScroll)
            window.removeEventListener('resize', checkScroll)
        }
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current
        if (container) {
            const scrollAmount = 200
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Botão Esquerdo */}
            {showLeftArrow && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent px-2 py-2 text-gray-400 hover:text-[#d97706] transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>
            )}

            {/* Container de Categorias */}
            <div
                ref={scrollContainerRef}
                className="flex gap-3 px-4 overflow-x-auto scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]"
            >
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectCategory(category.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${selectedCategory === category.id
                            ? 'bg-gradient-to-r from-[#d97706] to-[#b45309] text-white shadow-lg shadow-[#d97706]/40'
                            : 'bg-[#1a1a1a] text-gray-300 border border-[#d97706]/20 hover:border-[#d97706]/50'
                            }`}
                    >
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                    </motion.button>
                ))}
            </div>

            {/* Botão Direito */}
            {showRightArrow && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent px-2 py-2 text-gray-400 hover:text-[#d97706] transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            )}
        </div>
    )
}
