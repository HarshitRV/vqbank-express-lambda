import { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
    userId: string;
}

export const JWT_EXPIRY = {
    ONE_DAY: "1d",
    ONE_WEEK: "7d",
    ONE_MONTH: "30d",
    ONE_YEAR: "365d"
} as const;

export type jwtExpiry = typeof JWT_EXPIRY[keyof typeof JWT_EXPIRY];