import { Router } from "express";
import { PaperRoutes } from "./types";
import PaperController from "../../controllers/paper";
import { attachSecretsAndDatabase } from "../../middlewares/utils";
import protect from "../../middlewares/auth/protect";
import { handleAsyncError, wrapAsyncHandler } from "../../utils/server";

const paperRouter: Router = Router();
const paperController = new PaperController();

paperRouter.route<PaperRoutes>('/papers').get(...attachSecretsAndDatabase(protect, paperController.getAllPapers));

export default paperRouter;