'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Flame } from 'lucide-react'

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: "Cardápio", href: "/cardapio" },
        { name: "Pedidos", href: "/pedidos" },
        { name: "IA", href: "/ia" },
        { name: "Analytics", href: "/analytics" },
        { name: "Blog", href: "/blog" },
        { name: "Sobre", href: "/sobre" },
        { name: "Suporte", href: "/suporte" },
    ]

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-zinc-800/30'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                {/* Logo + Brand */}
                <Link href="/" className="flex items-center gap-3 group hover:opacity-90 transition">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center group-hover:shadow-fire-glow transition">
                        <Flame size={20} className="text-white" />
                    </div>
                    <span className="hidden sm:inline text-white font-bold text-lg">HNK Food Stack</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm text-zinc-300 hover:text-amber-500 transition-colors duration-200 font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-5 py-2 text-sm font-medium text-amber-500 border border-amber-500 rounded-full hover:bg-amber-500/10 transition-colors duration-200"
                    >
                        ENTRAR
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2 text-sm font-medium text-white bg-amber-600 rounded-full hover:bg-amber-700 transition-colors duration-200"
                    >
                        CADASTRAR
                    </Link>
                </div>

                {/* Mobile Hambúrguer Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 hover:bg-zinc-800/50 rounded-lg transition text-white"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#050505]/95 backdrop-blur-md border-t border-zinc-800/30"
                    >
                        <nav className="flex flex-col gap-2 p-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-3 text-zinc-300 hover:text-amber-500 hover:bg-zinc-800/50 rounded-lg transition-colors duration-200 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="border-t border-zinc-700/30 my-4 pt-4 flex flex-col gap-3">
                                <Link
                                    href="/login"
                                    className="w-full px-5 py-3 text-sm font-medium text-center text-amber-500 border border-amber-500 rounded-full hover:bg-amber-500/10 transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ENTRAR
                                </Link>
                                <Link
                                    href="/signup"
                                    className="w-full px-5 py-3 text-sm font-medium text-center text-white bg-amber-600 rounded-full hover:bg-amber-700 transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    CADASTRAR
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
