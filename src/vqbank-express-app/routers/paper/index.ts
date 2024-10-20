import { Router } from "express";
import { PaperRoutes } from "./types";
import PaperController from "../../controllers/paper";
import { attachSecretsAndDatabase } from "../../middlewares/utils";

const paperRouter: Router = Router();
const paperController = new PaperController();

paperRouter.route<PaperRoutes>('/papers').get(...attachSecretsAndDatabase(paperController.getAllPapers));

export default paperRouter;