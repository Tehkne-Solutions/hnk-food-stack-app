/**
 * @name Checkout Component
 * @description Fluxo de checkout com endereço, frete e pagamento
 * @version 1.0
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Truck, CreditCard, AlertCircle } from 'lucide-react'
import { useCart } from '@/stores/cartStore'
import { trackCheckoutStart } from '@/lib/event-tracker'
import { trackBeginCheckout as trackGABeginCheckout } from '@/lib/analytics'

/**
 * Tipos de endereço
 */
interface Address {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
}

/**
 * Tipos de frete
 */
interface ShippingOption {
    id: string
    name: string
    price: number
    estimatedDays: number
}

const SHIPPING_OPTIONS: ShippingOption[] = [
    { id: '1', name: 'Entrega Padrão (5-7 dias)', price: 15, estimatedDays: 7 },
    { id: '2', name: 'Entrega Expressa (2-3 dias)', price: 35, estimatedDays: 3 },
    { id: '3', name: 'Entrega Mesmo Dia', price: 50, estimatedDays: 0 },
]

export function CheckoutComponent() {
    const { items, getTotal } = useCart()

    const [step, setStep] = useState<'address' | 'shipping' | 'payment'>('address')
    const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
    const [address, setAddress] = useState<Address>({
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
    })
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card')

    // Validar endereço
    const isAddressValid = () => {
        return (
            address.street &&
            address.number &&
            address.neighborhood &&
            address.city &&
            address.state &&
            address.zipCode
        )
    }

    // Iniciar checkout
    const handleBeginCheckout = () => {
        const cartValue = getTotal()
        trackCheckoutStart(cartValue)
        trackGABeginCheckout(cartValue)
        trackDataLayerCheckout(cartValue)
        setStep('shipping')
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-ember-dark flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-2xl font-bold text-white">Carrinho Vazio</h1>
                    <p className="text-ember-secondary">Adicione itens ao carrinho para continuar</p>
                </motion.div>
            </div>
        )
    }

    const cartValue = getTotal()
    const shippingPrice = selectedShipping?.price || 0
    const totalValue = cartValue + shippingPrice

    return (
        <div className="min-h-screen bg-ember-dark">
            {/* Header */}
            <div className="bg-ember-dark/95 backdrop-blur-md border-b border-zinc-800/50 px-4 py-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-white">Checkout</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulário */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Step Indicator */}
                    <motion.div className="flex items-center justify-between">
                        {(['address', 'shipping', 'payment'] as const).map((s, i, arr) => (
                            <React.Fragment key={s}>
                                <motion.div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${step === s || arr.indexOf(step) > i
                                            ? 'bg-ember-accent text-white'
                                            : 'bg-zinc-800 text-zinc-500'
                                        }`}
                                >
                                    {i + 1}
                                </motion.div>
                                {i < arr.length - 1 && (
                                    <div
                                        className={`flex-1 h-px mx-2 transition-colors ${arr.indexOf(step) > i ? 'bg-ember-accent' : 'bg-zinc-800'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </motion.div>

                    {/* Step 1: Endereço */}
                    {step === 'address' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin className="w-5 h-5 text-ember-accent" />
                                <h2 className="text-lg font-bold text-white">Endereço de Entrega</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* CEP */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-zinc-400 mb-2">CEP</label>
                                    <input
                                        type="text"
                                        placeholder="00000-000"
                                        value={address.zipCode}
                                        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-ember-accent transition-colors"
                                    />
                                </div>

                                {/* Rua */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-zinc-400 mb-2">Rua</label>
                                    <input
                                        type="text"
                                        placeholder="Rua Principal"
                                        value={address.street}
                                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-ember-accent transition-colors"
                                    />
                                </div>

                                {/* Número */}
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Número</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        value={address.number}
                                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-ember-accent transition-colors"
                                    />
                                </div>

                                {/* Complemento */}
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Complemento</label>
                                    <input
                                        type="text"
                                        placeholder="Apto 101"
                                        value={address.complement || ''}
                                        onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-ember-accent transition-colors"
                                    />
                                </div>

                                {/* Bairro */}
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Bairro</label>
                                    <input
                                        type="text"
                                        placeholder="Vila Nova"
                                        value={address.neighborhood}
                                        onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-ember-accent transition-colors"
                                    />
                                </div>

                                {/* Cidade */}
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Cidade</label>
                                    <input
                                        type="text"
                                        placeholder="São Paulo"
                                        value={address.city}
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-ember-accent transition-colors"
                                    />
                                </div>

                                {/* Estado */}
                                <div>
                                    <label htmlFor="state" className="block text-sm text-zinc-400 mb-2">
                                        Estado
                                    </label>
                                    <select
                                        id="state"
                                        value={address.state}
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-ember-accent transition-colors"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="SP">SP</option>
                                        <option value="RJ">RJ</option>
                                        <option value="MG">MG</option>
                                        <option value="BA">BA</option>
                                    </select>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleBeginCheckout}
                                disabled={!isAddressValid()}
                                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isAddressValid()
                                        ? 'bg-gradient-to-r from-ember-accent to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/20'
                                        : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                    }`}
                            >
                                Continuar
                                <ChevronRight size={18} />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Step 2: Frete */}
                    {step === 'shipping' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Truck className="w-5 h-5 text-ember-accent" />
                                <h2 className="text-lg font-bold text-white">Opções de Frete</h2>
                            </div>

                            <div className="space-y-3">
                                {SHIPPING_OPTIONS.map((option) => (
                                    <motion.button
                                        key={option.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedShipping(option)}
                                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${selectedShipping?.id === option.id
                                                ? 'border-ember-accent bg-ember-accent/10'
                                                : 'border-zinc-800/50 bg-zinc-900/40 hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-white">{option.name}</p>
                                                <p className="text-sm text-zinc-400 mt-1">
                                                    Entrega em {option.estimatedDays} dias
                                                </p>
                                            </div>
                                            <p className="font-bold text-amber-400">
                                                R$ {option.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep('payment')}
                                disabled={!selectedShipping}
                                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${selectedShipping
                                        ? 'bg-gradient-to-r from-ember-accent to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/20'
                                        : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                    }`}
                            >
                                Continuar
                                <ChevronRight size={18} />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Step 3: Pagamento */}
                    {step === 'payment' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="w-5 h-5 text-ember-accent" />
                                <h2 className="text-lg font-bold text-white">Método de Pagamento</h2>
                            </div>

                            <div className="space-y-3">
                                {/* Cartão de Crédito */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setPaymentMethod('card')}
                                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${paymentMethod === 'card'
                                            ? 'border-ember-accent bg-ember-accent/10'
                                            : 'border-zinc-800/50 bg-zinc-900/40 hover:border-zinc-700'
                                        }`}
                                >
                                    <p className="font-bold text-white">Cartão de Crédito</p>
                                    <p className="text-sm text-zinc-400 mt-1">Visa, Mastercard, ELO</p>
                                </motion.button>

                                {/* PIX */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setPaymentMethod('pix')}
                                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${paymentMethod === 'pix'
                                            ? 'border-emerald-500 bg-emerald-500/10'
                                            : 'border-zinc-800/50 bg-zinc-900/40 hover:border-zinc-700'
                                        }`}
                                >
                                    <p className="font-bold text-white">PIX</p>
                                    <p className="text-sm text-zinc-400 mt-1">Instantâneo e sem taxas</p>
                                </motion.button>
                            </div>

                            {/* Aviso */}
                            <div className="flex gap-3 p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-300">
                                    Pagamentos estão em modo MOCK para testes. Use dados de teste.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
                            >
                                Finalizar Pedido - R$ {totalValue.toFixed(2)}
                            </motion.button>
                        </motion.div>
                    )}
                </div>

                {/* Resumo do Pedido */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1 sticky top-24 h-fit p-6 bg-zinc-900/60 border border-zinc-800/50 rounded-xl space-y-4"
                >
                    <h3 className="font-bold text-white text-lg">Resumo do Pedido</h3>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm text-zinc-400">
                                <span>
                                    {item.name} x{item.quantity}
                                </span>
                                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-zinc-700/50 pt-4 space-y-2">
                        <div className="flex justify-between text-white">
                            <span>Subtotal:</span>
                            <span>R$ {cartValue.toFixed(2)}</span>
                        </div>
                        {selectedShipping && (
                            <div className="flex justify-between text-white">
                                <span>Frete:</span>
                                <span>R$ {selectedShipping.price.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold text-amber-400">
                            <span>Total:</span>
                            <span>R$ {totalValue.toFixed(2)}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
