/**
 * @name FeaturedProduct Component
 * @description Seção de destaque com produto em grande escala
 * @version 1.0
 * 
 * Features:
 * - Layout split: imagem + content
 * - Animação parallax no scroll (optional)
 * - Badges de destaque
 * - Call-to-action botão
 * - Preço destacado
 * - Responsivo mobile
 * 
 * @example
 * <FeaturedProduct product={product} onAddToCart={handleAdd} />
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import Image from 'next/image'
import { PriceTag } from '@/components/ui/PriceTag'

interface FeaturedProductProps {
    title: string
    subtitle?: string
    description?: string
    image: string
    price: number
    originalPrice?: number
    badge?: string
    onCTA?: () => void
    ctaText?: string
}

export function FeaturedProduct({
    title,
    subtitle,
    description,
    image,
    price,
    originalPrice,
    badge = 'Destaque',
    onCTA,
    ctaText = 'Ver Detalhes',
}: FeaturedProductProps) {
    return (
        <section className="relative w-full overflow-hidden py-8 sm:py-12 lg:py-16">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/50 to-zinc-900 -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="relative h-80 sm:h-96 lg:h-[500px]"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover rounded-2xl"
                                priority
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent rounded-2xl" />

                            {/* Badge */}
                            {badge && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`
                    absolute top-4 right-4
                    px-4 py-2 rounded-full
                    bg-amber-500/90 backdrop-blur-sm
                    text-white font-bold text-sm
                    flex items-center gap-2
                    border border-amber-400/50
                  `}
                                >
                                    <Flame size={16} />
                                    {badge}
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Subtitle */}
                        {subtitle && (
                            <motion.p
                                className="text-sm sm:text-base text-amber-400 font-semibold uppercase tracking-widest"
                            >
                                {subtitle}
                            </motion.p>
                        )}

                        {/* Title */}
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            {title}
                        </h2>

                        {/* Description */}
                        {description && (
                            <p className="text-lg text-zinc-300 leading-relaxed">
                                {description}
                            </p>
                        )}

                        {/* Price */}
                        <div className="pt-4">
                            <PriceTag
                                value={price}
                                originalPrice={originalPrice}
                                className="text-2xl sm:text-3xl"
                            />
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onCTA}
                            className={`
                inline-flex items-center gap-3
                px-6 sm:px-8 py-3 sm:py-4
                bg-gradient-to-r from-ember-accent to-amber-600
                text-white font-bold text-base sm:text-lg
                rounded-xl
                hover:shadow-lg hover:shadow-amber-500/50
                transition-all duration-300
                border border-amber-400/30
              `}
                        >
                            {ctaText}
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
