'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { Organization, TenantContextType, TenantProviderProps } from '@/types/tenant'

/**
 * TenantContext
 * Disponibiliza dados da organização em toda a aplicação
 * Permite que componentes acessem org_id, brand_voice, theme_config etc.
 * 
 * HNK-GIP Pattern: Context Provider para isolamento lógico de multi-tenancy
 */
const TenantContext = createContext<TenantContextType | undefined>(undefined)

/**
 * TenantProvider
 * Wrapper para aplicação que carrega a organização baseado no hostname
 */
export function TenantProvider({ children }: TenantProviderProps) {
    const [organization, setOrganization] = useState<Organization | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadTenant = async () => {
            try {
                setIsLoading(true)

                // Buscar informações do tenant do servidor (middleware)
                // O middleware vai injetar o org_id via header
                const tenantHeader = document.documentElement.getAttribute('data-tenant-id')

                if (!tenantHeader) {
                    // Fallback para 'churrasco-bem-brasil' (cliente padrão durante desenvolvimento)
                    setOrganization({
                        id: '0000-0000-0000-0001', // UUID fake para dev
                        name: 'Churrasco Bem Brasil',
                        slug: 'churrasco-bem-brasil',
                        brand_voice: 'rústico e apaixonado',
                        keywords: ['churrasco', 'parrilla', 'eventos'],
                        theme_config: {
                            primary_color: '#d97706',
                            secondary_color: '#0a0a0a',
                            font_family: 'Inter',
                            border_radius: '0.5rem',
                            accent_color: '#25d366',
                        },
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                    return
                }

                // Em produção, você buscaria do banco de dados
                // await fetch(`/api/tenant/${tenantHeader}`).then(r => r.json())

                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Falha ao carregar tenant')
                console.error('Erro ao carregar tenant:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadTenant()
    }, [])

    return (
        <TenantContext.Provider value={{ organization, isLoading, error }}>
            {children}
        </TenantContext.Provider>
    )
}

/**
 * Hook para acessar informações do tenant em qualquer componente
 * 
 * @example
 * const { organization } = useTenant()
 * console.log(organization?.brand_voice) // 'rústico e apaixonado'
 */
export function useTenant(): TenantContextType {
    const context = useContext(TenantContext)
    if (!context) {
        throw new Error('useTenant deve ser usado dentro de TenantProvider')
    }
    return context
}
