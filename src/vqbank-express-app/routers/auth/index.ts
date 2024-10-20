import { Router } from "express";
import { AuthRoutes } from "./types";
import { attachSecretsAndDatabase } from "../../middlewares/utils";
import AuthController from "../../controllers/auth";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.route<AuthRoutes>('/auth/register').post(...attachSecretsAndDatabase(authController.registerUser));
authRouter.route<AuthRoutes>('/auth/login').post(...attachSecretsAndDatabase(authController.loginUser));

export default authRouter;
