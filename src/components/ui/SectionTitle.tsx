/**
 * SectionTitle Component
 * Section header with subtle border and amber gradient accent
 * Uso: <SectionTitle title="Cortes Nobres" subtitle="Os melhores da Bem Estar" />
 */

import React from 'react'

interface SectionTitleProps {
    title: string
    subtitle?: string
    align?: 'left' | 'center' | 'right'
    className?: string
}

export function SectionTitle({
    title,
    subtitle,
    align = 'left',
    className = '',
}: SectionTitleProps) {
    const alignStyles = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    return (
        <div className={`${alignStyles[align]} ${className}`}>
            <div className="relative pb-4 mb-2">
                <h2 className="text-3xl font-black italic text-white font-sans">
                    {title}
                </h2>
                {/* Subtle bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ember-accent via-ember-accent/50 to-transparent" />
            </div>
            {subtitle && (
                <p className="text-ember-secondary text-sm italic">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
