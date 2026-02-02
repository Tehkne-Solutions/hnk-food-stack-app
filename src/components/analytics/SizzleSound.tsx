'use client'

import { useEffect, useRef } from 'react'

export const SizzleSound = ({ trigger }: { trigger: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (trigger && audioRef.current) {
      // Som de churrasqueira (sizzle) - em produção usar arquivo de áudio real
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Simula som de fritura/churrasqueira
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
      
      console.log('🔥 Som de churrasqueira ativado!')
    }
  }, [trigger])

  return null
}