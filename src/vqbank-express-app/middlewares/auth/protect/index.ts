import { Request, Response, NextFunction } from "express";
import { IUser } from "../../../models/user/types";
import { AppError } from "../../../utils/server";
import jwt from "jsonwebtoken";
import { Secrets } from "../../../../utils/types";
import User from "../../../models/user";
import { verifyJwt } from "../../../utils/auth/jwt";

export default async function protect(req: Request, res: Response, next: NextFunction) {
    const { JWT_SECRET }: Secrets = req['secrets'];

    const token = req.headers.authorization;

    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    const decoded = await verifyJwt(token, JWT_SECRET);

    const user: IUser | null = await User.findById(decoded.userId);

    if (!user) {
        throw new AppError("Unauthorized", 401);
    }

    req['user'] = user;

    next();
}