'use server'

import { UserDto } from "@/definitions/user.definition";
import { logEnd, logInit } from "@/utils/util";
import jwt from 'jsonwebtoken';
import { createUser } from "../user/user.service";

const CLAZZ = 'AuthenticationService';

export async function signUp(dto: UserDto): Promise<string> {
    const METHOD = 'signUp';
    logInit(CLAZZ, METHOD, dto);
    const response = await createUser(dto);
    const payload = {
        id: response.id,
        name: response.name,
        lastName: response.lastName,
        document: response.document
    }
    const token = jwt.sign(payload, process.env.AUTH_SECRET!);
    logEnd(CLAZZ, METHOD, { token });
    return Promise.resolve(token);
}