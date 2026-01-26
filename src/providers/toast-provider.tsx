/**
 * @name Toast/Notification Context & Hook
 * @description Sistema de notificações com suporte a múltiplos toasts simultâneos
 * @version 1.0
 * 
 * Features:
 * - Notificações empilhadas (stacking automático)
 * - Tipos: success | error | info | warning
 * - Duração customizável
 * - Auto-dismiss
 * - Contexto React para acesso global
 * - Hook useToast para disparar notificações
 * 
 * @example
 * const { toast } = useToast()
 * toast({
 *   title: "Sucesso!",
 *   message: "Produto adicionado ao carrinho",
 *   type: "success",
 *   duration: 3000
 * })
 */

'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
    id: string
    title?: string
    message: string
    type: ToastType
    duration?: number
}

interface ToastContextType {
    toast: (options: Omit<ToastMessage, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([])

    const toast = useCallback(
        ({ title, message, type = 'info', duration = 4000 }: Omit<ToastMessage, 'id'>) => {
            const id = Math.random().toString(36).substr(2, 9)

            setToasts((prev) => [
                ...prev,
                { id, title, message, type, duration },
            ])

            if (duration > 0) {
                setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== id))
                }, duration)
            }
        },
        []
    )

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast deve ser usado dentro de ToastProvider')
    }
    return context
}

/**
 * Toast Container - Renderiza todos os toasts
 */
function ToastContainer({
    toasts,
    onRemove,
}: {
    toasts: ToastMessage[]
    onRemove: (id: string) => void
}) {
    const typeConfig = {
        success: {
            icon: CheckCircle,
            bg: 'bg-green-600/90',
            border: 'border-green-500/50',
            text: 'text-green-100',
        },
        error: {
            icon: AlertCircle,
            bg: 'bg-red-600/90',
            border: 'border-red-500/50',
            text: 'text-red-100',
        },
        info: {
            icon: Info,
            bg: 'bg-blue-600/90',
            border: 'border-blue-500/50',
            text: 'text-blue-100',
        },
        warning: {
            icon: AlertTriangle,
            bg: 'bg-orange-600/90',
            border: 'border-orange-500/50',
            text: 'text-orange-100',
        },
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => {
                    const config = typeConfig[toast.type]
                    const Icon = config.icon

                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className={`
                pointer-events-auto
                flex gap-3 items-start
                ${config.bg} border ${config.border}
                backdrop-blur-sm rounded-lg p-4
                shadow-lg
              `}
                            role="alert"
                        >
                            {/* Icon */}
                            <Icon size={20} className="flex-shrink-0 mt-0.5" />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {toast.title && (
                                    <h4 className="font-semibold text-sm mb-1">
                                        {toast.title}
                                    </h4>
                                )}
                                <p className={`text-sm ${config.text} opacity-90`}>
                                    {toast.message}
                                </p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => onRemove(toast.id)}
                                className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
                                aria-label="Fechar"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
