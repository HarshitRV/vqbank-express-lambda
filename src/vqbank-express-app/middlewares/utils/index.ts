import { wrapAsyncHandler } from "../../utils/server";
import { dbConnection } from "../db";
import { accessSecrets } from "../accessSecrets";
import { AsyncHandler, RequestHandler } from "../../utils/server/types";
import { postResponseListener } from "../postResponse";

/**
 * Combines middleware functions to handle secrets access, database connection,
 * response post-processing, and additional custom middleware. Wraps each with
 * error handling to ensure all asynchronous operations are managed properly.
 * 
 * @param middleware - An array of asynchronous middleware functions to apply.
 * @returns An array of request handlers with attached middleware functions.
 */
export function attachSecretsAndDatabase(...middleware: AsyncHandler[]): RequestHandler[] {
    return wrapAsyncHandler(accessSecrets, dbConnection, postResponseListener, ...middleware);
}