import MongoDatabase from "../../db/MongoDatabase";
import Paper from "../../models/paper";
import { Request, Response } from "express";
import { AppError } from "../../utils/server";

export default class PaperController {
    public getAllPapers = async (_req: Request, res: Response) => {
        const papers = await Paper.find({}).select("-__v -buffer")

        res.status(200).json({
            papers
        })
    }
}