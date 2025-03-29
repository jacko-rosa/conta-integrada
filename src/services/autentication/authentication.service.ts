'use server'

import { UserDto } from "@/definitions/user.definition";
import { UserMapper } from "@/mappers/user.mapper";
import { createUserSql } from "@/repositories/user.repository";
import { logEnd, logInit, throwError } from "@/utils/util";
import crypto from 'crypto';

const CLAZZ = 'AuthenticationService';

async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(10).toString('hex');
        crypto.scrypt(password, salt, 30, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash.toString('hex'));
        });
    });
}

export async function signUp(dto: UserDto): Promise<UserDto> {
    const METHOD = 'signUp';
    try {
        logInit(CLAZZ, METHOD, dto);
        //todo validation        
        dto.password = await hashPassword(dto.password);
        const domain = UserMapper.dtoToDomain(dto);
        const response = await createUserSql(domain);
        dto.id = response.id;
        logEnd(CLAZZ, METHOD, response);
        return dto;
    } catch (error) {
        return throwError(error as Error, CLAZZ, METHOD)
    }
}