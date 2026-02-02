'use client'

import { motion } from 'framer-motion'
import { Utensils, Zap, MessageCircle, Settings, Sprout, TrendingUp, Shield, Smartphone, Quote, Star, Flame, Instagram, Linkedin, Twitter, ShieldCheck, ChevronRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import './page.css'

const EmbersCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: any[] = []
    const particleCount = 40

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      x: number; y: number; size: number; speedY: number; speedX: number; opacity: number;
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100
        this.size = Math.random() * 3 + 1
        this.speedY = Math.random() * -1.5 - 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.opacity = Math.random() * 0.5 + 0.5
      }
      update() {
        this.y += this.speedY
        this.x += this.speedX
        if (this.y < -10) this.y = canvas.height + 100
      }
      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#f59e0b'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    resize()
    init()
    animate()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />
}

const HeroIndustrial = () => {
  return (
    <section className="relative min-h-[90vh] w-full bg-[#050505] overflow-hidden flex items-center">
      <EmbersCanvas />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-zinc-500 font-mono text-sm tracking-[0.4em] uppercase">
              HNK Food Stack // v2.0
            </h2>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.85] tracking-tighter text-white">
              FAÇA PARTE DO <br />
              FUTURO DA <br />
              <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                GASTRONOMIA
              </span>
            </h1>
          </div>

          <p className="max-w-md text-zinc-400 font-medium text-lg leading-relaxed border-l-2 border-zinc-800 pl-6">
            Onde o aço encontra a inteligência. Transformamos sua operação bruta em uma máquina de vendas refinada e automática.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-5 bg-amber-500 text-black font-black uppercase italic tracking-widest rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                ENTRAR NO SISTEMA
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#f59e0b' }}
              className="px-8 py-5 bg-transparent border-2 border-zinc-700 text-white font-black uppercase italic tracking-widest rounded-sm flex items-center gap-2 hover:text-amber-500 transition-all"
            >
              CADASTRAR AGORA
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-600/10 blur-[120px] rounded-full" />

          <div className="w-full max-w-[600px] h-96 bg-gradient-to-br from-zinc-300 via-amber-600 to-zinc-800 rounded-lg z-10 drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
            <div className="text-center p-8">
              <Flame size={128} className="text-amber-200 mx-auto mb-4 animate-bounce" />
              <p className="text-white font-black text-2xl">ESPETO INDUSTRIAL</p>
              <p className="text-amber-200 text-sm mt-2">Imagem Premium • Skewer 4K</p>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-0 right-1/4 w-32 h-32 bg-amber-500/20 blur-3xl rounded-full"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 rotate-90 mb-4">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent" />
      </div>
    </section>
  )
}

