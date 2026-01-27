/**
 * Serviço de Autenticação Admin
 * FASE 7: Sistema de Autenticação e Controle de Acesso
 * 
 * Status: Desenvolvimento
 * Mock Implementation - Será substituído por Supabase em FASE 8
 */

/**
 * Tipos de Dados
 */
export type AdminRole = 'admin' | 'manager' | 'seller'
export type AdminResource = 'dashboard' | 'orders' | 'products' | 'customers' | 'marketing' | 'settings'
export type AdminAction = 'view' | 'create' | 'edit' | 'delete'

export interface AdminPermission {
    resource: AdminResource
    action: AdminAction
}

export interface AdminUser {
    id: string
    email: string
    name: string
    role: AdminRole
    permissions: AdminPermission[]
    createdAt: string
    lastLogin: string | null
    isActive: boolean
    twoFactorEnabled: boolean
}

export interface AdminSession {
    token: string
    user: AdminUser
    expiresAt: number
    refreshToken?: string
}

export interface LoginCredentials {
    email: string
    password: string
}

/**
 * Mock Data - Desenvolvimento
 * Em produção, vem do Supabase Auth
 */
const MOCK_ADMIN_CREDENTIALS = {
    email: 'admin@hnkfood.com.br',
    password: 'Admin@123456'
}

const MOCK_ADMINS: AdminUser[] = [
    {
        id: '1',
        email: 'admin@hnkfood.com.br',
        name: 'Administrador HNK',
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
            { resource: 'customers', action: 'edit' },
            { resource: 'marketing', action: 'view' },
            { resource: 'marketing', action: 'create' },
            { resource: 'marketing', action: 'edit' },
            { resource: 'settings', action: 'view' },
            { resource: 'settings', action: 'edit' }
        ],
        createdAt: '2025-01-01T00:00:00Z',
        lastLogin: '2025-01-27T15:00:00Z',
        isActive: true,
        twoFactorEnabled: false
    },
    {
        id: '2',
        email: 'manager@hnkfood.com.br',
        name: 'Gerente HNK',
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
        createdAt: '2025-01-10T00:00:00Z',
        lastLogin: '2025-01-27T14:30:00Z',
        isActive: true,
        twoFactorEnabled: false
    }
]

/**
 * Constantes
 */
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 horas em ms
const TOKEN_KEY = 'admin_token'
const USER_KEY = 'admin_user'
const SESSION_KEY = 'admin_session'

/**
 * Autenticação
 */

/**
 * Login Admin
 * @param email Email do admin
 * @param password Senha do admin
 * @returns Sessão do admin ou null se falhar
 */
export async function adminLogin(
    credentials: LoginCredentials
): Promise<AdminSession | null> {
    // Validar entrada
    if (!credentials.email || !credentials.password) {
        console.error('Email e senha são obrigatórios')
        return null
    }

    // Mock: Validar contra credenciais mock
    const isValid =
        credentials.email === MOCK_ADMIN_CREDENTIALS.email &&
        credentials.password === MOCK_ADMIN_CREDENTIALS.password

    if (!isValid) {
        console.warn(`Falha de login para email: ${credentials.email}`)
        return null
    }

    // Buscar usuário mock
    const user = MOCK_ADMINS[0] // Admin principal

    if (!user.isActive) {
        console.error('Usuário inativo')
        return null
    }

    // Gerar token
    const token = generateToken(user.email)
    const expiresAt = Date.now() + SESSION_DURATION

    // Criar sessão
    const session: AdminSession = {
        token,
        user: {
            ...user,
            lastLogin: new Date().toISOString()
        },
        expiresAt,
        refreshToken: generateToken(`refresh:${user.email}`)
    }

    // Persistir na sessão client
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify(session.user))
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))

        // Também guardar em cookie para middleware
        // Em Next.js, usar document.cookie ou API route para setar cookies HTTP-only
    }

    return session
}

/**
 * Logout Admin
 */
export function adminLogout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(SESSION_KEY)
    }

    // Cookie será removido no servidor via Set-Cookie
}

/**
 * Obter Sessão Atual
 * @returns Sessão valida ou null
 */
export function getCurrentSession(): AdminSession | null {
    if (typeof window === 'undefined') return null

    try {
        const sessionData = localStorage.getItem(SESSION_KEY)
        if (!sessionData) return null

        const session: AdminSession = JSON.parse(sessionData)

        // Validar expiração
        if (Date.now() > session.expiresAt) {
            adminLogout()
            return null
        }

        return session
    } catch (error) {
        console.error('Erro ao obter sessão:', error)
        return null
    }
}

/**
 * Obter Usuário Atual
 */
export function getCurrentUser(): AdminUser | null {
    if (typeof window === 'undefined') return null

    try {
        const userData = localStorage.getItem(USER_KEY)
        return userData ? JSON.parse(userData) : null
    } catch (error) {
        console.error('Erro ao obter usuário:', error)
        return null
    }
}

/**
 * Validar se usuário tem permissão
 */
export function hasPermission(
    user: AdminUser | null,
    resource: AdminResource,
    action: AdminAction
): boolean {
    if (!user) return false

    // Admin tem acesso a tudo
    if (user.role === 'admin') {
        return true
    }

    // Verificar permissões específicas
    return user.permissions.some(
        p => p.resource === resource && p.action === action
    )
}

/**
 * Validar se usuário pode acessar recurso
 */
export function canAccessResource(
    user: AdminUser | null,
    resource: AdminResource
): boolean {
    if (!user) return false
    if (user.role === 'admin') return true

    return user.permissions.some(p => p.resource === resource)
}

/**
 * Utilitários
 */

