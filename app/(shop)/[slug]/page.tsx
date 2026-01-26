/**
 * Shop Home Page [slug]
 * Vitrine principal da loja (ex: /bem-estar)
 * Exibe: destaques, grid de produtos, categor ias, CTAs
 * 
 * SEO: Meta tags dinâmicas por loja, Schema.org JSON-LD
 */

import React from 'react'
import { Header } from '@/components/layout/Header'
import { FeaturedProduct } from '@/components/layout/FeaturedProduct'
import { ShopContent } from '@/components/layout/ShopContent'
import { Footer } from '@/components/layout/Footer'
import { CTAWhatsApp } from '@/components/layout/CTAWhatsApp'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
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

// Segunda loja para teste
const mockStore2 = {
    id: 'premium-cuts-1',
    name: 'Premium Cuts Steakhouse',
    slug: 'premium-cuts',
    logo: '/images/premium-cuts-logo.png',
    description: 'Steakhouse premium com cortes importados',
    whatsapp: '11999887766',
}

// Mapear slug para store
const storeMap: Record<string, typeof mockStore> = {
    'bem-estar': mockStore,
    'premium-cuts': mockStore2,
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
    const store = storeMap[params.slug] || mockStore
    const baseUrl = 'https://hnk-food-stack-app.vercel.app'
    const ogImage = `${baseUrl}/og-images/${params.slug}-og.jpg`

    return {
        title: `${store.name} | Churrascaria Online - Compre Agora`,
        description: `${store.description}. Acesse ${store.name} e peça os melhores cortes pelo WhatsApp. Entrega rápida!`,
        keywords: ['churrascaria', 'cortes de carne', 'carne premium', params.slug, store.name.toLowerCase()],

        // OpenGraph para redes sociais
        openGraph: {
            type: 'website',
            locale: 'pt_BR',
            url: `${baseUrl}/${params.slug}`,
            siteName: 'HNK Food Stack',
            title: `${store.name} | Compre Online`,
            description: `${store.description}. Peça pelo WhatsApp!`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: store.name,
                    type: 'image/jpeg',
                },
            ],
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: `${store.name} | Churrascaria Online`,
            description: `${store.description}. Peça pelo WhatsApp agora!`,
            images: [ogImage],
        },

        // Alternates para canonical
        alternates: {
            canonical: `${baseUrl}/${params.slug}`,
        },
    }
}

export default async function ShopPage() {
    // TODO: validar slug + buscar store do Supabase via Prisma

    return (
        <>
            {/* Schema.org SEO */}
            <SchemaOrg store={mockStore} />

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
                    <div className="flex justify-center">
                        <CTAWhatsApp phone={mockStore.whatsapp} storeName={mockStore.name} />
                    </div>
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </>
    )
}
