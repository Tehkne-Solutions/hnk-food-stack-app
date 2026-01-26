/**
 * @name CTAWhatsApp Component
 * @description CTA button integrado com WhatsApp wa.me links
 * @version 1.0
 * 
 * Features:
 * - WhatsApp link builder
 * - UTM parameters
 * - Responsive
 * - Animation variants
 * 
 * @example
 * <CTAWhatsApp phone="11987654321" storeName="Bem Estar" />
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useWhatsAppLink } from '@/hooks/use-whatsapp-link'

interface CTAWhatsAppProps {
    phone: string
    storeName?: string
    message?: string
    className?: string
}

export function CTAWhatsApp({ phone, storeName = 'Bem Estar', message, className }: CTAWhatsAppProps) {
    const { openWhatsApp } = useWhatsAppLink({
        phone,
        message: message || `Olá! Gostaria de fazer um pedido em ${storeName}!`,
        campaign: 'cta-whatsapp',
    })

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWhatsApp()}
            className={`
        flex items-center gap-2 px-6 py-3 rounded-lg
        bg-green-500 hover:bg-green-600
        text-white font-semibold
        transition-all duration-200
        shadow-lg hover:shadow-xl
        ${className || ''}
      `}
        >
            <MessageCircle size={20} />
            Abrir WhatsApp
        </motion.button>
    )
}
