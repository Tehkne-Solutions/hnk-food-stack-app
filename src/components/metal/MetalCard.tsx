/**
 * MetalCard Component - Industrial-Ember Design System
 * Steel-brushed backgrounds with zinc gradients and fire accents
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetalCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'dark';
    hover?: boolean;
    glowing?: boolean;
    interactive?: boolean;
}

export function MetalCard({
    children,
    className,
    variant = 'primary',
    hover = true,
    glowing = false,
    interactive = false,
}: MetalCardProps) {
    const baseStyles =
        'rounded-lg border backdrop-blur-sm transition-all duration-300';

    const variantStyles = {
        primary:
            'bg-gradient-to-br from-steel-silver to-steel-brushed border-steel-brushed/30 shadow-steel-shadow',
        secondary:
            'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700/50 shadow-ember-deep',
        accent:
            'bg-gradient-to-br from-amber-900/20 to-amber-950/10 border-ember-core/30 shadow-fire-glow',
        dark:
            'bg-gradient-to-br from-deep-charcoal to-zinc-900 border-zinc-800/50 shadow-ember-deep',
    };

    const hoverStyles = hover
        ? 'hover:shadow-fire-glow hover:border-ember-core/50 hover:scale-105'
        : '';

    const glowingStyles = glowing
        ? 'animate-fire-pulse shadow-fire-glow border-ember-core/50'
        : '';

    const interactiveStyles = interactive
        ? 'cursor-pointer active:scale-95'
        : '';

    return (
        <div
            className={cn(
                baseStyles,
                variantStyles[variant],
                hoverStyles,
                glowingStyles,
                interactiveStyles,
                className,
            )}
        >
            {/* Metal inset effect */}
            <div className="absolute inset-0 rounded-lg shadow-metal-inset pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export function MetalCardHeader({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'pb-4 border-b border-steel-brushed/20 mb-4',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function MetalCardContent({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('space-y-3', className)}>
            {children}
        </div>
    );
}

export function MetalCardFooter({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'pt-4 border-t border-steel-brushed/20 mt-4',
                className,
            )}
        >
            {children}
        </div>
    );
}
