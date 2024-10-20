import { Router } from "express";
import { PaperRoutes } from "./types";
import { getAllPapers } from "../../controllers/paper";
import { attachSecretsAndDatabase } from "../../middlewares/utils";

const paperRouter: Router = Router();

paperRouter.route<PaperRoutes>('/papers').get(...attachSecretsAndDatabase(getAllPapers));

export default paperRouter;