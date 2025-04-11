import jwt from "jsonwebtoken";
import { ApiError } from "next/dist/server/api-utils";
import { throwError } from "./util";

export function handleError(error: unknown, CLAZZ: string, METHOD: string) {
    if (error instanceof ApiError) {
        return throwError(error, CLAZZ, METHOD);
    }
    if (error instanceof jwt.TokenExpiredError) {
        const errorTyped = { statusCode: 401, message: 'Unauthorized: Expired credentials' } as ApiError;
        return throwError(errorTyped, CLAZZ, METHOD);
    }
    if (error instanceof jwt.JsonWebTokenError) {
        const errorTyped = { statusCode: 401, message: 'Unauthorized: Invalid token' } as ApiError;
        return throwError(errorTyped, CLAZZ, METHOD);
    }
    const errorTyped = { statusCode: 500, message: `Internal Error: Error to ${METHOD}` } as ApiError;
    return throwError(errorTyped, CLAZZ, METHOD);
}