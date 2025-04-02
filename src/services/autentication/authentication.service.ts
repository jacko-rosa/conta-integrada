'use server'

import { UserDto } from "@/definitions/user.definition";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";
import jwt from 'jsonwebtoken';
import { ApiError } from "next/dist/server/api-utils";
import { createUser, getUserByDocument } from "../user/user.service";

const CLAZZ = 'AuthenticationService';

export async function signUp(dto: UserDto): Promise<string> {
    const METHOD = 'signUp';
    logInit(CLAZZ, METHOD, dto);
    try {
        const user = await createUser(dto);
        const token = siginjwt(user)
        logEnd(CLAZZ, METHOD, { token });
        return Promise.resolve(token);
    } catch (error) {
        return handleError(error, CLAZZ, METHOD)
    }
}

export async function signIn(req: UserDto): Promise<string> {
    const METHOD = 'signIn';
    logInit(CLAZZ, METHOD, req);
    try {
        const user = await getUserByDocument(req.document);
        if (user.password !== req.password) {
            throw new ApiError(401, 'Unauthorized: Invalid credentials');
        }
        const token = siginjwt(user)
        logEnd(CLAZZ, METHOD, { token });
        return Promise.resolve(token);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }

}

export async function veryfy(token?: string): Promise<string> {
    const METHOD = 'veryfy';
    logInit(CLAZZ, METHOD, { token });
    try {
        if (!token) {
            throw new ApiError(400, 'Bad Request: token required');
        }
        const decoded = jwt.decode(token);
        if (decoded !== null && typeof decoded === 'object') {
            if (!decoded.exp) {
                throw {} as jwt.TokenExpiredError;
            }
        }

        const verified = jwt.verify(token, process.env.AUTH_SECRET!);
        logEnd(CLAZZ, METHOD, { verified });
        return Promise.resolve(token);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}

function siginjwt(user: UserDto) {
    const payload = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        document: user.document
    };
    const options = {
        expiresIn: '1h'
    } as jwt.SignOptions;

    return jwt.sign(payload, process.env.AUTH_SECRET!, options);
}