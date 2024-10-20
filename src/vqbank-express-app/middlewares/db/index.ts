import { Request, Response, NextFunction } from "express";
import MongoDatabase from "../../db/MongoDatabase";
import { Secrets } from "../../../utils/types";
import { EXTENDED_REQ_PROPS } from "../types";


export async function dbConnection(req: Request, res: Response, next: NextFunction) {
    const secrets: Secrets = req[EXTENDED_REQ_PROPS.SECRETS];

    const db = new MongoDatabase(secrets.MONGODB_URI);

    await db.connect();

    req[EXTENDED_REQ_PROPS.DB] = db;

    next();
}