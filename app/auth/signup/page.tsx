"use client";

/**
 * @fileoverview Página de Sign Up
 * Criar conta com email + Magic Link
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithMagicLink } from "@/services/auth";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Validação básica
        if (!formData.fullName.trim()) {
            setMessage({
                type: "error",
                text: "❌ Por favor, insira seu nome completo",
            });
            setIsLoading(false);
            return;
        }

        // Fazer signup via Magic Link (Supabase cria automaticamente)
        const result = await signInWithMagicLink(formData.email);

        if (result.success) {
            setMessage({
                type: "success",
                text: "✅ Conta criada! Link de confirmação enviado para seu email",
            });
            setFormData({ fullName: "", email: "" });

            // Redirecionar para login após 2 segundos
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
        } else {
            setMessage({
                type: "error",
                text: `❌ Erro: ${result.error}`,
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 px-4">
            {/* Container */}
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-amber-500 mb-2">HNK Food</h1>
                    <p className="text-slate-400">Crie sua conta para começar</p>
                </div>

                {/* Card */}
                <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
                    {/* Mensagens */}
                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === "success"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="João Silva"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Criando conta..." : "Criar Conta"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-slate-600"></div>
                        <span className="text-sm text-slate-400">ou</span>
                        <div className="flex-1 h-px bg-slate-600"></div>
                    </div>

                    {/* Info */}
                    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 text-sm text-slate-300">
                        📧 Após criar sua conta, você receberá um <strong>link de confirmação por email</strong>. Clique nele para fazer login.
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-slate-400 mt-6">
                        Já tem conta?{" "}
                        <Link
                            href="/auth/login"
                            className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
                        >
                            Fazer login
                        </Link>
                    </p>
                </div>

                {/* Info */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    Ao criar conta, você concorda com nossos Termos de Serviço e Política de Privacidade
                </p>
            </div>
        </div>
    );
}
