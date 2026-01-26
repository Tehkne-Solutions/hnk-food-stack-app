"use client";

/**
 * @fileoverview Componente ProtectedRoute
 * Redireciona para login se não autenticado
 * 
 * Uso:
 * <ProtectedRoute>
 *   <CheckoutPage />
 * </ProtectedRoute>
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, onAuthStateChange } from "@/services/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    requireAuth?: boolean;
}

export default function ProtectedRoute({
    children,
    redirectTo = "/auth/login",
    requireAuth = true,
}: ProtectedRouteProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await getSession();

                if (!session && requireAuth) {
                    router.push(redirectTo);
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error("Auth check failed:", error);
                if (requireAuth) router.push(redirectTo);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        // Monitorar mudanças na autenticação
        const { data } = onAuthStateChange((user) => {
            if (!user && requireAuth) {
                router.push(redirectTo);
            }
        });

        // Unsubscribe cleanup
        return () => {
            if (data?.subscription && typeof data.subscription.unsubscribe === 'function') {
                data.subscription.unsubscribe();
            }
        };
    }, [router, redirectTo, requireAuth]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin">
                    <div className="h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full" />
                </div>
            </div>
        );
    }

    if (!isAuthorized && requireAuth) {
        return null;
    }

    return <>{children}</>;
}
