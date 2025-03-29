'use server'

import { UserDto } from "@/definitions/user.definition";
import { UserMapper } from "@/mappers/user.mapper";
import { createUserSql } from "@/repositories/user.repository";
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