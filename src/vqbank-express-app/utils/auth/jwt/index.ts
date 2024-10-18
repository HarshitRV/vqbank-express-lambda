import jwt, { VerifyErrors } from "jsonwebtoken";
import { jwtExpiry, TokenPayload } from "./types";

/** Generates a JSON Web Token (JWT) for a given user ID */
export function createJwt(userId: string, jwtSecret: string, jwtExpiry: jwtExpiry = "1d"): string {
    return jwt.sign({
        userId
    }, jwtSecret, {
        expiresIn: jwtExpiry
    })
}

/**
 * Verifies a JSON Web Token (JWT) using the given secret and returns a promise
 * that resolves with the token payload if the token is valid.

 * @throws {VerifyErrors} VerifyErrors if the token is invalid or verification fails.
 */
export function verifyJwt(token: string, jwtSecret: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, payload) => {
            if (err) return reject(err);
            resolve(payload as TokenPayload);
        });
    });
};