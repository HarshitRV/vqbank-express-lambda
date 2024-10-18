export const PAPER_ROUTES = {
    GET_PAPERS: '/papers',
    GET_PAPER: '/papers/:paperId',
} as const;

export type PaperRoutes = typeof PAPER_ROUTES[keyof typeof PAPER_ROUTES];