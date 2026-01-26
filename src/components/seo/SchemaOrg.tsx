/**
 * Schema.org JSON-LD Component
 * Renderiza scripts de Schema.org estruturado para SEO
 */

import Script from 'next/script'
import {
    generateOrganizationSchema,
    generateLocalBusinessSchema,
    generateBreadcrumbSchema,
    wrapSchemaOrg,
    type StoreData,
} from '@/lib/schema-org'

interface SchemaOrgProps {
    store: StoreData
}

export function SchemaOrg({ store }: SchemaOrgProps) {
    const organizationSchema = generateOrganizationSchema(store)
    const localBusinessSchema = generateLocalBusinessSchema(store)
    const breadcrumbSchema = generateBreadcrumbSchema(store.name, store.slug)

    return (
        <>
            {/* Organization Schema */}
            <Script
                id={`org-schema-${store.id}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: wrapSchemaOrg(organizationSchema),
                }}
                strategy="afterInteractive"
            />

            {/* LocalBusiness (Restaurant) Schema */}
            <Script
                id={`business-schema-${store.id}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: wrapSchemaOrg(localBusinessSchema),
                }}
                strategy="afterInteractive"
            />

            {/* Breadcrumb Schema */}
            <Script
                id={`breadcrumb-schema-${store.id}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: wrapSchemaOrg(breadcrumbSchema),
                }}
                strategy="afterInteractive"
            />
        </>
    )
}
