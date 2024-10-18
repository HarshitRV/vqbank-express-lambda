import Paper from "../../models/paper";
import { Request, Response } from "express";
import MongoDatabase from "../../db/MongoDatabase";

export const getAllPapers = async (req: Request, res: Response) => {
    const papers = await Paper.find({}).select("-__v -buffer")

    const db: MongoDatabase = req['db'];
    await db.disconnect();

    res.status(200).json({
        papers
    })
}