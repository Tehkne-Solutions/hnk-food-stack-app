/**
 * Shop Home Page [slug]
 * Vitrine principal da loja (ex: /bem-estar)
 * Exibe: destaques, grid de produtos, categor ias, CTAs
 */

import React from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProductCard } from '@/components/ui/ProductCard'
import { FireButton } from '@/components/ui/FireButton'
import Image from 'next/image'
import { Metadata } from 'next'

// Mock de dados - será substituído por Prisma + Supabase
const mockStore = {
    id: 'bem-estar-1',
    name: 'Churrascaria Bem Estar',
    slug: 'bem-estar',
    logo: '/images/bem-estar-logo.png', // TODO: substituir por URL real
    description: 'Churrascaria com os melhores cortes da região',
    whatsapp: '11987654321',
}

const mockProducts = [
    {
        id: '1',
        name: 'Kit Fraldinha',
        description: 'Corte nobre, macio e suculento',
        price: 49.90,
        originalPrice: 79.90,
        image: '/images/fraldinha.jpg', // TODO: placeholder
        badge: { text: 'Oferta do Mestre', variant: 'promo' as const },
    },
    {
        id: '2',
        name: 'Picanha Angus',
        description: 'Importada, suculenta e tenra',
        price: 59.90,
        image: '/images/picanha.jpg',
        badge: { text: 'Novo', variant: 'new' as const },
    },
    {
        id: '3',
        name: 'Assado de Tira',
        description: 'Perfeito para a churrasqueira',
        price: 44.90,
        image: '/images/assado.jpg',
    },
    {
        id: '4',
        name: 'Alcatra',
        description: 'Macia e saborosa',
        price: 39.90,
        image: '/images/alcatra.jpg',
    },
]

export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    // TODO: buscar store real do Supabase
    return {
        title: `${mockStore.name} | HNK Food Stack`,
        description: mockStore.description,
        openGraph: {
            title: mockStore.name,
            description: mockStore.description,
            url: `https://hnk-food-stack-app-main.vercel.app/${params.slug}`,
            type: 'website',
            images: [
                {
                    url: '/images/og-bem-estar.jpg', // TODO
                    width: 1200,
                    height: 630,
                    alt: mockStore.name,
                },
            ],
        },
        alternates: {
            canonical: `https://hnk-food-stack-app-main.vercel.app/${params.slug}`,
        },
    }
}

export default async function ShopPage({
    params,
}: {
    params: { slug: string }
}) {
    // TODO: validar slug + buscar store do Supabase via Prisma

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="space-y-4">
                <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-ember-dark border border-zinc-800/50">
                    {/* Background image (seria da loja) */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ember-accent/10 rounded-full blur-3xl" />
                    </div>

                    {/* Content overlay */}
                    <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-black italic text-white mb-4">
                            {mockStore.name}
                        </h1>
                        <p className="text-ember-secondary text-lg max-w-2xl">
                            {mockStore.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="space-y-6">
                <SectionTitle
                    title="Destaques do Mestre"
                    subtitle="Aqueles cortes que não podem faltar"
                />
                <div className="grid md:grid-cols-2 gap-6">
                    {mockProducts.slice(0, 2).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={(p) => {
                                // TODO: integrar com Zustand cart store
                                console.log('Adicionar:', p.name)
                            }}
                        />
                    ))}
                </div>
            </section>

            {/* All Products Grid */}
            <section className="space-y-6">
                <SectionTitle
                    title="Todos os Cortes"
                    subtitle="Escolha o seu favorito"
                />
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mockProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={(p) => {
                                // TODO: integrar com Zustand cart store
                                console.log('Adicionar:', p.name)
                            }}
                        />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-ember-dark via-zinc-900 to-ember-dark border border-zinc-800/50 rounded-2xl p-12 text-center space-y-4">
                <h2 className="text-3xl font-black italic text-white">
                    Pronto para saborear?
                </h2>
                <p className="text-ember-secondary max-w-xl mx-auto">
                    Peça pelo WhatsApp e receba com a qualidade que você merece
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <FireButton
                        onClick={() => {
                            // TODO: integrar UTM link builder
                            window.open(
                                `https://wa.me/${mockStore.whatsapp}?text=Olá,%20gostaria%20de%20fazer%20um%20pedido!`,
                                '_blank'
                            )
                        }}
                        size="lg"
                    >
                        💬 Abrir WhatsApp
                    </FireButton>
                    <FireButton
                        onClick={() => console.log('Ver menu completo')}
                        variant="secondary"
                        size="lg"
                    >
                        📋 Menu Completo
                    </FireButton>
                </div>
            </section>
        </div>
    )
}
