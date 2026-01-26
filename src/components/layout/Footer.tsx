/**
 * @name Footer Component
 * @description Footer institucional com horários, endereço, redes sociais
 * @version 1.0
 * 
 * Features:
 * - 3 colunas: info, horários, redes
 * - Icons Lucide para redes sociais
 * - Dark theme Ember System
 * - Responsivo mobile
 * - Links customizáveis
 * 
 * @example
 * <Footer
 *   storeName="Bem Estar"
 *   email="contato@bemesar.com"
 *   phone="(11) 1234-5678"
 * />
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react'
import Link from 'next/link'

interface FooterProps {
  storeName?: string
  address?: string
  phone?: string
  email?: string
  hours?: { day: string; time: string }[]
  instagram?: string
  facebook?: string
}

export function Footer({
  storeName = 'Churrascaria Bem Estar',
  address = 'São Paulo, SP',
  phone = '(11) 1234-5678',
  email = 'contato@bemesar.com',
  hours = [
    { day: 'Ter-Qui', time: '18:00 - 22:00' },
    { day: 'Sexta', time: '18:00 - 23:00' },
    { day: 'Sábado', time: '12:00 - 23:00' },
  ],
  instagram = '@seujunior_churrascaria',
  facebook = 'bemestarchurrascaria',
}: FooterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer
      className={`
        w-full
        bg-zinc-950/95 border-t border-zinc-700/50
        backdrop-blur-xl
        mt-16 sm:mt-24
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {/* Column 1: Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">{storeName}</h3>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-amber-500 flex-shrink-0 mt-1" />
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                {address}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-amber-500 flex-shrink-0" />
              <a
                href={`tel:${phone}`}
                className="text-zinc-300 hover:text-white transition-colors"
              >
                {phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-amber-500 flex-shrink-0" />
              <a
                href={`mailto:${email}`}
                className="text-zinc-300 hover:text-white transition-colors"
              >
                {email}
              </a>
            </div>
          </motion.div>

          {/* Column 2: Hours */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Clock size={20} className="text-amber-500" />
              Horários
            </h4>

            <div className="space-y-3">
              {hours.map((hour, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-zinc-400">{hour.day}</span>
                  <span className="text-white font-medium">{hour.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Social */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-4">Siga-nos</h4>

            <div className="flex flex-wrap gap-3">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-2 rounded-lg
                    bg-zinc-800/50 hover:bg-pink-600/50
                    text-zinc-300 hover:text-white
                    transition-all duration-300
                  `}
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}

              {facebook && (
                <a
                  href={`https://facebook.com/${facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-2 rounded-lg
                    bg-zinc-800/50 hover:bg-blue-600/50
                    text-zinc-300 hover:text-white
                    transition-all duration-300
                  `}
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-zinc-700/50 my-8" />

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400"
        >
          <p>© 2026 {storeName}. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Termos
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
