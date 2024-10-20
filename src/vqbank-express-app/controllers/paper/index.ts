import Paper from "../../models/paper";
import { Request, Response } from "express";

export default class PaperController {
    public getAllPapers = async (_req: Request, res: Response) => {
        const papers = await Paper.find({}).select("-__v -buffer")

        res.status(200).json({
            papers
        })
    }
}