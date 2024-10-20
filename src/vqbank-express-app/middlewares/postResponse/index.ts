import { Request, Response, NextFunction } from "express";
import MongoDatabase from "../../db/MongoDatabase";

export async function postResponseListener(req: Request, res: Response, next: NextFunction) {
    res.on("finish", async () => {
        const db: MongoDatabase = req['db'];
        await db.disconnect();
    })

    next();
}