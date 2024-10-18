import { Request, Response, NextFunction } from "express";
import MongoDatabase from "../../db/MongoDatabase";
import { Secrets } from "../../../utils/types";


export async function dbConnection(req: Request, res: Response, next: NextFunction) {
    const secrets: Secrets = req['secrets'];

    const db = new MongoDatabase(secrets.MONGODB_URI);

    await db.connect();

    req['db'] = db;
    
    next();
}