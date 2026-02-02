/**
 * Component Preview Page - Industrial-Ember Design System
 * Test all Metal components before applying to admin pages
 */

'use client';

import {
    MetalCard,
    MetalCardHeader,
    MetalCardContent,
    MetalCardFooter,
    MetalButton,
    MetalInput,
    MetalTextarea,
    MetalSelect,
    EmbersAnimation,
    CornerEmbers,
} from '@/components/metal';
import { Mail, Lock, Search, Zap } from 'lucide-react';

export default function ComponentPreviewPage() {
    return (
        <main className="relative w-full min-h-screen bg-gradient-to-b from-deep-charcoal to-zinc-900 overflow-hidden">
            {/* Background Effects */}
            <EmbersAnimation count={20} intensity="medium" />
            <CornerEmbers corner="top-right" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-16">
                <h1 className="text-5xl font-geist-black text-steel-silver text-center mb-4">
                    Industrial-Ember
                </h1>
                <p className="text-center text-steel-brushed mb-16">
                    Component Library Preview
                </p>

                {/* MetalCard Variants */}
                <section className="mb-16">
                    <h2 className="text-3xl font-geist-black text-ember-core mb-8">
                        MetalCard Variants
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['primary', 'secondary', 'accent', 'dark'].map((variant) => (
                            <MetalCard
                                key={variant}
                                variant={variant as any}
                                hover
                                glowing={variant === 'accent'}
                            >
                                <MetalCardHeader>
                                    <h3 className="text-lg font-geist-black text-steel-silver capitalize">
                                        {variant}
                                    </h3>
                                </MetalCardHeader>
                                <MetalCardContent>
                                    <p className="text-sm text-steel-brushed">
                                        This is a {variant} card with metal styling and fire accents.
                                    </p>
                                </MetalCardContent>
                            </MetalCard>
                        ))}
                    </div>
                </section>

                {/* MetalButton Variants */}
                <section className="mb-16">
                    <h2 className="text-3xl font-geist-black text-ember-core mb-8">
                        MetalButton Variants & Sizes
                    </h2>
                    <div className="space-y-8">
                        {/* Primary Buttons */}
                        <div>
                            <h3 className="text-lg font-medium text-steel-silver mb-4">Primary</h3>
                            <div className="flex flex-wrap gap-4">
                                {['sm', 'md', 'lg', 'xl'].map((size) => (
                                    <MetalButton
                                        key={size}
                                        variant="primary"
                                        size={size as any}
                                        glowing
                                    >
                                        {size.toUpperCase()}
                                    </MetalButton>
                                ))}
                            </div>
                        </div>

                        {/* Secondary Buttons */}
                        <div>
                            <h3 className="text-lg font-medium text-steel-silver mb-4">Secondary</h3>
                            <div className="flex flex-wrap gap-4">
                                {['sm', 'md', 'lg'].map((size) => (
                                    <MetalButton
                                        key={size}
                                        variant="secondary"
                                        size={size as any}
                                    >
                                        {size.toUpperCase()}
                                    </MetalButton>
                                ))}
                            </div>
                        </div>

                        {/* Ghost Buttons */}
                        <div>
                            <h3 className="text-lg font-medium text-steel-silver mb-4">Ghost</h3>
                            <div className="flex flex-wrap gap-4">
                                {['sm', 'md', 'lg'].map((size) => (
                                    <MetalButton
                                        key={size}
                                        variant="ghost"
                                        size={size as any}
                                    >
                                        {size.toUpperCase()}
                                    </MetalButton>
                                ))}
                            </div>
                        </div>

                        {/* With Icons */}
                        <div>
                            <h3 className="text-lg font-medium text-steel-silver mb-4">With Icons</h3>
                            <div className="flex flex-wrap gap-4">
                                <MetalButton
                                    variant="primary"
                                    icon={<Zap className="w-5 h-5" />}
                                    iconPosition="left"
                                >
                                    Action
                                </MetalButton>
                                <MetalButton
                                    variant="primary"
                                    icon={<Search className="w-5 h-5" />}
                                    iconPosition="right"
                                >
                                    Search
                                </MetalButton>
                                <MetalButton
                                    variant="danger"
                                    icon={<Zap className="w-5 h-5" />}
                                    pulsing
                                >
                                    Fire!
                                </MetalButton>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Components */}
                <section className="mb-16">
                    <h2 className="text-3xl font-geist-black text-ember-core mb-8">
                        Form Components
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MetalInput
                                label="Email Address"
                                placeholder="seu@email.com"
                                icon={<Mail className="w-4 h-4" />}
                                variant="primary"
                            />
                            <MetalInput
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                icon={<Lock className="w-4 h-4" />}
                                variant="primary"
                            />
                            <MetalInput
                                label="With Error"
                                placeholder="Invalid input"
                                error="This field is required"
                                variant="primary"
                            />
                            <MetalInput
                                label="With Helper"
                                placeholder="Type something"
                                helper="This is a helpful hint"
                                variant="primary"
                            />
                        </div>

                        <div className="space-y-6">
                            <MetalSelect
                                label="Category"
                                placeholder="Select a category"
                                options={[
                                    { value: 'cat1', label: 'Electronics' },
                                    { value: 'cat2', label: 'Food & Beverage' },
                                    { value: 'cat3', label: 'Services' },
                                ]}
                                variant="primary"
                            />
                            <MetalTextarea
                                label="Description"
                                placeholder="Enter your description here..."
                                helper="Max 500 characters"
                                variant="primary"
                            />
                            <MetalTextarea
                                label="With Error"
                                placeholder="Invalid input"
                                error="Text is too short (minimum 10 characters)"
                                variant="primary"
                            />
                        </div>
                    </div>
                </section>

                {/* Complex Card Example */}
                <section className="mb-16">
                    <h2 className="text-3xl font-geist-black text-ember-core mb-8">
                        Card Complex Example
                    </h2>
                    <MetalCard variant="primary" hover glowing>
                        <MetalCardHeader>
                            <h3 className="text-2xl font-geist-black text-steel-silver">
                                Dashboard Card
                            </h3>
                            <p className="text-sm text-steel-brushed">Last updated 5 minutes ago</p>
                        </MetalCardHeader>
                        <MetalCardContent>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {[
                                    { label: 'Revenue', value: '$12,543' },
                                    { label: 'Orders', value: '1,234' },
                                    { label: 'Customers', value: '567' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <p className="text-xs text-steel-brushed mb-1">{stat.label}</p>
                                        <p className="text-xl font-geist-black text-ember-core">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-steel-brushed">
                                Your business is growing! Keep it up with consistent engagement and
                                quality service.
                            </p>
                        </MetalCardContent>
                        <MetalCardFooter>
                            <div className="flex gap-2">
                                <MetalButton variant="primary" size="sm">
                                    View Details
                                </MetalButton>
                                <MetalButton variant="ghost" size="sm">
                                    Dismiss
                                </MetalButton>
                            </div>
                        </MetalCardFooter>
                    </MetalCard>
                </section>

                {/* Information */}
                <section className="text-center py-16 border-t border-steel-brushed/20">
                    <p className="text-steel-brushed mb-4">
                        All components are ready for production use
                    </p>
                    <p className="text-sm text-steel-brushed/60">
                        Import from <code className="text-emerald-400">@/components/metal</code>
                    </p>
                </section>
            </div>
        </main>
    );
}
