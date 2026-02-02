/**
 * HeroSection Component - Industrial-Ember Design System
 * Landing page hero with fire effects and dramatic styling
 */

'use client';

import { MetalButton } from './MetalButton';
import { EmbersAnimation, CornerEmbers } from './EmbersAnimation';

export function HeroSection() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-deep-charcoal to-zinc-900">
            {/* Background Effects */}
            <EmbersAnimation count={15} intensity="high" color="amber" />
            <CornerEmbers corner="top-left" />
            <CornerEmbers corner="bottom-right" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="mb-6 font-geist-black text-5xl md:text-7xl lg:text-8xl leading-tight">
                    <span className="text-steel-silver">FAÇA PARTE DO</span>
                    <br />
                    <span className="bg-gradient-to-r from-ember-core via-blood-orange to-ember-core bg-clip-text text-transparent animate-pulse">
                        FUTURO DA GASTRONOMIA
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mb-8 text-lg md:text-xl text-steel-brushed font-light max-w-2xl mx-auto leading-relaxed">
                    Inteligência artificial encontra paixão culinária. A revolução do setor alimentício
                    começou. Entre na transformação digital dos melhores chefs.
                </p>

                {/* Metal Line */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent to-ember-core rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-ember-core animate-fire-pulse" />
                    <div className="w-12 h-1 bg-gradient-to-l from-transparent to-ember-core rounded-full" />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <MetalButton
                        variant="primary"
                        size="lg"
                        glowing={true}
                        pulsing={true}
                        className="min-w-[200px]"
                    >
                        ENTRAR
                    </MetalButton>
                    <MetalButton
                        variant="secondary"
                        size="lg"
                        glowing={false}
                        className="min-w-[200px]"
                    >
                        CADASTRAR
                    </MetalButton>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    {[
                        {
                            title: 'IA Avançada',
                            description: 'Algoritmos de último nível',
                        },
                        {
                            title: 'Gestão Inteligente',
                            description: 'Controle total do seu negócio',
                        },
                        {
                            title: 'Suporte 24/7',
                            description: 'Equipe sempre disponível',
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-lg bg-gradient-to-br from-deep-charcoal/80 to-zinc-900/80 border border-steel-brushed/20 hover:border-ember-core/30 transition-all duration-300"
                        >
                            <h3 className="text-ember-core font-geist-black text-lg mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-steel-brushed text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
}
