/**
 * Admin Authentication Service
 * Gerencia credenciais, tokens e permissões de administrador
 */

export interface AdminUser {
    id: string
    email: string
    name: string
    role: 'admin' | 'manager' | 'seller'
    permissions: AdminPermission[]
    createdAt: string
    lastLogin?: string
    isActive: boolean
    twoFactorEnabled: boolean
}

export interface AdminPermission {
    resource: 'dashboard' | 'orders' | 'products' | 'customers' | 'marketing' | 'settings'
    action: 'view' | 'create' | 'edit' | 'delete'
}

export interface AdminSession {
    token: string
    user: AdminUser
    expiresAt: string
    refreshToken?: string
}

// Dados mock para desenvolvimento
const MOCK_ADMIN_CREDENTIALS = {
    email: 'admin@hnkfood.com.br',
    password: 'Admin@123456',
    name: 'Admin HNK'
}

const MOCK_ADMINS: Record<string, AdminUser> = {
    'admin@hnkfood.com.br': {
        id: 'admin-001',
        email: 'admin@hnkfood.com.br',
        name: 'Admin HNK',
        role: 'admin',
        permissions: [
            { resource: 'dashboard', action: 'view' },
            { resource: 'orders', action: 'view' },
            { resource: 'orders', action: 'edit' },
            { resource: 'products', action: 'view' },
            { resource: 'products', action: 'create' },
            { resource: 'products', action: 'edit' },
            { resource: 'products', action: 'delete' },
            { resource: 'customers', action: 'view' },
            { resource: 'marketing', action: 'view' },
            { resource: 'settings', action: 'view' },
            { resource: 'settings', action: 'edit' }
        ],
        createdAt: new Date().toISOString(),
        isActive: true,
        twoFactorEnabled: false
    },
    'manager@hnkfood.com.br': {
        id: 'manager-001',
        email: 'manager@hnkfood.com.br',
        name: 'Gerenciador',
        role: 'manager',
        permissions: [
            { resource: 'dashboard', action: 'view' },
            { resource: 'orders', action: 'view' },
            { resource: 'orders', action: 'edit' },
            { resource: 'products', action: 'view' },
            { resource: 'products', action: 'edit' },
            { resource: 'customers', action: 'view' },
            { resource: 'marketing', action: 'view' }
        ],
        createdAt: new Date().toISOString(),
        isActive: true,
        twoFactorEnabled: false
    }
}

/**
 * Faz login com email e senha
 */
export async function adminLogin(
    email: string,
    password: string
): Promise<AdminSession | null> {
    try {
        // Mock validation
        if (email === MOCK_ADMIN_CREDENTIALS.email &&
            password === MOCK_ADMIN_CREDENTIALS.password) {

            const user = MOCK_ADMINS[email]
            if (!user) return null

            const token = generateToken(email)
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

            // Store session in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('admin_token', token)
                localStorage.setItem('admin_user', JSON.stringify(user))
                localStorage.setItem('admin_session', JSON.stringify({
                    token,
                    expiresAt,
                    user
                }))
            }

            return {
                token,
                user,
                expiresAt
            }
        }

        return null
    } catch (error) {
        console.error('Login error:', error)
        return null
    }
}

/**
 * Faz logout
 */
export async function adminLogout(): Promise<void> {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        localStorage.removeItem('admin_session')
    }
}

/**
 * Obtém sessão atual
 */
export function getCurrentSession(): AdminSession | null {
    if (typeof window === 'undefined') return null

    const sessionStr = localStorage.getItem('admin_session')
    if (!sessionStr) return null

    try {
        const session = JSON.parse(sessionStr) as AdminSession

        // Check if session expired
        if (new Date(session.expiresAt) < new Date()) {
            adminLogout()
            return null
        }

        return session
    } catch (error) {
        console.error('Session error:', error)
        return null
    }
}

/**
 * Obtém usuário atual
 */
export function getCurrentUser(): AdminUser | null {
    if (typeof window === 'undefined') return null

    const userStr = localStorage.getItem('admin_user')
    if (!userStr) return null

    try {
        return JSON.parse(userStr) as AdminUser
    } catch (error) {
        console.error('User parse error:', error)
        return null
    }
}

/**
 * Verifica se usuário tem permissão
 */
export function hasPermission(user: AdminUser, resource: string, action: string): boolean {
    if (user.role === 'admin') return true // Admin tem acesso a tudo

    return user.permissions.some(
        p => p.resource === resource && p.action === action
    )
}

/**
 * Gera token JWT (mock)
 */
function generateToken(email: string): string {
    const payload = {
        email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
    }

    // Simple base64 encoding (NÃO use em produção!)
    return Buffer.from(JSON.stringify(payload)).toString('base64')
}

/**
 * Valida token
 */
export function validateToken(token: string): boolean {
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
        const now = Math.floor(Date.now() / 1000)
        return decoded.exp > now
    } catch (error) {
        return false
    }
}

/**
 * Obtém lista de admins (para gerenciamento)
 */
export function getAdminsList(): AdminUser[] {
    return Object.values(MOCK_ADMINS)
}

/**
 * Cria novo admin (mock)
 */
export function createAdmin(userData: Partial<AdminUser>): AdminUser | null {
    if (!userData.email || !userData.name) {
        return null
    }

    const newAdmin: AdminUser = {
        id: `admin-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        role: userData.role || 'seller',
        permissions: userData.permissions || [],
        createdAt: new Date().toISOString(),
        isActive: true,
        twoFactorEnabled: false
    }

    MOCK_ADMINS[userData.email] = newAdmin
    return newAdmin
}

/**
 * Atualiza admin
 */
export function updateAdmin(email: string, updates: Partial<AdminUser>): AdminUser | null {
    const admin = MOCK_ADMINS[email]
    if (!admin) return null

    const updated = { ...admin, ...updates, email }
    MOCK_ADMINS[email] = updated
    return updated
}

/**
 * Deleta admin
 */
export function deleteAdmin(email: string): boolean {
    if (MOCK_ADMINS[email]) {
        delete MOCK_ADMINS[email]
        return true
    }
    return false
}
