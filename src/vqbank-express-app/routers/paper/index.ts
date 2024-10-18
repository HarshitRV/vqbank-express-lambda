import { Router } from "express";
import { PaperRoutes } from "./types";
import { getAllPapers } from "../../controllers/paper";
import { wrapAsyncHandler } from "../../utils/server";
import { accessSecrets } from "../../middlewares/accessSecrets";
import { dbConnection } from "../../middlewares/db";

const paperRouter: Router = Router();

paperRouter.route<PaperRoutes>('/papers').get(...wrapAsyncHandler(accessSecrets, dbConnection, getAllPapers));

export default paperRouter;