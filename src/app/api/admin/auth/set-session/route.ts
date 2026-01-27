import { NextRequest, NextResponse } from 'next/server'
import { type AdminUser } from '@/services/admin/adminAuthService'

/**
 * API Route: Set Admin Session
 * Seta cookies HTTP-only para manter sessão segura no servidor
 * 
 * POST /api/admin/auth/set-session
 * Body: { token: string; user: AdminUser }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { token, user } = body

        if (!token || !user) {
            return NextResponse.json(
                { error: 'Token e user são obrigatórios' },
                { status: 400 }
            )
        }

        // Criar resposta
        const response = NextResponse.json({ success: true })

        // Setar cookies HTTP-only (mais seguro que localStorage)
        // Max age: 24 horas
        const maxAge = 24 * 60 * 60

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge,
            path: '/'
        })

        response.cookies.set('admin_user', JSON.stringify(user as AdminUser), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge,
            path: '/'
        })

        return response
    } catch (error) {
        console.error('Erro ao setar sessão:', error)
        return NextResponse.json(
            { error: 'Erro ao processar requisição' },
            { status: 500 }
        )
    }
}

/**
 * GET /api/admin/auth/set-session
 * Health check - verifica se cookies estão setados
 */
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value
        const user = request.cookies.get('admin_user')?.value

        if (!token || !user) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            )
        }

        // Validar estrutura básica
        let userData: AdminUser
        try {
            userData = JSON.parse(user)
        } catch {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            )
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                role: userData.role
            }
        })
    } catch (error) {
        console.error('Erro ao verificar sessão:', error)
        return NextResponse.json(
            { authenticated: false },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/admin/auth/set-session
 * Logout - limpa cookies
 */
export async function DELETE(request: NextRequest) {
    const response = NextResponse.json({ success: true })

    // Limpar cookies
    response.cookies.set('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
    })

    response.cookies.set('admin_user', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
    })

    return response
}