const MetalCard = ({ title, description, icon: Icon, href }: any) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 5 }}
      className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-zinc-400 to-zinc-800 shadow-2xl cursor-pointer"
    >
      <Link href={href}>
        <div className="relative bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 p-8 rounded-2xl h-full flex flex-col items-center text-center">

          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[linear-gradient(110deg,transparent,white,transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="mb-6 p-4 rounded-full bg-zinc-200/50 border border-zinc-400 shadow-inner">
            <Icon className="text-zinc-900" size={32} />
          </div>

          <h3 className="font-black uppercase italic tracking-tighter text-zinc-950 text-xl mb-3">
            {title}
          </h3>

          <p className="text-zinc-800 font-bold text-sm leading-relaxed mb-6">
            {description}
          </p>

          <span className="mt-auto text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 border-b-2 border-zinc-900 hover:text-amber-600 hover:border-amber-600 transition-colors">
            Explorar Sistema
          </span>

          <div className="absolute -top-4 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-16 bg-amber-500 blur-xl rounded-full"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const FeaturePlates = () => {
  const features = [
    {
      title: "Cardápio Digital",
      description: "Seu cardápio vira um aplicativo PWA. Rápido, intuitivo e com IA para otimizar vendas.",
      icon: Utensils,
      href: "/sistema/cardapio-digital"
    },
    {
      title: "Pedidos Rápidos",
      description: "Sistema de pedidos otimizado para alta demanda. Converta cliques em churrasco na mesa.",
      icon: Zap,
      href: "/sistema/pedidos-rapidos"
    },
    {
      title: "WhatsApp & IA",
      description: "Atendimento automático, CRM inteligente e marketing via WhatsApp. Sua IA no comando.",
      icon: MessageCircle,
      href: "/sistema/whatsapp-ia"
    },
    {
      title: "Gestão Completa",
      description: "Controle total da sua operação, estoque e equipe em um dashboard metálico e robusto.",
      icon: Settings,
      href: "/sistema/gestao-completa"
    },
    {
      title: "Eco-Friendly",
      description: "Otimize rotas e reduza o desperdício. Tecnologia para um churrasco mais sustentável.",
      icon: Sprout,
      href: "/sistema/sustentabilidade"
    },
    {
      title: "Analytics Premium",
      description: "Decisões baseadas em dados. Visualize tendências e otimize seu lucro em tempo real.",
      icon: TrendingUp,
      href: "/sistema/analytics"
    },
    {
      title: "Segurança Imbatível",
      description: "Dados protegidos com criptografia de ponta. Aço digital contra qualquer ameaça.",
      icon: Shield,
      href: "/sistema/seguranca"
    },
    {
      title: "App Mobile PWA",
      description: "Seu negócio na palma da mão do cliente. Instale seu cardápio como um app nativo.",
      icon: Smartphone,
      href: "/sistema/app-mobile"
    },
  ]

  return (
    <section className="relative py-24 px-6 bg-[#050505] border-t border-zinc-900 overflow-hidden">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute inset-0 bg-amber-500/5 blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white text-center mb-16"
        >
          O PODER DO AÇO <br />
          <span className="text-amber-500">NA SUA BRASA.</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <MetalCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BrickTestimonials = () => {
  const testimonials = [
    {
      name: "Seu Junior",
      role: "Dono da Bem Estar",
      text: "O sistema não só organiza, ele vende sozinho. O espeto metálico no site virou a marca registrada do meu delivery.",
      rating: 5
    },
    {
      name: "Ricardo Silva",
      role: "Gerente do Fogo de Chão",
      text: "A IA do WhatsApp reduziu meu tempo de resposta em 90%. O ROI foi imediato. É bruto e tecnológico.",
      rating: 5
    }
  ]

  return (
    <section className="relative py-24 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none brick-pattern" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
            GRAVADO NO <span className="text-amber-500">AÇO.</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-4">
            O que os mestres churrasqueiros dizem do HNK
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-zinc-800 rounded-lg blur-[2px] opacity-50 group-hover:bg-amber-600/20 transition-colors" />

              <div className="relative bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-500 p-8 rounded-sm shadow-2xl border-b-4 border-r-4 border-zinc-600">

                {[...Array(4)].map((_, j) => (
                  <div key={j} className={`absolute w-3 h-3 bg-zinc-600 rounded-full border border-zinc-800 shadow-inner ${j === 0 ? 'top-3 left-3' : j === 1 ? 'top-3 right-3' : j === 2 ? 'bottom-3 left-3' : 'bottom-3 right-3'
                    }`} />
                ))}

                <Quote className="text-zinc-800/20 absolute right-8 top-8" size={64} />

                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, k) => (
                    <Star key={k} size={16} className="fill-zinc-900 text-zinc-900" />
                  ))}
                </div>

                <p className="text-zinc-950 font-bold italic text-lg leading-tight mb-6">
                  "{t.text}"
                </p>

                <div className="border-t border-zinc-500/50 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-zinc-950 font-black uppercase tracking-tighter">{t.name}</h4>
                    <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">{t.role}</span>
                  </div>
                  <div className="w-10 h-1 bg-amber-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const IndustrialFooter = () => {
  const currentYear = new Date().getFullYear()

  const menuSections = [
    {
      title: "Sistema",
      links: [
        { name: "Cardápio Digital", href: "/sistema/cardapio-digital" },
        { name: "Gestão de Pedidos", href: "/sistema/pedidos-rapidos" },
        { name: "IA para WhatsApp", href: "/sistema/whatsapp-ia" },
        { name: "Analytics Pro", href: "/sistema/analytics" }
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
        { name: "Central de Ajuda", href: "/ajuda" },
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

export default function LandingPage() {
  return (
    <main className="w-full bg-[#050505]">
      <HeroIndustrial />
      <FeaturePlates />
      <BrickTestimonials />
      <IndustrialFooter />
    </main>
  )
}