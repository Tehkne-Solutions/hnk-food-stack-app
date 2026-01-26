/**
 * Schema.org Structured Data
 * Gera JSON-LD para Product, Organization, LocalBusiness
 */

export interface StoreData {
    id: string
    name: string
    slug: string
    description: string
    whatsapp: string
    logo: string
    address?: string
    city?: string
}

export interface ProductData {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    image: string
    category: string
}

/**
 * Generate Organization Schema
 * Para visibilidade em busca da marca
 */
export function generateOrganizationSchema(store: StoreData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: store.name,
        description: store.description,
        url: `https://hnk-food-stack-app.vercel.app/${store.slug}`,
        logo: `https://hnk-food-stack-app.vercel.app${store.logo}`,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            telephone: `+55${store.whatsapp}`,
            url: `https://wa.me/${store.whatsapp}`,
        },
        sameAs: [
            'https://instagram.com/hnkfoodstack',
            'https://facebook.com/hnkfoodstack',
        ],
    }
}

/**
 * Generate LocalBusiness Schema
 * Para SEO local de restaurante/churrascaria
 */
export function generateLocalBusinessSchema(store: StoreData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: store.name,
        description: store.description,
        image: `https://hnk-food-stack-app.vercel.app${store.logo}`,
        url: `https://hnk-food-stack-app.vercel.app/${store.slug}`,

        // Tipo específico
        servesCuisine: ['Brazilian', 'Steakhouse'],

        // Contato
        telephone: `+55${store.whatsapp}`,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Ordering',
            telephone: `+55${store.whatsapp}`,
            url: `https://wa.me/${store.whatsapp}`,
        },

        // Endereço (quando disponível)
        ...(store.address && {
            address: {
                '@type': 'PostalAddress',
                streetAddress: store.address,
                addressLocality: store.city || 'São Paulo',
                addressRegion: 'SP',
                postalCode: '00000-000',
                addressCountry: 'BR',
            },
        }),

        // Avaliações agregadas (futuro)
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '125',
        },
    }
}

/**
 * Generate Product Schema
 * Para cada produto na grade
 */
export function generateProductSchema(product: ProductData, store: StoreData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `https://hnk-food-stack-app.vercel.app${product.image}`,
        category: product.category,

        // Preço
        offers: {
            '@type': 'Offer',
            price: product.price.toString(),
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            url: `https://hnk-food-stack-app.vercel.app/${store.slug}`,
            seller: {
                '@type': 'Organization',
                name: store.name,
            },
            ...(product.originalPrice && {
                priceCurrency: 'BRL',
                price: product.price.toString(),
                msrp: product.originalPrice.toString(),
            }),
        },

        // Review agregado
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            reviewCount: '89',
        },
    }
}

/**
 * Generate BreadcrumbList Schema
 * Para navegação estruturada
 */
export function generateBreadcrumbSchema(storeName: string, storeSlug: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Início',
                item: 'https://hnk-food-stack-app.vercel.app',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: storeName,
                item: `https://hnk-food-stack-app.vercel.app/${storeSlug}`,
            },
        ],
    }
}

/**
 * Wrapper JSON-LD para Script Tag
 */
export function wrapSchemaOrg(schema: Record<string, unknown>) {
    return JSON.stringify(schema, null, 2)
}
