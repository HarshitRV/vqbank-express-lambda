import { Router } from "express";
import { PaperRoutes } from "./types";
import { getAllPapers } from "../../controllers/paper";
import { handleAsyncError } from "../../utils/server";
import { accessSecrets } from "../../middlewares/accessSecrets";
import { dbConnection } from "../../middlewares/db";

const paperRouter: Router = Router();

paperRouter.route<PaperRoutes>('/papers').get(
    handleAsyncError(accessSecrets),
    handleAsyncError(dbConnection),
    handleAsyncError(getAllPapers)
);

export default paperRouter;