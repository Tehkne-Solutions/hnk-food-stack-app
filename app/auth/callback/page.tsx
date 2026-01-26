/**
 * @fileoverview Página de Callback - Rota de confirmação do Magic Link
 * Supabase redireciona aqui após usuário clicar no link do email
 */

import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function CallbackPage({
    searchParams,
}: {
    searchParams: Promise<{ code?: string; error?: string }>;
}) {
    const params = await searchParams;

    // Se houver erro, redirecionar para login
    if (params.error) {
        redirect(`/auth/login?error=${params.error}`);
    }

    // Se não houver código, redirecionar para home
    if (!params.code) {
        redirect("/");
    }

    // Criar cliente Supabase com service role (server-side)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error("Missing Supabase credentials");
        redirect("/auth/login");
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Trocar o código por uma sessão
        const { error } = await supabase.auth.exchangeCodeForSession(params.code);

        if (error) {
            console.error("Code exchange error:", error);
            redirect("/auth/login");
        }

        // Redirecionar para checkout ou home
        redirect("/checkout");
    } catch (error) {
        console.error("Callback error:", error);
        redirect("/auth/login");
    }
}
