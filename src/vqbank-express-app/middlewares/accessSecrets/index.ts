import { Request, Response, NextFunction } from "express";
import GetSecrets from "../../../utils/getSecrets";
import { SECRET_NAME, REGION } from "../../../constants";

export async function accessSecrets(req: Request, res: Response, next: NextFunction) {
    const getSecrets = new GetSecrets(SECRET_NAME, REGION);

    const secrets = await getSecrets.secrets();

    req['secrets'] = secrets;

    next();
}