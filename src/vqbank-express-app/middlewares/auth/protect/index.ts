import { Request, Response, NextFunction } from "express";
import { IUser } from "../../../models/user/types";
import { AppError } from "../../../utils/server";
import { Secrets } from "../../../../utils/types";
import User from "../../../models/user";
import JWT from "../../../utils/auth/jwt";

export default async function protect(req: Request, res: Response, next: NextFunction) {
    const { JWT_SECRET }: Secrets = req['secrets'];

    const token = req.headers.authorization;

    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    const jwt = new JWT(JWT_SECRET);

    const { userId } = await jwt.verify(token);

    const user: IUser | null = await User.findById(userId);

    if (!user) {
        throw new AppError("Unauthorized", 401);
    }

    req['user'] = user;

    next();
}