/**
 * Gerar Token (Mock)
 * AVISO: Isso é apenas para desenvolvimento
 * Em produção, usar JWT com RS256 ou outro algoritmo seguro
 */
function generateToken(email: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const combined = `${email}:${timestamp}:${random}`

    // Simples base64 encoding (NÃO é seguro para produção)
    return Buffer.from(combined).toString('base64')
}

/**
 * Validar Token
 */
export function validateToken(token: string): boolean {
    try {
        if (!token) return false

        // Decodificar base64
        const decoded = Buffer.from(token, 'base64').toString('utf-8')
        const parts = decoded.split(':')

        if (parts.length !== 3) return false

        // Verificar se timestamp é válido (não expirou)
        const timestamp = parseInt(parts[1], 10)
        const isExpired = Date.now() - timestamp > SESSION_DURATION

        return !isExpired
    } catch (error) {
        console.error('Erro ao validar token:', error)
        return false
    }
}

/**
 * Gerenciamento de Admins (Mock)
 * Em produção, usar Supabase Auth Admin API
 */

/**
 * Listar todos os admins
 */
export function getAdminsList(): AdminUser[] {
    return [...MOCK_ADMINS]
}

/**
 * Criar novo admin
 */
export function createAdmin(userData: {
    email: string
    name: string
    role: AdminRole
}): AdminUser | null {
    // Validações
    if (!userData.email || !userData.name || !userData.role) {
        return null
    }

    // Verificar duplicatas
    if (MOCK_ADMINS.some(a => a.email === userData.email)) {
        console.error('Email já existe')
        return null
    }

    // Criar novo admin
    const newAdmin: AdminUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        permissions: getDefaultPermissions(userData.role),
        createdAt: new Date().toISOString(),
        lastLogin: null,
        isActive: true,
        twoFactorEnabled: false
    }

    MOCK_ADMINS.push(newAdmin)
    return newAdmin
}

/**
 * Atualizar admin existente
 */
export function updateAdmin(
    email: string,
    updates: Partial<AdminUser>
): AdminUser | null {
    const admin = MOCK_ADMINS.find(a => a.email === email)
    if (!admin) return null

    // Atualizar campos permitidos
    if (updates.name) admin.name = updates.name
    if (updates.isActive !== undefined) admin.isActive = updates.isActive
    if (updates.role) admin.role = updates.role
    if (updates.permissions) admin.permissions = updates.permissions

    return admin
}

/**
 * Deletar admin
 */
export function deleteAdmin(email: string): boolean {
    const index = MOCK_ADMINS.findIndex(a => a.email === email)
    if (index === -1) return false

    MOCK_ADMINS.splice(index, 1)
    return true
}

/**
 * Helpers
 */

/**
 * Obter permissões padrão por role
 */
function getDefaultPermissions(role: AdminRole): AdminPermission[] {
    const allPermissions: AdminPermission[] = [
        { resource: 'dashboard', action: 'view' },
        { resource: 'orders', action: 'view' },
        { resource: 'orders', action: 'edit' },
        { resource: 'products', action: 'view' },
        { resource: 'products', action: 'create' },
        { resource: 'products', action: 'edit' },
        { resource: 'products', action: 'delete' },
        { resource: 'customers', action: 'view' },
        { resource: 'customers', action: 'edit' },
        { resource: 'marketing', action: 'view' },
        { resource: 'marketing', action: 'create' },
        { resource: 'marketing', action: 'edit' },
        { resource: 'settings', action: 'view' },
        { resource: 'settings', action: 'edit' }
    ]

    const managerPermissions: AdminPermission[] = [
        { resource: 'dashboard', action: 'view' },
        { resource: 'orders', action: 'view' },
        { resource: 'orders', action: 'edit' },
        { resource: 'products', action: 'view' },
        { resource: 'products', action: 'edit' },
        { resource: 'customers', action: 'view' },
        { resource: 'marketing', action: 'view' }
    ]

    const sellerPermissions: AdminPermission[] = [
        { resource: 'dashboard', action: 'view' },
        { resource: 'products', action: 'view' },
        { resource: 'products', action: 'edit' }
    ]

    switch (role) {
        case 'admin':
            return allPermissions
        case 'manager':
            return managerPermissions
        case 'seller':
            return sellerPermissions
        default:
            return []
    }
}

/**
 * Obter descrição legível de permissão
 */
export function getPermissionLabel(resource: AdminResource, action: AdminAction): string {
    const labels: Record<`${AdminResource}:${AdminAction}`, string> = {
        'dashboard:view': 'Visualizar Dashboard',
        'orders:view': 'Visualizar Pedidos',
        'orders:create': 'Criar Pedidos',
        'orders:edit': 'Editar Pedidos',
        'orders:delete': 'Deletar Pedidos',
        'products:view': 'Visualizar Produtos',
        'products:create': 'Criar Produtos',
        'products:edit': 'Editar Produtos',
        'products:delete': 'Deletar Produtos',
        'customers:view': 'Visualizar Clientes',
        'customers:create': 'Criar Clientes',
        'customers:edit': 'Editar Clientes',
        'customers:delete': 'Deletar Clientes',
        'marketing:view': 'Visualizar Marketing',
        'marketing:create': 'Criar Campanhas',
        'marketing:edit': 'Editar Campanhas',
        'marketing:delete': 'Deletar Campanhas',
        'settings:view': 'Visualizar Configurações',
        'settings:create': 'Criar Configurações',
        'settings:edit': 'Editar Configurações',
        'settings:delete': 'Deletar Configurações'
    }

    return labels[`${resource}:${action}`] || `${action} ${resource}`
}
