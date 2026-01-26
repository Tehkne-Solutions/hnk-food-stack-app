/**
 * @name CartBadge Component
 * @description Badge flutuante sticky com contador de itens do carrinho
 * @version 1.0
 * 
 * Features:
 * - Posição sticky bottom-right (mobile)
 * - Contador com pulse animation
 * - Ícone carrinho (Lucide)
 * - Sombra com profundidade
 * - Integração com useCart hook
 * - Click para abrir carrinho
 * 
 * @example
 * <CartBadge
 *   itemCount={3}
 *   onClick={() => setCartOpen(true)}
 * />
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'

interface CartBadgeProps {
    onClick?: () => void
    hideEmpty?: boolean
}

export function CartBadge({ onClick, hideEmpty = true }: CartBadgeProps) {
    const { cart } = useCart()
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    // Esconder se vazio e hideEmpty for true
    if (hideEmpty && itemCount === 0) {
        return null
    }

    return (
        <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`
        fixed bottom-6 right-6 z-40
        w-16 h-16 rounded-full
        bg-gradient-to-br from-ember-accent to-amber-600
        shadow-2xl shadow-amber-500/40
        flex items-center justify-center gap-2
        border border-amber-400/50
        hover:shadow-amber-500/60
        transition-all duration-300
      `}
            title={`Ver carrinho (${itemCount} item${itemCount !== 1 ? 'ns' : ''})`}
            aria-label={`Carrinho com ${itemCount} item${itemCount !== 1 ? 'ns' : ''}`}
        >
            {/* Icon */}
            <ShoppingCart size={24} className="text-white" />

            {/* Counter Badge */}
            {itemCount > 0 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`
            absolute -top-2 -right-2
            w-6 h-6 rounded-full
            bg-red-500 border-2 border-white
            flex items-center justify-center
            text-white text-xs font-bold
            shadow-lg
          `}
                >
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3 }}
                        key={itemCount} // Re-animate quando count mudar
                    >
                        {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                </motion.div>
            )}

            {/* Pulse background effect */}
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`
          absolute inset-0 rounded-full
          bg-amber-400/20
          -z-10
        `}
            />
        </motion.button>
    )
}
