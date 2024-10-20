import { Request, Response } from "express";
import { Secrets } from "../../../utils/types";
import { AUTH_CONTROLLER_ERRORS, UserAuthRequestBody, UserAuthSuccessResponse, userAuthSchema } from "./types";
import { AppError } from "../../utils/server";
import User from "../../models/user";
import { IUser } from "../../models/user/types";
import JWT from "../../utils/auth/jwt";
import { STATUS_CODES } from "../../utils/server/types";
import { EXTENDED_REQ_PROPS } from "../../middlewares/types";
import mongoose from "mongoose";

export default class AuthController {
    private validateRequest = (req: Request): UserAuthRequestBody => {
        const { error, value } = userAuthSchema.validate(req.body);

        if (error) {
            throw new AppError(error.message, 400);
        }

        return value as UserAuthRequestBody;
    }

    private getJWTSecret = (req: Request): string => {
        const { JWT_SECRET }: Secrets = req[EXTENDED_REQ_PROPS.SECRETS];
        return JWT_SECRET;
    }

    private createAuthToken = (jwt: JWT, userId: string): string => {
        return jwt.create(userId);
    }

    private createSuccessResponse = (authToken: string): UserAuthSuccessResponse => {
        return { authToken };
    }

    private findUserByEmail = async (email: string): Promise<(mongoose.Document<unknown, {}, IUser> & IUser & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }) | null> => {
        return await User.findOne({ email });
    }

    public registerUser = async (req: Request, res: Response) => {
        const { email, password } = this.validateRequest(req);

        const existingUser = await this.findUserByEmail(email);

        if (existingUser) {
            throw new AppError(AUTH_CONTROLLER_ERRORS.EXISTING_USER, 400);
        }

        const newUser = new User({ email, password });
        await newUser.save();

        const jwt = new JWT(this.getJWTSecret(req));
        const authToken = this.createAuthToken(jwt, newUser.id);

        res.status(STATUS_CODES.CREATED).json(this.createSuccessResponse(authToken));
    }

    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = this.validateRequest(req);

        const existingUser = await this.findUserByEmail(email);

        if (!existingUser) {
            throw new AppError(AUTH_CONTROLLER_ERRORS.NON_EXISTING_USER, 400);
        }

        const isCorrectPassword = existingUser.checkPassword(password);

        if (!isCorrectPassword) {
            throw new AppError(AUTH_CONTROLLER_ERRORS.INCORRECT_CREDENTIALS, 400);
        }

        const jwt = new JWT(this.getJWTSecret(req));
        const authToken = this.createAuthToken(jwt, existingUser.id);

        res.status(STATUS_CODES.CREATED).json(this.createSuccessResponse(authToken));
    }
}