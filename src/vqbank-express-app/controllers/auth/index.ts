import { Request, Response } from "express";
import { Secrets } from "../../../utils/types";
import { UserRegisterRequestBody, UserRegisterResponseBody, userRegisterSchema } from "./types";
import { AppError } from "../../utils/server";
import User from "../../models/user";
import JWT from "../../utils/auth/jwt";
import { STATUS_CODES } from "../../utils/server/types";
import MongoDatabase from "../../db/MongoDatabase";
import Paper from "../../models/paper";

export async function registerUser(req: Request, res: Response) {
    const { JWT_SECRET }: Secrets = req['secrets'];
    const db: MongoDatabase = req['db'];

    const { error, value } = userRegisterSchema.validate(req.body);

    if (error) {
        throw new AppError(error.message, 400);
    }

    const { email, password } = value as UserRegisterRequestBody;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("user already exists", 400);
    }

    const newUser = new User({
        email,
        password
    });

    const jwt = new JWT(JWT_SECRET);
    const authToken = jwt.create(newUser.id);

    await newUser.save();

    const response: UserRegisterResponseBody = {
        authToken
    };

    db.disconnect();

    res.status(STATUS_CODES.CREATED).json(response);
}