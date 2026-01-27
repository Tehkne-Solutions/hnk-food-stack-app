'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getCurrentSession, getCurrentUser, adminLogout, type AdminUser } from '@/services/admin/adminAuthService'

/**
 * Admin Auth Context
 * FASE 7: Compartilhar estado de autenticação no admin
 */

interface AdminAuthContextType {
    user: AdminUser | null
    loading: boolean
    isAuthenticated: boolean
    logout: () => Promise<void>
    refresh: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

/**
 * Provider Component
 */
export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [user, setUser] = useState<AdminUser | null>(null)
    const [loading, setLoading] = useState(true)

    /**
     * Carregar sessão ao montar
     */
    useEffect(() => {
        const loadSession = async () => {
            try {
                const session = getCurrentSession()
                const currentUser = getCurrentUser()

                if (session && currentUser) {
                    setUser(currentUser)
                } else {
                    if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
                        router.push('/admin/login')
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar sessão:', error)
            } finally {
                setLoading(false)
            }
        }

        loadSession()
    }, [pathname, router])

    /**
     * Logout
     */
    const handleLogout = async () => {
        try {
            adminLogout()
            setUser(null)

            try {
                await fetch('/api/admin/auth/set-session', { method: 'DELETE' })
            } catch {
                console.warn('Cookie cleanup failed')
            }

            router.push('/admin/login')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    /**
     * Refresh de sessão
     */
    const handleRefresh = async () => {
        try {
            const session = getCurrentSession()
            const currentUser = getCurrentUser()

            if (session && currentUser) {
                setUser(currentUser)
            } else {
                await handleLogout()
            }
        } catch (error) {
            console.error('Refresh error:', error)
        }
    }

    const value: AdminAuthContextType = {
        user,
        loading,
        isAuthenticated: !!user,
        logout: handleLogout,
        refresh: handleRefresh
    }

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    )
}

/**
 * Hook: useAdminAuth
 */
export function useAdminAuth() {
    const context = useContext(AdminAuthContext)
    if (!context) {
        throw new Error('useAdminAuth must be used within AdminAuthProvider')
    }
    return context
}
