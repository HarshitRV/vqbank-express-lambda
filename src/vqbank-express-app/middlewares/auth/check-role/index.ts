import { Roles } from "../../../models/user/types";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../../../models/user/types";
import { AppError } from "../../../utils/server";
import { RequestHandler } from "../../../utils/server/types";

export default function checkRole(role: Roles): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
        const user: IUser = req['user'];

        if (!user) {
            throw new AppError("Unauthorized", 401);
        }

        const hasRole = user.role === role;

        if (!hasRole) {
            throw new AppError("Unauthorized", 401);
        }

        next();
    }
}