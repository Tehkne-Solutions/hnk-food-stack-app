/**
 * FireButton Component
 * Primary action button with ember glow effect
 * Uso: <FireButton onClick={handleClick} size="md">Adicionar ao Carrinho</FireButton>
 */

import React from 'react'

interface FireButtonProps {
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    children: React.ReactNode
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

export function FireButton({
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    children,
    className = '',
    type = 'button',
}: FireButtonProps) {
    // Estilo base
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 font-sans flex items-center justify-center gap-2'

    // Variações
    const variantStyles = {
        primary: 'bg-ember-accent text-white hover:shadow-ember-glow hover:scale-105 active:scale-95',
        secondary: 'bg-zinc-700 text-white hover:bg-zinc-600 active:scale-95',
        ghost: 'bg-transparent text-ember-accent border border-ember-accent/30 hover:bg-zinc-900/40 active:scale-95',
    }

    // Tamanhos
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3 text-lg',
    }

    const isDisabled = disabled || loading

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    )
}
