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
