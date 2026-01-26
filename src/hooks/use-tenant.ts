'use client'

import { useContext } from 'react'
import { TenantContext } from '@/context/TenantContext'
import type { TenantContextType } from '@/types/tenant'

/**
 * Hook para acessar informações do tenant em qualquer Client Component
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
