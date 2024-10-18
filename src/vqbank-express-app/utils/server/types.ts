import { Request, Response, NextFunction } from "express";

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

export const STATUS_CODES = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401
} as const;

export type StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];