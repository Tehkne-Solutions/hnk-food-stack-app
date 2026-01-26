/**
 * @name StatusPill Component
 * @description Componente de badge/pill com animações e variantes
 * @version 1.0
 * 
 * Features:
 * - Variantes: default, success, warning, error, info, premium
 * - Animações: pulse, bounce, fade
 * - Suporte a ícone (Lucide)
 * - Sizes: sm, md, lg
 * - Closeable (botão X)
 * 
 * @example
 * <StatusPill
 *   text="Oferta do Mestre"
 *   variant="premium"
 *   animation="pulse"
 * />
 */

'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface StatusPillProps {
    text: string
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'premium'
    animation?: 'pulse' | 'bounce' | 'fade' | 'none'
    size?: 'sm' | 'md' | 'lg'
    icon?: React.ReactNode
    onClose?: () => void
    className?: string
}

export function StatusPill({
    text,
    variant = 'default',
    animation = 'pulse',
    size = 'md',
    icon,
    onClose,
    className = '',
}: StatusPillProps) {
    const [isVisible, setIsVisible] = React.useState(true)

    const handleClose = () => {
        setIsVisible(false)
        onClose?.()
    }

    const variantStyles = {
        default: 'bg-zinc-700/50 border-zinc-600/50 text-zinc-100',
        success: 'bg-green-600/50 border-green-500/50 text-green-100',
        warning: 'bg-orange-600/50 border-orange-500/50 text-orange-100',
        error: 'bg-red-600/50 border-red-500/50 text-red-100',
        info: 'bg-blue-600/50 border-blue-500/50 text-blue-100',
        premium: 'bg-gradient-to-r from-amber-600/50 to-orange-600/50 border-amber-500/50 text-amber-100',
    }

    const sizeStyles = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    }

    const animationVariants = {
        pulse: {
            animate: { opacity: [1, 0.7, 1] },
            transition: { duration: 2, repeat: Infinity },
        },
        bounce: {
            animate: { y: [0, -2, 0] },
            transition: { duration: 1, repeat: Infinity },
        },
        fade: {
            animate: { opacity: [1, 0.5, 1] },
            transition: { duration: 3, repeat: Infinity },
        },
        none: {
            animate: {},
            transition: {},
        },
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`
            inline-flex items-center gap-2
            rounded-full border backdrop-blur-sm
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${className}
          `}
                >
                    {/* Animation wrapper */}
                    <motion.div
                        {...animationVariants[animation]}
                        className="flex items-center gap-1"
                    >
                        {/* Icon */}
                        {icon && <span className="flex-shrink-0">{icon}</span>}

                        {/* Text */}
                        <span className="font-medium">{text}</span>
                    </motion.div>

                    {/* Close Button */}
                    {onClose && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClose}
                            className="flex-shrink-0 ml-1 p-0.5 rounded hover:opacity-70 transition-opacity"
                            aria-label="Fechar"
                        >
                            <X size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
                        </motion.button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
