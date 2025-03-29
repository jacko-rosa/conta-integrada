'use server'

import { UserDto } from "@/definitions/user.definition";
import { logEnd, logInit } from "@/utils/util";
import { createUser } from "../user/user.service";

const CLAZZ = 'AuthenticationService';

export async function signUp(dto: UserDto): Promise<UserDto> {
    const METHOD = 'signUp';
    logInit(CLAZZ, METHOD, dto);
    //todo validation        
    const response = await createUser(dto);
    logEnd(CLAZZ, METHOD, response);
    return dto;
}