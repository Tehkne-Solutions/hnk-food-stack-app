"use client";

/**
 * @fileoverview Hook useAuth - Gerenciar autenticação no cliente
 */

import { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChange, logout } from "@/services/auth";

interface AuthContextType {
    user: Record<string, unknown> | null;
    isLoading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Record<string, unknown> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar se há sessão ao montar
        const { data } = onAuthStateChange((authUser) => {
            setUser(authUser);
            setIsLoading(false);
        });

        return () => {
            data?.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}
