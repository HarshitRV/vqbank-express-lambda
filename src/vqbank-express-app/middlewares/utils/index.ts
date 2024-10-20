import { wrapAsyncHandler } from "../../utils/server";
import { dbConnection } from "../db";
import { accessSecrets } from "../accessSecrets";
import { AsyncHandler, RequestHandler } from "../../utils/server/types";

/** Attaches accessSecrets and dbConnection middlewares */
export function attachSecretsAndDatabase(middleware: AsyncHandler): RequestHandler[] {
    return wrapAsyncHandler(accessSecrets, dbConnection, middleware);
}