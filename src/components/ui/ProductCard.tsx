/**
 * @name ProductCard Component - Elite Edition
 * @description Glassmorphism card com Framer Motion, analytics tracking e prova social dinâmica
 * @version 2.0 - Nível de Excelência
 * 
 * Features:
 * - Glassmorphism com efeito de glow no hover
 * - Animações suaves com Framer Motion (enter, hover, tap)
 * - Rastreamento automático de cliques (GTM + Meta Pixel)
 * - "Prova social dinâmica" (contador de pessoas que pediram)
 * - Mobile tap feedback (whileTap)
 * - Otimização de imagem com Next.js Image
 * - Ícones com Lucide React (Plus, Flame)
 * 
 * @example
 * <ProductCard
 *   product={product}
 *   onAddToCart={handleAdd}
 *   onViewProduct={handleView}
 * />
 */

'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Flame } from 'lucide-react'
import Image from 'next/image'
import { PriceTag } from './PriceTag'
import { trackAddToCart, trackViewContent, buildUtmLink } from '@/lib/analytics'
import { generateSocialProof, getUrgencyBadge } from '@/utils/social-proof'

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

interface ProductCardProps {
    product: Product
    onAddToCart: (product: Product) => void
    onViewProduct?: (product: Product) => void
    isOutOfStock?: boolean
    loading?: boolean
    className?: string
    storeSlug?: string
}

export function ProductCard({
    product,
    onAddToCart,
    onViewProduct,
    isOutOfStock = false,
    loading = false,
    className = '',
    storeSlug = 'bem-estar',
}: ProductCardProps) {
    // Gerar "prova social" dinâmica (em produção vem do Supabase)
    const socialProofCount = useMemo(
        () => generateSocialProof(product.id, 5),
        [product.id]
    )

    const badgeVariants = {
        promo: 'bg-red-500/90 backdrop-blur-sm',
        new: 'bg-green-500/90 backdrop-blur-sm',
        limited: 'bg-amber-500/90 backdrop-blur-sm',
        burning: 'bg-orange-600/90 backdrop-blur-sm',
    }

    /**
     * Track event - integrado com Google Analytics 4 e Meta Pixel
     * Envia evento de seleção de produto para ambas as plataformas
     */
    const handleTrackClick = () => {
        trackAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            category: 'churrascaria',
        })

        // Build UTM link para compartilhamento posterior
        const utmLink = buildUtmLink(
            `/${storeSlug}/checkout?product=${product.id}`,
            {
                utm_source: 'product_card',
                utm_content: product.name.toLowerCase().replace(/\s+/g, '_'),
            }
        )

        console.log('[ProductCard] Tracked:', {
            product: product.name,
            price: product.price,
            utm: utmLink,
        })
    }

    /**
     * Handle add to cart com rastreamento
     */
    const handleAddClick = () => {
        handleTrackClick()
        onAddToCart(product)
    }

    /**
     * View product tracking (opcional)
     */
    const handleViewClick = () => {
        if (onViewProduct) {
            trackViewContent({
                id: product.id,
                name: product.name,
                price: product.price,
            })
            onViewProduct(product)
        }
    }

    // Container animation variants
    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    }

    const imageVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.08, transition: { duration: 0.3 } },
    }

    const badgeVariants_motion = {
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0, transition: { duration: 0.5 } },
        pulse: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } },
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={containerVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className={`
        group relative h-full rounded-2xl overflow-hidden
        bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50
        transition-all duration-300 cursor-pointer
        hover:border-ember-accent/50 hover:shadow-ember-glow
        ${isOutOfStock ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}
        ${className}
      `}
            onClick={handleViewClick}
            onDoubleClick={handleAddClick}
        >
            {/* Badge com Flame icon */}
            {product.badge && (
                <motion.div
                    initial="initial"
                    animate={['animate', 'pulse']}
                    variants={badgeVariants_motion}
                    className={`
            absolute top-3 right-3 z-20
            px-3 py-1 rounded-full text-xs font-bold text-white
            flex items-center gap-1
            ${badgeVariants[product.badge.variant || 'promo']}
          `}
                >
                    {product.badge.variant === 'burning' && (
                        <Flame size={14} className="animate-pulse" />
                    )}
                    {product.badge.text}
                </motion.div>
            )}

            {/* Image Container com Motion */}
            <motion.div
                className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900"
                variants={imageVariants}
                initial="initial"
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%2318181b' width='400' height='300'/%3E%3C/svg%3E"
                    loading="lazy"
                />
                {/* Overlay gradient elegante */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                {/* Social Proof Badge (canto inferior esquerdo) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-3 left-3 z-10
            bg-zinc-900/80 backdrop-blur-sm border border-ember-accent/30
            px-2 py-1 rounded-lg text-xs text-ember-secondary
            font-mono"
                >
                    {socialProofCount}+ pediram hoje
                </motion.div>
            </motion.div>

            {/* Content Container */}
            <div className="p-4 space-y-3 flex flex-col h-full">
                {/* Title */}
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg font-bold text-white line-clamp-2"
                >
                    {product.name}
                </motion.h3>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-sm text-ember-secondary line-clamp-2 flex-grow"
                >
                    {product.description}
                </motion.p>

                {/* Urgency Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-amber-500 font-medium"
                >
                    {getUrgencyBadge('medium')}
                </motion.div>

                {/* Price */}
                <PriceTag
                    value={product.price}
                    originalPrice={product.originalPrice}
                />

                {/* CTA Button with Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="w-full"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleAddClick()
                        }}
                        disabled={isOutOfStock || loading}
                        className={`
            w-full px-4 py-3 rounded-lg
            bg-gradient-to-r from-ember-accent to-amber-600
            text-white font-bold text-sm
            flex items-center justify-center gap-2
            transition-all duration-200
            ${isOutOfStock || loading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:shadow-lg hover:shadow-amber-500/20'
                            }
          `}
                    >
                        <Plus size={18} />
                        {isOutOfStock ? 'Esgotado' : 'Adicionar'}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    )
}
