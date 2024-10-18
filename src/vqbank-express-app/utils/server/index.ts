import { Request, Response, NextFunction } from "express";
import { AsyncHandler } from "./types";

export const handleAsyncError = (f: AsyncHandler) => {
    return function (req: Request, res: Response, next: NextFunction) {
        f(req, res, next).catch(e => next(e));
    }
}
