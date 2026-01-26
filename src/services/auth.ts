/**
 * @fileoverview Serviço de Autenticação com Supabase
 * Magic Link + Social Login (Google, GitHub)
 * 
 * Configuração necessária:
 * 1. Supabase project criado
 * 2. Email provider configurado (Magic Link)
 * 3. Social providers (Google/GitHub opcional)
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy initialization - only throw error when actually using auth functions
let supabase: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
    if (supabase) return supabase;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase credentials not configured. Add to .env.local");
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
    return supabase;
}

/**
 * Fazer login com Magic Link (Email)
 * Envia link de confirmação para email
 */
export const signInWithMagicLink = async (email: string) => {
    try {
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
            },
        });

        if (error) throw error;
        return { success: true, message: "Link de acesso enviado para seu email" };
    } catch (error) {
        console.error("Magic Link Error:", error);
        return { success: false, error: String(error) };
    }
};

/**
 * Fazer login com Google (Social Login)
 */
export const signInWithGoogle = async () => {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
            },
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error("Google Login Error:", error);
        return { success: false, error: String(error) };
    }
};

/**
 * Fazer login com GitHub (Social Login)
 */
export const signInWithGitHub = async () => {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
            },
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error("GitHub Login Error:", error);
        return { success: false, error: String(error) };
    }
};

/**
 * Logout
 */
export const logout = async () => {
    try {
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, error: String(error) };
    }
};

/**
 * Pegar sessão atual
 */
export const getSession = async () => {
    try {
        const supabase = getSupabaseClient();
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    } catch (error) {
        console.error("Get Session Error:", error);
        return null;
    }
};

/**
 * Pegar usuário atual
 */
export const getCurrentUser = async () => {
    try {
        const supabase = getSupabaseClient();
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    } catch (error) {
        console.error("Get User Error:", error);
        return null;
    }
};

/**
 * Hook para monitorar auth state
 * Usar com useEffect em componentes cliente
 */
export const onAuthStateChange = (callback: (user: any) => void) => {
    const supabase = getSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return supabase.auth.onAuthStateChange((event: any, session: any) => {
        callback(session?.user || null);
    });
};

/**
 * Atualizar perfil do usuário
 */
export const updateUserProfile = async (
    data: {
        full_name?: string;
        avatar_url?: string;
    }
) => {
    try {
        const supabase = getSupabaseClient();
        const { data: updatedUser, error } = await supabase.auth.updateUser({
            data,
        });
        if (error) throw error;
        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Update Profile Error:", error);
        return { success: false, error: String(error) };
    }
};

export default supabase;
