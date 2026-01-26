'use client'

/**
 * Root Page - Redireciona para a primeira loja (Bem Estar)
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // TODO: buscar slug da primeira loja do Supabase
    // Por enquanto, redireciona para bem-estar
    router.push('/bem-estar')
  }, [router])

  return (
    <div className="min-h-screen bg-ember-dark flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-5xl animate-bounce">🔥</div>
        <p className="text-zinc-400">Carregando sua loja...</p>
      </div>
    </div>
  )
}
        }}
      >
  <div className="container mx-auto px-4 text-center">
    <div className="flex justify-center mb-4">
      <Utensils className="w-16 h-16" />
    </div>

    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      {theme?.brand_name || 'HNK Food Stack'}
    </h1>

    {theme?.brand_tagline && (
      <p className="text-xl md:text-2xl mb-8 opacity-90">{theme.brand_tagline}</p>
    )}

    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
      Cardápio digital, agendamento de eventos e inteligência artificial para sua experiência
    </p>

    <div className="flex gap-4 justify-center flex-wrap">
      <Link
        href="/menu"
        className="px-8 py-3 rounded-lg font-bold hover:opacity-90 transition text-white"
        style={{ backgroundColor: theme?.primary_color || '#d97706' }}
      >
        📋 Ver Cardápio
      </Link>

      <Link
        href="/booking"
        className="px-8 py-3 rounded-lg font-bold border-2 hover:opacity-90 transition"
        style={{
          borderColor: theme?.primary_color || '#d97706',
          color: theme?.primary_color || '#d97706',
        }}
      >
        📅 Agendar Evento
      </Link>
    </div>
  </div>
      </section >

  {/* Features */ }
  < section className = "py-16 bg-white" >
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">✨ Recursos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${theme?.primary_color || '#d97706'}33` }}
          >
            <Menu className="w-8 h-8" style={{ color: theme?.primary_color || '#d97706' }} />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Cardápio Digital</h3>
          <p className="text-gray-600">
            Cardápio digital atualizado em tempo real com descrições e imagens
          </p>
        </div>

        {/* Feature 2 */}
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${theme?.accent_color || '#25d366'}33` }}
          >
            <Calendar className="w-8 h-8" style={{ color: theme?.accent_color || '#25d366' }} />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Agendamentos</h3>
          <p className="text-gray-600">
            Sistema de agendamento de eventos com integração WhatsApp
          </p>
        </div>

        {/* Feature 3 */}
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${theme?.secondary_color || '#1a1a1a'}33` }}
          >
            <BarChart3 className="w-8 h-8" style={{ color: theme?.secondary_color || '#1a1a1a' }} />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Analytics</h3>
          <p className="text-gray-600">
            Dashboard BI com métricas de conversão e receita em tempo real
          </p>
        </div>
      </div>
    </div>
      </section >

  {/* CTA */ }
  < section
className = "py-16 text-white"
style = {{
  backgroundColor: theme?.secondary_color || '#1a1a1a',
        }}
      >
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Pronto para elevar sua experiência?</h2>
    <p className="text-lg mb-8 opacity-80">
      Comece agora e veja a transformação da sua churrascaria
    </p>

    <Link
      href="/admin/theme"
      className="px-8 py-3 rounded-lg font-bold hover:opacity-90 transition text-white"
      style={{ backgroundColor: theme?.primary_color || '#d97706' }}
    >
      🎨 Customizar Tema
    </Link>
  </div>
      </section >
    </div >
  )
}
