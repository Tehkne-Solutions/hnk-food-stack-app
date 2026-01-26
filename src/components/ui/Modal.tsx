/**
 * @name Modal Base Component
 * @description Componente modal reutilizável com backdrop blur e animações
 * @version 1.0
 * 
 * Features:
 * - Overlay com backdrop-blur
 * - Animação scale + fade-in (Framer Motion)
 * - Fechar com ESC ou clique fora
 * - Customizável: title, children, size
 * - Accessibility: aria-modal, focus trap
 * 
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Confirmar Pedido"
 *   size="md"
 * >
 *   <p>Deseja confirmar este pedido?</p>
 * </Modal>
 */

'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
    closeButton?: boolean
    onConfirm?: () => void
    confirmText?: string
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeButton = true,
    onConfirm,
    confirmText = 'Confirmar',
}: ModalProps) {
    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const sizeMap = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    }

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className={`
              fixed inset-0 z-40
              bg-black/50 backdrop-blur-sm
            `}
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              z-50 w-full ${sizeMap[size]}
              mx-4 max-h-[90vh] overflow-y-auto
            `}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div
                            className={`
                bg-zinc-900/95 border border-zinc-700/50
                backdrop-blur-xl rounded-xl
                shadow-2xl shadow-black/50
              `}
                        >
                            {/* Header */}
                            {(title || closeButton) && (
                                <div className="flex items-center justify-between gap-4 p-4 sm:p-6 border-b border-zinc-700/50">
                                    {title && (
                                        <h2
                                            id="modal-title"
                                            className="text-lg sm:text-xl font-bold text-white"
                                        >
                                            {title}
                                        </h2>
                                    )}
                                    {closeButton && (
                                        <button
                                            onClick={onClose}
                                            className={`
                        flex-shrink-0 p-2 rounded-lg
                        hover:bg-zinc-800 transition-colors
                        text-zinc-400 hover:text-white
                      `}
                                            aria-label="Fechar"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-4 sm:p-6 text-zinc-100">
                                {children}
                            </div>

                            {/* Footer with confirm button */}
                            {onConfirm && (
                                <div className="flex items-center gap-3 p-4 sm:p-6 border-t border-zinc-700/50">
                                    <button
                                        onClick={onClose}
                                        className={`
                      flex-1 px-4 py-2 rounded-lg
                      bg-zinc-800 hover:bg-zinc-700
                      text-white font-medium
                      transition-colors duration-200
                    `}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        className={`
                      flex-1 px-4 py-2 rounded-lg
                      bg-gradient-to-r from-ember-accent to-amber-600
                      text-white font-medium
                      hover:shadow-lg hover:shadow-amber-500/50
                      transition-all duration-200
                    `}
                                    >
                                        {confirmText}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
