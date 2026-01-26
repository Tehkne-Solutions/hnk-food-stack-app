/**
 * @name Skeleton Loading Component
 * @description Componente de carregamento com múltiplos skeleton cards
 * @version 1.0
 * 
 * Features:
 * - Grid de skeleton cards (3-6 por padrão)
 * - Animação pulse suave
 * - Responsive (1-4 cols)
 * - Customizável: count, type (product|category)
 * 
 * @example
 * <SkeletonScreen count={6} type="product" />
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonScreenProps {
    count?: number
    type?: 'product' | 'category' | 'text'
}

export function SkeletonScreen({ count = 6, type = 'product' }: SkeletonScreenProps) {
    const skeletons = Array.from({ length: count }, (_, i) => i)

    const productSkeleton = (
        <div className="space-y-3">
            {/* Image */}
            <div className="w-full h-48 bg-zinc-700/50 rounded-lg" />
            {/* Title */}
            <div className="h-4 bg-zinc-700/50 rounded w-3/4" />
            {/* Description */}
            <div className="h-3 bg-zinc-700/50 rounded w-full" />
            <div className="h-3 bg-zinc-700/50 rounded w-2/3" />
            {/* Price */}
            <div className="h-5 bg-zinc-700/50 rounded w-1/2" />
            {/* Button */}
            <div className="h-10 bg-zinc-700/50 rounded-lg w-full" />
        </div>
    )

    const categorySkeleton = (
        <div className="h-10 bg-zinc-700/50 rounded-lg flex-shrink-0" />
    )

    const textSkeleton = (
        <div className="space-y-2">
            <div className="h-4 bg-zinc-700/50 rounded w-full" />
            <div className="h-4 bg-zinc-700/50 rounded w-5/6" />
            <div className="h-4 bg-zinc-700/50 rounded w-4/6" />
        </div>
    )

    const skeletonMap = {
        product: productSkeleton,
        category: categorySkeleton,
        text: textSkeleton,
    }

    return (
        <div
            className={`
        grid gap-4 w-full
        ${type === 'category'
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }
      `}
        >
            {skeletons.map((index) => (
                <motion.div
                    key={index}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                    className="rounded-lg bg-zinc-800/30 p-4"
                >
                    {skeletonMap[type]}
                </motion.div>
            ))}
        </div>
    )
}
