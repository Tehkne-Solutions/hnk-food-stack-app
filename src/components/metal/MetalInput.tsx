/**
 * MetalInput Component - Industrial-Ember Design System
 * Form inputs with steel-brushed styling and fire accents
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetalInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helper?: string;
    icon?: ReactNode;
    variant?: 'primary' | 'secondary';
    glowing?: boolean;
}

export function MetalInput({
    label,
    error,
    helper,
    icon,
    variant = 'primary',
    glowing = false,
    className,
    disabled,
    ...props
}: MetalInputProps) {
    const baseStyles =
        'w-full px-4 py-2.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans';

    const variantStyles = {
        primary: `
      bg-deep-charcoal/50 border border-steel-brushed/30
      text-steel-silver placeholder-steel-brushed
      hover:border-ember-core/30 hover:bg-deep-charcoal/70
      focus:border-ember-core/50 focus:bg-deep-charcoal/80 focus:ring-ember-core/30
      ${glowing ? 'shadow-fire-glow' : 'shadow-steel-shadow'}
    `,
        secondary: `
      bg-zinc-800/50 border border-zinc-600/30
      text-zinc-100 placeholder-zinc-500
      hover:border-ember-core/30 hover:bg-zinc-800/70
      focus:border-ember-core/50 focus:bg-zinc-800/80 focus:ring-ember-core/30
      shadow-steel-shadow
    `,
    };

    const inputClass = cn(
        baseStyles,
        variantStyles[variant],
        icon && 'pl-10',
        className,
    );

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-steel-silver mb-2 font-geist-black">
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-steel-brushed">
                        {icon}
                    </div>
                )}

                <input
                    className={inputClass}
                    disabled={disabled}
                    {...props}
                />

                {/* Metal inset effect */}
                <div className="absolute inset-0 rounded-lg shadow-metal-inset pointer-events-none" />
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
                    {error}
                </p>
            )}

            {helper && !error && (
                <p className="mt-1.5 text-sm text-steel-brushed">
                    {helper}
                </p>
            )}
        </div>
    );
}

interface MetalTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helper?: string;
    variant?: 'primary' | 'secondary';
}

export function MetalTextarea({
    label,
    error,
    helper,
    variant = 'primary',
    className,
    disabled,
    ...props
}: MetalTextareaProps) {
    const baseStyles =
        'w-full px-4 py-2.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans resize-none';

    const variantStyles = {
        primary: `
      bg-deep-charcoal/50 border border-steel-brushed/30
      text-steel-silver placeholder-steel-brushed
      hover:border-ember-core/30 hover:bg-deep-charcoal/70
      focus:border-ember-core/50 focus:bg-deep-charcoal/80 focus:ring-ember-core/30
      shadow-fire-glow
    `,
        secondary: `
      bg-zinc-800/50 border border-zinc-600/30
      text-zinc-100 placeholder-zinc-500
      hover:border-ember-core/30 hover:bg-zinc-800/70
      focus:border-ember-core/50 focus:bg-zinc-800/80 focus:ring-ember-core/30
      shadow-steel-shadow
    `,
    };

    const textareaClass = cn(baseStyles, variantStyles[variant], className);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-steel-silver mb-2 font-geist-black">
                    {label}
                </label>
            )}

            <div className="relative">
                <textarea
                    className={textareaClass}
                    disabled={disabled}
                    {...props}
                />

                {/* Metal inset effect */}
                <div className="absolute inset-0 rounded-lg shadow-metal-inset pointer-events-none" />
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
                    {error}
                </p>
            )}

            {helper && !error && (
                <p className="mt-1.5 text-sm text-steel-brushed">
                    {helper}
                </p>
            )}
        </div>
    );
}

interface MetalSelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    variant?: 'primary' | 'secondary';
}

export function MetalSelect({
    label,
    error,
    options,
    placeholder,
    variant = 'primary',
    className,
    disabled,
    ...props
}: MetalSelectProps) {
    const baseStyles =
        'w-full px-4 py-2.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans appearance-none bg-no-repeat';

    const variantStyles = {
        primary: `
      bg-deep-charcoal/50 border border-steel-brushed/30
      text-steel-silver placeholder-steel-brushed
      hover:border-ember-core/30 hover:bg-deep-charcoal/70
      focus:border-ember-core/50 focus:bg-deep-charcoal/80 focus:ring-ember-core/30
      shadow-fire-glow
    `,
        secondary: `
      bg-zinc-800/50 border border-zinc-600/30
      text-zinc-100 placeholder-zinc-500
      hover:border-ember-core/30 hover:bg-zinc-800/70
      focus:border-ember-core/50 focus:bg-zinc-800/80 focus:ring-ember-core/30
      shadow-steel-shadow
    `,
    };

    const selectClass = cn(baseStyles, variantStyles[variant], className);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-steel-silver mb-2 font-geist-black">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    className={selectClass}
                    disabled={disabled}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled selected>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Metal inset effect */}
                <div className="absolute inset-0 rounded-lg shadow-metal-inset pointer-events-none" />
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
                    {error}
                </p>
            )}
        </div>
    );
}
