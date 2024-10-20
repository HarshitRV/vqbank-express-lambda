export const AUTH_ROUTES = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
} as const

export type AuthRoutes = typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES];