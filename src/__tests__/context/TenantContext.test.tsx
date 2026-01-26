'use client'

import { render, screen, waitFor } from '@testing-library/react'
import { TenantContextProvider, useTenant } from '@/context/TenantContext'
import { ReactNode } from 'react'

// Componente teste que usa o hook
function TestComponent() {
    const { organization, isLoading, error } = useTenant()

    if (isLoading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error}</div>
    if (!organization) return <div>Sem organização</div>

    return (
        <div>
            <div>Nome: {organization.name}</div>
            <div>Slug: {organization.slug}</div>
            <div>Brand Voice: {organization.brand_voice}</div>
        </div>
    )
}

describe('TenantContext', () => {
    it('fornece organização padrão quando carregado', async () => {
        render(
            <TenantContextProvider>
                <TestComponent />
            </TenantContextProvider>
        )

        // Após carregamento, mostra dados padrão
        await waitFor(() => {
            expect(screen.getByText(/Churrasco Bem Brasil/)).toBeInTheDocument()
            expect(screen.getByText(/churrasco-bem-brasil/)).toBeInTheDocument()
            expect(screen.getByText(/rústico e apaixonado/)).toBeInTheDocument()
        })
    })

    it('lança erro quando useTenant é usado fora do provider', () => {
        // Suppress console error for this test
        const spy = jest.spyOn(console, 'error').mockImplementation(() => { })

        expect(() => {
            render(<TestComponent />)
        }).toThrow('useTenant deve ser usado dentro de um TenantProvider')

        spy.mockRestore()
    })

    it('fornece contexto com valores padrão', async () => {
        function SimpleTestComponent() {
            const { organization } = useTenant()
            return <div>{organization?.name}</div>
        }

        render(
            <TenantContextProvider>
                <SimpleTestComponent />
            </TenantContextProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Churrasco Bem Brasil')).toBeInTheDocument()
        })
    })
})
