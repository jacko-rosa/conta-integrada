import jwt from "jsonwebtoken";
import { ApiError } from "next/dist/server/api-utils";
import { throwError } from "./util";

export function handleError(error: unknown, CLAZZ: string, METHOD: string) {
    if (error instanceof ApiError) {
        return throwError(error, CLAZZ, METHOD);
    }
    if (error instanceof jwt.TokenExpiredError) {
        const errorTyped = new ApiError(401, 'Unauthorized: Expired credentials');
        return throwError(errorTyped, CLAZZ, METHOD);
    }
    if (error instanceof jwt.JsonWebTokenError) {
        const errorTyped = new ApiError(401, 'Unauthorized: Invalid token');
        return throwError(errorTyped, CLAZZ, METHOD);
    }
    const errorTyped = new ApiError(500, `Internal Error: Error to ${METHOD}`);
    return throwError(errorTyped, CLAZZ, METHOD);
}