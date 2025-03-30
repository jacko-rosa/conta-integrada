'use server'

import { UserDto } from "@/definitions/user.definition";
import { UserMapper } from "@/mappers/user.mapper";
import { createUserSql, getUserSqlByDocument } from "@/repositories/user.repository";
import { logEnd, logInit } from "@/utils/util";

const CLAZZ = 'UserService';

export async function createUser(dto: UserDto): Promise<UserDto> {
    const METHOD = 'createUser';
    logInit(CLAZZ, METHOD, dto);
    //todo validation        
    const domain = UserMapper.dtoToDomain(dto);
    const response = await createUserSql(domain);
    dto.id = response.id;
    logEnd(CLAZZ, METHOD, response);
    return dto;
}

export async function getUserByDocument(document: string): Promise<UserDto> {
    const METHOD = 'getUserByDocument';
    logInit(CLAZZ, METHOD, { document });
    // todo validation
    const domain = await getUserSqlByDocument(document);
    const response = UserMapper.domainToDto(domain);
    logEnd(CLAZZ, METHOD, response);
    return response;
}