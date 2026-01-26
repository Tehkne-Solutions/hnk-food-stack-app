/**
 * @name PromoBanner Component
 * @description Banner de promoção animado com slide-in e close button
 * @version 1.0
 * 
 * Features:
 * - Animação slide-in suave (Framer Motion)
 * - Close button com ícone X (Lucide)
 * - Customizável: title, subtitle, ctaText, variant
 * - Variants: info (blue), warning (orange), success (green), promo (amber)
 * - Suporte localStorage para "fechar por sessão"
 * - Mobile responsive
 * 
 * @example
 * <PromoBanner
 *   title="Promoção Relâmpago!"
 *   subtitle="Fraldinha por apenas R$ 49,90"
 *   ctaText="Ver Ofertas"
 *   variant="promo"
 *   onCTA={() => router.push('/promocoes')}
 * />
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface PromoBannerProps {
    title: string
    subtitle?: string
    ctaText?: string
    variant?: 'info' | 'warning' | 'success' | 'promo' | 'burning'
    onCTA?: () => void
    onClose?: () => void
    dismissKey?: string // Chave localStorage para "não mostrar novamente"
    duration?: number // Auto-close em ms
}

export function PromoBanner({
    title,
    subtitle,
    ctaText = 'Saiba Mais',
    variant = 'info',
    onCTA,
    onClose,
    dismissKey,
    duration,
}: PromoBannerProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Verificar se já foi fechado
        if (dismissKey && localStorage.getItem(dismissKey)) {
            setIsVisible(false)
            return
        }

        // Auto-close se duration definido
        if (duration) {
            const timer = setTimeout(() => setIsVisible(false), duration)
            return () => clearTimeout(timer)
        }
    }, [dismissKey, duration])

    const handleClose = () => {
        setIsVisible(false)
        if (dismissKey) {
            localStorage.setItem(dismissKey, 'true')
        }
        onClose?.()
    }

    const variantStyles = {
        info: 'bg-blue-600/90 border-blue-500/50',
        warning: 'bg-orange-600/90 border-orange-500/50',
        success: 'bg-green-600/90 border-green-500/50',
        promo: 'bg-amber-600/90 border-amber-500/50',
        burning: 'bg-red-600/90 border-red-500/50',
    }

    const variantIconBg = {
        info: 'bg-blue-500/30',
        warning: 'bg-orange-500/30',
        success: 'bg-green-500/30',
        promo: 'bg-amber-500/30',
        burning: 'bg-red-500/30',
    }

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`
            relative w-full
            ${variantStyles[variant]}
            border-b border-white/10 backdrop-blur-sm
            px-4 py-3 sm:px-6 sm:py-4
          `}
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        {/* Content */}
                        <div className="flex items-center gap-3 flex-1">
                            {/* Indicator dot */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`
                  w-3 h-3 rounded-full flex-shrink-0
                  ${variantIconBg[variant]}
                `}
                            />

                            {/* Text */}
                            <div className="flex-1">
                                <h3 className="font-bold text-white text-sm sm:text-base">
                                    {title}
                                </h3>
                                {subtitle && (
                                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* CTA Button */}
                        {ctaText && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onCTA}
                                className={`
                  px-4 py-2 rounded-lg
                  bg-white/20 hover:bg-white/30
                  text-white font-semibold text-sm
                  transition-colors duration-200
                  flex-shrink-0
                  border border-white/20
                `}
                            >
                                {ctaText}
                            </motion.button>
                        )}

                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClose}
                            className={`
                w-8 h-8 rounded-lg
                flex items-center justify-center
                bg-white/10 hover:bg-white/20
                transition-colors duration-200
                flex-shrink-0
              `}
                            title="Fechar"
                            aria-label="Fechar banner"
                        >
                            <X size={18} className="text-white" />
                        </motion.button>
                    </div>

                    {/* Progress bar (opcional - mostra tempo até auto-close) */}
                    {duration && (
                        <motion.div
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: duration / 1000, ease: 'linear' }}
                            className="absolute bottom-0 left-0 h-1 bg-white/40 origin-left"
                            style={{ transformOrigin: 'left' }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
