export const EXTENDED_REQ_PROPS = {
    SECRETS: 'secrets',
    DB: 'db',
    USER: 'user'
} as const

export type ExtendedReqProps = typeof EXTENDED_REQ_PROPS[keyof typeof EXTENDED_REQ_PROPS];