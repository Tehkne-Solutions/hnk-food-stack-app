import { ReactNode } from 'react'

/**
 * Representa uma organização (restaurante) no sistema SaaS
 * HNK-GIP Pattern: Isolamento lógico via org_id para suportar multi-tenancy
 */
export interface Organization {
    id: string
    name: string
    slug: string
    custom_domain?: string
    brand_voice: 'rústico e apaixonado' | 'elegante e sofisticado' | 'rápido e casual'
    keywords: string[]
    theme_config?: ThemeConfig
    created_at: string
    updated_at: string
}

/**
 * Configuração de tema dinâmico para White-Label (Fase 6)
 */
export interface ThemeConfig {
    primary_color: string
    secondary_color: string
    font_family: string
    border_radius: string
    logo_url?: string
    accent_color?: string
}

/**
 * Contexto de tenant para disponibilizar organização em toda aplicação
 */
export interface TenantContextType {
    organization: Organization | null
    isLoading: boolean
    error: string | null
}

export interface TenantProviderProps {
    children: ReactNode
}
