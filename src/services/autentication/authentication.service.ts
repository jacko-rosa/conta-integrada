'use server'

import { UserDto } from "@/definitions/user.definition";
import { logEnd, logInit, throwError } from "@/utils/util";
import jwt from 'jsonwebtoken';
import { createUser, getUserByDocument } from "../user/user.service";

const CLAZZ = 'AuthenticationService';

export async function signUp(dto: UserDto): Promise<string> {
    const METHOD = 'signUp';
    logInit(CLAZZ, METHOD, dto);
    const user = await createUser(dto);
    const payload = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        document: user.document
    }
    const token = jwt.sign(payload, process.env.AUTH_SECRET!);
    logEnd(CLAZZ, METHOD, { token });
    return Promise.resolve(token);
}

export async function signIn(req: UserDto): Promise<string> {
    const METHOD = 'signIn';
    logInit(CLAZZ, METHOD, req);
    const user = await getUserByDocument(req.document);
    if (user.password !== req.password) {
        const error = new Error('Unauthorized: Invalid credentials');
        (error as any).status = 401;
        return throwError(error, CLAZZ, METHOD);
    }
    const payload = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        document: user.document
    }
    const token = jwt.sign(payload, process.env.AUTH_SECRET!);
    logEnd(CLAZZ, METHOD, { token });
    return Promise.resolve(token);
}