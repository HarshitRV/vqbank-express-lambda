export const APP_ROUTES = {
    V1: '/api/v1',
} as const;

export type AppRoutes = typeof APP_ROUTES[keyof typeof APP_ROUTES];