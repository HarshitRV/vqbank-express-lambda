import { Router } from "express";
import { registerUser } from "../../controllers/auth";
import { AuthRoutes } from "./types";
import { attachSecretsAndDatabase } from "../../middlewares/utils";

const authRouter: Router = Router();

authRouter.route<AuthRoutes>('/auth/register').post(...attachSecretsAndDatabase(registerUser));

export default authRouter;
