'use client'

/**
 * 🎨 FASE 6: White-Label - Theme Provider
 * Injeta CSS variables globais baseado na configuração da organização
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useTenant } from '@/providers/tenant-provider'
import { getTheme } from '@/services/whitelabel'
import { generateCSSVariables } from '@/lib/theme-utils'
import { ThemeConfig } from '@/types/whitelabel'

interface ThemeContextType {
    theme: ThemeConfig | null
    isLoading: boolean
    updateTheme: (updates: Partial<ThemeConfig>) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const tenant = useTenant()
    const [theme, setTheme] = useState<ThemeConfig | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadTheme = async () => {
            try {
                if (!tenant.organization) return

                const result = await getTheme(tenant.organization.id)
                if (result.success && result.theme) {
                    setTheme(result.theme)

                    // Injetar CSS variables no document
                    const cssVariables = generateCSSVariables(result.theme)
                    const styleId = 'theme-variables'

                    // Remover style anterior se existir
                    const existingStyle = document.getElementById(styleId)
                    if (existingStyle) {
                        existingStyle.remove()
                    }

                    // Criar novo style
                    const style = document.createElement('style')
                    style.id = styleId
                    style.innerHTML = cssVariables
                    document.head.appendChild(style)
                }
            } catch (error) {
                console.error('Erro ao carregar tema:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadTheme()
    }, [tenant.organization])

    const updateTheme = (updates: Partial<ThemeConfig>) => {
        if (theme) {
            const updated = { ...theme, ...updates }
            setTheme(updated)

            // Atualizar CSS variables
            const cssVariables = generateCSSVariables(updated)
            const style = document.getElementById('theme-variables')
            if (style) {
                style.innerHTML = cssVariables
            }
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, isLoading, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de ThemeProvider')
    }
    return context
}
