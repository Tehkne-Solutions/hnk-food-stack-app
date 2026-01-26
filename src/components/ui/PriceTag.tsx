/**
 * PriceTag Component
 * Displays price in BRL format with optional strikethrough for original price
 * Uso: <PriceTag value={49.90} originalPrice={99.90} />
 */

import React from 'react'

interface PriceTagProps {
    value: number
    originalPrice?: number
    className?: string
}

/**
 * Format number to BRL currency string
 * @param value - Number to format
 * @returns Formatted string like "R$ 49,90"
 */
export function formatBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export function PriceTag({ value, originalPrice, className = '' }: PriceTagProps) {
    return (
        <div className={`flex items-baseline gap-2 ${className}`}>
            {originalPrice && (
                <span className="text-sm text-zinc-400 line-through font-mono">
                    {formatBRL(originalPrice)}
                </span>
            )}
            <span className="text-2xl font-bold text-ember-accent font-mono">
                {formatBRL(value)}
            </span>
        </div>
    )
}
