'use client'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '@/context/CartContext'

function TestCartComponent() {
    const { items, addItem, removeItem, clearCart } = useCart()

    return (
        <div>
            <div data-testid="item-count">{items.length} itens</div>

            <button onClick={() => addItem({
                id: '1',
                name: 'Picanha',
                price: 50,
                quantity: 1
            })}>
                Adicionar Picanha
            </button>

            <button onClick={() => removeItem('1')}>
                Remover Picanha
            </button>

            <button onClick={clearCart}>
                Limpar Carrinho
            </button>
        </div>
    )
}

describe('CartContext - Simple', () => {
    it('inicia com carrinho vazio', () => {
        render(
            <CartProvider>
                <TestCartComponent />
            </CartProvider>
        )

        expect(screen.getByTestId('item-count')).toHaveTextContent('0 itens')
    })

    it('adiciona itens ao carrinho', async () => {
        const user = userEvent.setup()

        render(
            <CartProvider>
                <TestCartComponent />
            </CartProvider>
        )

        await user.click(screen.getByText('Adicionar Picanha'))
        expect(screen.getByTestId('item-count')).toHaveTextContent('1 itens')
    })

    it('remove itens do carrinho', async () => {
        const user = userEvent.setup()

        render(
            <CartProvider>
                <TestCartComponent />
            </CartProvider>
        )

        await user.click(screen.getByText('Adicionar Picanha'))
        expect(screen.getByTestId('item-count')).toHaveTextContent('1 itens')

        await user.click(screen.getByText('Remover Picanha'))
        expect(screen.getByTestId('item-count')).toHaveTextContent('0 itens')
    }))

it('limpa todo o carrinho', async () => {
    const user = userEvent.setup()

    render(
        <CartProvider>
            <TestCartComponent />
        </CartProvider>
    )

    await user.click(screen.getByText('Adicionar Picanha'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('1 itens')

    await user.click(screen.getByText('Limpar Carrinho'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('0 itens')
})
})
