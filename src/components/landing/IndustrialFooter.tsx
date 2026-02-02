'use client'

import Link from 'next/link'
import { Flame, Instagram, Linkedin, Twitter, ShieldCheck, MapPin } from 'lucide-react'

export const IndustrialFooter = () => {
    const currentYear = new Date().getFullYear()

    const menuSections = [
        {
            title: "Sistema",
            links: [
                { name: "Cardápio Digital", href: "/cardapio" },
                { name: "Gestão de Pedidos", href: "/pedidos" },
                { name: "IA para WhatsApp", href: "/ia" },
                { name: "Analytics Pro", href: "/analytics" }
            ]
        },
        {
            title: "Empresa",
            links: [
                { name: "Sobre a HNK", href: "/sobre" },
                { name: "Seja um Parceiro", href: "/parceiros" },
                { name: "Blog da Brasa", href: "/blog" },
                { name: "Carreiras", href: "/vagas" }
            ]
        },
        {
            title: "Suporte",
            links: [
                { name: "Central de Ajuda", href: "/suporte" },
                { name: "API Docs", href: "/docs" },
                { name: "Status do Sistema", href: "/status" },
                { name: "Contato", href: "/contato" }
            ]
        }
    ]

    return (
        <footer className="relative bg-[#050505] border-t border-zinc-900 pt-20 pb-10 overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-amber-500/10 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                                <Flame className="text-amber-500" size={24} />
                            </div>
                            <span className="text-2xl font-black uppercase italic tracking-tighter text-white">
                                HNK <span className="text-amber-500">Food Stack</span>
                            </span>
                        </div>
                        <p className="text-zinc-500 font-medium text-sm leading-relaxed max-w-sm">
                            Forjando a tecnologia que sustenta os maiores mestres churrasqueiros do país.
                            Do aço do código ao calor da venda.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500 hover:text-amber-500 hover:border-amber-500 transition-all">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {menuSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white font-black uppercase italic tracking-widest text-xs mb-6 border-b border-zinc-800 pb-2">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-zinc-500 hover:text-white text-sm font-bold transition-colors flex items-center gap-2 group">
                                            <div className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-10 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            Ambiente Seguro & Criptografado
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                            <MapPin size={14} />
                            HQ: Campinas, SP - BR
                        </div>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">
                        © {currentYear} HNK Food Stack // <span className="text-zinc-500">All rights reserved.</span>
                    </div>
                </div>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent mt-10" />
        </footer>
    )
}
