import { Request, Response, NextFunction } from "express";
import { IUser } from "../../../models/user/types";
import { AppError } from "../../../utils/server";
import { Secrets } from "../../../../utils/types";
import User from "../../../models/user";
import JWT from "../../../utils/auth/jwt";
import { EXTENDED_REQ_PROPS } from "../../types";

export default async function protect(req: Request, res: Response, next: NextFunction) {
    const { JWT_SECRET }: Secrets = req[EXTENDED_REQ_PROPS.SECRETS];

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    const jwt = new JWT(JWT_SECRET);

    const { userId } = await jwt.verify(token);

    const user: IUser | null = await User.findById(userId);

    if (!user) {
        throw new AppError("Unauthorized", 401);
    }

    req[EXTENDED_REQ_PROPS.USER] = user;

    next();
}