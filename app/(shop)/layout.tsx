/**
 * Shop Layout
 * Layout base para todas as lojas multitenant
 * Define header, footer, cart provider
 */

import React from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-ember-dark text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-ember-dark/95 backdrop-blur-md border-b border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-black italic font-sans">🔥 HNK Food</h1>
                    <nav className="hidden md:flex gap-6 text-sm">
                        <a href="#" className="hover:text-ember-accent transition">Home</a>
                        <a href="#" className="hover:text-ember-accent transition">Menu</a>
                        <a href="#" className="hover:text-ember-accent transition">Contato</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-20 bg-zinc-900/40 border-t border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
                    <SectionTitle title="Churrascaria Bem Estar" align="center" />
                    <div className="grid md:grid-cols-3 gap-8 text-center text-sm text-ember-secondary">
                        <div>
                            <p className="font-semibold text-white mb-2">Horários</p>
                            <p>Seg-Sex: 11h - 23h</p>
                            <p>Sáb-Dom: 11h - 00h</p>
                        </div>
                        <div>
                            <p className="font-semibold text-white mb-2">Contato</p>
                            <p>📞 (11) 98765-4321</p>
                            <p>📍 Rua Churrasco, 123 - SP</p>
                        </div>
                        <div>
                            <p className="font-semibold text-white mb-2">Redes</p>
                            <p>🎵 @seujunior_churrascaria</p>
                            <p>Made with 🔥 by HNK</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
