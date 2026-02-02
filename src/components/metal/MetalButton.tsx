/**
 * MetalButton Component - Industrial-Ember Design System
 * Amber glow effects with steel-brushed backgrounds and fire animations
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    glowing?: boolean;
    pulsing?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
}

export function MetalButton({
    children,
    variant = 'primary',
    size = 'md',
    glowing = true,
    pulsing = false,
    icon,
    iconPosition = 'right',
    className,
    disabled,
    ...props
}: MetalButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center font-medium font-geist-black rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: `
      bg-gradient-to-r from-ember-core to-blood-orange
      text-white
      shadow-fire-glow
      hover:shadow-fire-glow hover:scale-105
      focus:ring-amber-400
      active:scale-95
      ${glowing ? 'animate-metal-shine' : ''}
      border border-amber-400/30
    `,
        secondary: `
      bg-gradient-to-r from-steel-silver to-steel-brushed
      text-deep-charcoal
      shadow-steel-shadow
      hover:shadow-fire-glow hover:border-ember-core/50
      focus:ring-amber-400
      active:scale-95
      border border-steel-brushed/50
    `,
        ghost: `
      bg-transparent
      text-ember-core
      border border-ember-core/30
      hover:bg-ember-core/10
      hover:border-ember-core/50
      focus:ring-amber-400
      active:scale-95
    `,
        danger: `
      bg-gradient-to-r from-red-600 to-blood-orange
      text-white
      shadow-fire-glow
      hover:shadow-fire-glow hover:scale-105
      focus:ring-red-400
      active:scale-95
      border border-red-400/30
    `,
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm gap-2',
        md: 'px-4 py-2.5 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-3',
        xl: 'px-8 py-4 text-xl gap-3',
    };

    const pulsingClass = pulsing ? 'animate-fire-pulse' : '';

    return (
        <button
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                pulsingClass,
                className,
            )}
            disabled={disabled}
            {...props}
        >
            {icon && iconPosition === 'left' && (
                <span className="flex-shrink-0">{icon}</span>
            )}

            <span>{children}</span>

            {icon && iconPosition === 'right' && (
                <span className="flex-shrink-0">{icon}</span>
            )}
        </button>
    );
}

export function MetalButtonGroup({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('flex gap-2 flex-wrap', className)}>
            {children}
        </div>
    );
}
