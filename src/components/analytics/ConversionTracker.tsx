'use client'

import { useEffect } from 'react'

/**
 * @description Dispara o evento de conversão para o Pixel e GA4
 * Integre este componente na página de "Sucesso" do Checkout.
 */
export const ConversionTracker = ({ amount, orderId }: { amount: number, orderId: string }) => {
  useEffect(() => {
    // Meta Pixel (Standard Event)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: amount,
        currency: 'BRL',
        content_ids: [orderId],
        content_type: 'product',
      })
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: orderId,
        value: amount,
        currency: 'BRL',
      })
    }

    console.log(`🔥 Conversão registrada: R$ ${amount}`)
  }, [amount, orderId])

  return null
}