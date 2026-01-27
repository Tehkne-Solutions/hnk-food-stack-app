'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from 'lucide-react'
import { adminLogin, type LoginCredentials } from '@/services/admin/adminAuthService'

/**
 * Página de Login Admin
 * FASE 7: Sistema de Autenticação
 * 
 * Features:
 * - Email + Password
 * - Validação em tempo real
 * - Loading state
 * - Error handling
 * - Mock credentials display (desenvolvimento)
 */
export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // Validação em tempo real
    const isValidEmail = email.includes('@') && email.includes('.')
    const isValidPassword = password.length >= 6
    const isFormValid = isValidEmail && isValidPassword && !loading

    /**
     * Handle Submit
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const credentials: LoginCredentials = {
                email: email.trim(),
                password
            }

            const session = await adminLogin(credentials)

            if (!session) {
                setError('Email ou senha incorretos')
                setPassword('')
                setLoading(false)
                return
            }

            // Login bem-sucedido
            setSuccess(true)

            // Persistir cookies HTTP-only via API (melhor prática)
            try {
                await fetch('/api/admin/auth/set-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: session.token,
                        user: session.user
                    })
                })
            } catch {
                console.warn('Não foi possível setar cookies HTTP-only')
            }

            // Aguardar um pouco para mostrar feedback
            setTimeout(() => {
                router.push('/admin')
                router.refresh()
            }, 500)
        } catch (err) {
            console.error('Erro no login:', err)
            setError('Erro ao processar login. Tente novamente.')
            setLoading(false)
        }
    }

    /**
     * Preencher com credenciais mock (apenas desenvolvimento)
     */
    const fillMockCredentials = () => {
        setEmail('admin@hnkfood.com.br')
        setPassword('Admin@123456')
        setError('')
    }

    /**
     * Render
     */
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Background decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            {/* Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4">
                            <LogIn className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                        <p className="text-slate-300 text-sm">HNK Food Stack</p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                    setError('')
                                }}
                                placeholder="admin@hnkfood.com.br"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                                disabled={loading || success}
                            />
                            {email && !isValidEmail && (
                                <p className="text-red-400 text-xs mt-1">Email inválido</p>
                            )}
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value)
                                        setError('')
                                    }}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                                    disabled={loading || success}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                    disabled={loading || success}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {password && !isValidPassword && (
                                <p className="text-red-400 text-xs mt-1">
                                    Mínimo 6 caracteres
                                </p>
                            )}
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-gap-2 gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-lg"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-gap-2 gap-2 p-3 bg-green-500/10 border border-green-500/50 rounded-lg"
                            >
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-green-400 text-sm">
                                    Login bem-sucedido! Redirecionando...
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Autenticando...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Entrar
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-900 text-slate-400">
                                Desenvolvimento
                            </span>
                        </div>
                    </div>

                    {/* Mock Credentials (Dev Only) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center"
                    >
                        <p className="text-slate-300 text-xs mb-3">Credenciais de Teste:</p>
                        <p className="text-blue-300 text-xs font-mono break-all mb-1">
                            admin@hnkfood.com.br
                        </p>
                        <p className="text-blue-300 text-xs font-mono mb-3">Admin@123456</p>
                        <button
                            type="button"
                            onClick={fillMockCredentials}
                            disabled={loading || success}
                            className="w-full px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs rounded transition-colors disabled:opacity-50"
                        >
                            Preencher Automaticamente
                        </button>
                    </motion.div>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center text-slate-400 text-xs mt-6"
                    >
                        HNK Food Stack • Admin Panel v1.0
                    </motion.p>
                </div>
            </motion.div>
        </div>
    )
}
