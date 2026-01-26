'use client'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '@/context/CartContext'
import { ReactNode } from 'react'

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
}

function TestCartComponent() {
    const { items, addItem, removeItem, clearCart, total } = useCart()

    return (
        <div>
            <div>Total: R$ {typeof total === 'number' ? total.toFixed(2) : '0.00'}</div>
            <div data-testid="item-count">{items.length} itens</div>

            <button onClick={() => addItem({
                id: '1',
                name: 'Picanha',
                price: 50,
                quantity: 1
            })}>
                Adicionar Picanha
            </button>

            <button onClick={() => addItem({
                id: '2',
                name: 'Costela',
                price: 40,
                quantity: 1
            })}>
                Adicionar Costela
            </button>

            <button onClick={() => removeItem('1')}>
                Remover Picanha
            </button>

            <button onClick={clearCart}>
                Limpar Carrinho
            </button>

            <div data-testid="items-list">
                {items.map(item => (
                    <div key={item.id}>{item.name} - {item.quantity}x R$ {typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}</div>
                ))}
            </div>
        </div>
    )
}

describe('CartContext', () => {
    it('inicia com carrinho vazio', () => {
        render(
            <CartProvider>
                <TestCartComponent />
            </CartProvider>
        )

        expect(screen.getByTestId('item-count')).toHaveTextContent('0 itens')
        expect(screen.getByText('Total: R$ 0.00')).toBeInTheDocument()
    })

    it('adiciona itens ao carrinho', async () => {
        const user = userEvent.setup()

        render(
            <CartProvider>
                <TestCartComponent />
            </CartProvider>
        )

        const addButton = screen.getByText('Adicionar Picanha')
        await user.click(addButton)

        expect(screen.getByTestId('item-count')).toHaveTextContent('1 itens')
        expect(screen.getByText('Total: R$ 50.00')).toBeInTheDocument()
        expect(screen.getByText('Picanha - 1x R$ 50.00')).toBeInTheDocument()
    })

    it('adiciona múltiplos itens ao carrinho', async () => {
        const user = userEvent.setup()

        render(
            <CartProvider>
                <TestCartComponent />
            </CartProvider>
        )

        await user.click(screen.getByText('Adicionar Picanha'))
        await user.click(screen.getByText('Adicionar Costela'))

        expect(screen.getByTestId('item-count')).toHaveTextContent('2 itens')
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
        expect(screen.getByText('Total: R$ 0.00')).toBeInTheDocument()
    })

    it('limpa todo o carrinho', async () => {
        const user = userEvent.setup()

        render(
            <CartProvider>
                <TestCartComponent />
            </CartProvider>
        )

        await user.click(screen.getByText('Adicionar Picanha'))
        await user.click(screen.getByText('Adicionar Costela'))
        expect(screen.getByTestId('item-count')).toHaveTextContent('2 itens')

        await user.click(screen.getByText('Limpar Carrinho'))
        expect(screen.getByTestId('item-count')).toHaveTextContent('0 itens')
        expect(screen.getByText('Total: R$ 0.00')).toBeInTheDocument()
    })
})
