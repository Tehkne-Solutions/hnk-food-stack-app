/**
 * Shop Home Page [slug]
 * Vitrine principal da loja (ex: /bem-estar)
 * Exibe: destaques, grid de produtos, categor ias, CTAs
 */

import React from 'react'
import { FireButton } from '@/components/ui/FireButton'
import { Header } from '@/components/layout/Header'
import { FeaturedProduct } from '@/components/layout/FeaturedProduct'
import { ShopContent } from '@/components/layout/ShopContent'
import { Footer } from '@/components/layout/Footer'
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
        image: '/images/fraldinha.jpg',
        category: 'Cortes Nobres',
        badge: { text: 'Oferta do Mestre', variant: 'promo' as const },
    },
    {
        id: '2',
        name: 'Picanha Angus',
        description: 'Importada, suculenta e tenra',
        price: 59.90,
        image: '/images/picanha.jpg',
        category: 'Cortes Premium',
        badge: { text: 'Novo', variant: 'new' as const },
    },
    {
        id: '3',
        name: 'Assado de Tira',
        description: 'Perfeito para a churrasqueira',
        price: 44.90,
        image: '/images/assado.jpg',
        category: 'Cortes Populares',
    },
    {
        id: '4',
        name: 'Alcatra',
        description: 'Macia e saborosa',
        price: 39.90,
        image: '/images/alcatra.jpg',
        category: 'Cortes Populares',
    },
    {
        id: '5',
        name: 'Costela Bovina',
        description: 'Suculenta e ideal para grelha',
        price: 54.90,
        image: '/images/costela.jpg',
        category: 'Cortes Nobres',
    },
    {
        id: '6',
        name: 'Moqueca Bovina',
        description: 'Especialidade da casa',
        price: 64.90,
        image: '/images/moqueca.jpg',
        category: 'Cortes Premium',
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

export default async function ShopPage() {
    // TODO: validar slug + buscar store do Supabase via Prisma

    return (
        <>
            {/* Header Sticky */}
            <Header storeName={mockStore.name} logoUrl={mockStore.logo} />

            <div className="space-y-16">
                {/* Featured Product Section */}
                <section className="mt-20">
                    <FeaturedProduct 
                        title={mockProducts[0].name}
                        subtitle="Corte Premium"
                        description={mockProducts[0].description}
                        image={mockProducts[0].image}
                        price={mockProducts[0].price}
                        originalPrice={mockProducts[0].originalPrice}
                        badge={mockProducts[0].badge?.text}
                        ctaText="Pedir Agora"
                        onCTA={() => {
                            window.open(
                                `https://wa.me/${mockStore.whatsapp}?text=Olá!%20Quero%20o%20${mockProducts[0].name}`,
                                '_blank'
                            )
                        }}
                    />
                </section>

                {/* Category & Filter Section */}
                <ShopContent products={mockProducts} />


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

            {/* Footer */}
            <Footer />
        </>
    )
}
