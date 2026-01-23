/**
 * Mock de Produtos para desenvolvimento
 * Será substituído por dados do Supabase em produção
 */

import { Product } from '@/types'

export const mockProducts: Product[] = [
    // CARNES
    {
        id: '1',
        name: 'Picanha Premium',
        description: 'Corte suculento com ponta de gordura marmoreada',
        price: 89.90,
        category: 'carnes',
        image_url: '/placeholder-meat.jpg',
        badge: 'mais-pedido',
    },
    {
        id: '2',
        name: 'Costela Bovina',
        description: 'Assada na brasa lentamente, macia e suculenta',
        price: 79.90,
        category: 'carnes',
        image_url: '/placeholder-meat.jpg',
    },
    {
        id: '3',
        name: 'Coração de Frango',
        description: 'Temperado e grelhado, cheio de sabor',
        price: 45.90,
        category: 'carnes',
        image_url: '/placeholder-meat.jpg',
        badge: 'promocao',
    },
    {
        id: '4',
        name: 'Linguiça Artesanal',
        description: 'Preparada internamente com receita exclusiva',
        price: 39.90,
        category: 'carnes',
        image_url: '/placeholder-meat.jpg',
    },
    {
        id: '5',
        name: 'Carne Seca',
        description: 'Temperada na brasa, derrete na boca',
        price: 75.90,
        category: 'carnes',
        image_url: '/placeholder-meat.jpg',
    },

    // ACOMPANHAMENTOS
    {
        id: '6',
        name: 'Polenta Cremosa',
        description: 'Polenta mole com queijo derretido',
        price: 24.90,
        category: 'acompanhamentos',
        image_url: '/placeholder-side.jpg',
    },
    {
        id: '7',
        name: 'Batata com Manteiga de Alho',
        description: 'Batata sequinha e crocante',
        price: 22.90,
        category: 'acompanhamentos',
        image_url: '/placeholder-side.jpg',
    },
    {
        id: '8',
        name: 'Mandioca Frita',
        description: 'Crocante por fora, macia por dentro',
        price: 19.90,
        category: 'acompanhamentos',
        image_url: '/placeholder-side.jpg',
    },
    {
        id: '9',
        name: 'Arroz Fumegante',
        description: 'Arroz integral com legumes frescos',
        price: 16.90,
        category: 'acompanhamentos',
        image_url: '/placeholder-side.jpg',
    },

    // BEBIDAS
    {
        id: '10',
        name: 'Refrigerante 2L',
        description: 'Coca-Cola, Guaraná ou Fanta',
        price: 12.90,
        category: 'bebidas',
        image_url: '/placeholder-drink.jpg',
    },
    {
        id: '11',
        name: 'Cerveja Premium 600ml',
        description: 'Seleção das melhores marcas',
        price: 18.90,
        category: 'bebidas',
        image_url: '/placeholder-drink.jpg',
    },
    {
        id: '12',
        name: 'Água com Gás 1L',
        description: 'Água mineral gasificada',
        price: 8.90,
        category: 'bebidas',
        image_url: '/placeholder-drink.jpg',
    },
    {
        id: '13',
        name: 'Suco Natural',
        description: 'Sucos naturais de frutas frescas',
        price: 14.90,
        category: 'bebidas',
        image_url: '/placeholder-drink.jpg',
    },

    // EVENTOS
    {
        id: '14',
        name: 'Churrasco Completo - 10 pessoas',
        description: 'Pacote com variedade de carnes + acompanhamentos',
        price: 599.90,
        category: 'eventos',
        image_url: '/placeholder-event.jpg',
    },
    {
        id: '15',
        name: 'Churrasco Premium - 20 pessoas',
        description: 'Cortes especiais + beidas + equipe de churrasqueiro',
        price: 1299.90,
        category: 'eventos',
        image_url: '/placeholder-event.jpg',
        badge: 'mais-pedido',
    },
    {
        id: '16',
        name: 'Coquetel com Coquetéis',
        description: 'Serviço de drinks profissional incluído',
        price: 899.90,
        category: 'eventos',
        image_url: '/placeholder-event.jpg',
    },
]

export const categories: Array<{ id: string; label: string; icon: string }> = [
    { id: 'carnes', label: 'Carnes', icon: '🔥' },
    { id: 'acompanhamentos', label: 'Acompanhamentos', icon: '🥔' },
    { id: 'bebidas', label: 'Bebidas', icon: '🍹' },
    { id: 'eventos', label: 'Eventos', icon: '🎉' },
]
