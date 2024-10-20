import { Request, Response, NextFunction } from "express";
import GetSecrets from "../../../utils/getSecrets";
import { SECRET_NAME, REGION } from "../../../constants";
import { EXTENDED_REQ_PROPS } from "../types";

export async function accessSecrets(req: Request, _res: Response, next: NextFunction) {
    const getSecrets = new GetSecrets(SECRET_NAME, REGION);

    const secrets = await getSecrets.secrets();

    req[EXTENDED_REQ_PROPS.SECRETS] = secrets;

    next();
}