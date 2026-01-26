/**
 * @name Header Component
 * @description Header dinâmico sticky com logo, nome loja, menu burger mobile
 * @version 1.0
 * 
 * Features:
 * - Sticky top com z-index
 * - Logo + nome da loja
 * - Menu burger mobile (Lucide)
 * - Navegação (Home, Cardápio, Contato, Admin)
 * - Dark theme Ember System
 * - Integração com tenant context
 * 
 * @example
 * <Header storeName="Churrascaria Bem Estar" />
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, MapPin, Phone, Settings } from 'lucide-react'
import { useTenant } from '@/hooks/use-tenant'
import Link from 'next/link'

interface HeaderProps {
    storeName?: string
    logoUrl?: string
}

export function Header({ storeName = 'HNK Food Stack', logoUrl }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { tenant } = useTenant()

    const navItems = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Cardápio', href: '#menu', icon: MapPin },
        { label: 'Contato', href: '#contact', icon: Phone },
        { label: 'Admin', href: '/admin', icon: Settings },
    ]

    return (
        <header
            className={`
        sticky top-0 z-40 w-full
        bg-zinc-900/95 border-b border-zinc-700/50
        backdrop-blur-xl
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo + Store Name */}
                    <Link href="/" className="flex items-center gap-3 flex-1 group">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={storeName}
                                className="h-10 w-10 rounded-lg object-cover group-hover:scale-110 transition-transform"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-ember-accent to-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-sm">HNK</span>
                            </div>
                        )}
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                                {storeName}
                            </h1>
                            <p className="text-xs text-zinc-400">Cardápio Digital</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg
                    text-sm font-medium
                    text-zinc-300 hover:text-white
                    hover:bg-zinc-800/50
                    transition-all duration-200
                  `}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`
              md:hidden p-2 rounded-lg
              hover:bg-zinc-800 transition-colors
              text-white
            `}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`
              md:hidden
              bg-zinc-800/50 border-t border-zinc-700/50
              backdrop-blur-xl
            `}
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`
                      flex items-center gap-3 w-full px-4 py-3 rounded-lg
                      text-sm font-medium
                      text-zinc-300 hover:text-white
                      hover:bg-zinc-700/50
                      transition-all duration-200
                    `}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}
