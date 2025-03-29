import { UserDomain, UserDto } from "@/definitions/user.definition";
import { logEnd, logInit } from "@/utils/util";
import SHA256 from 'crypto-js/sha256';

const CLAZZ = 'UserMapper';

function formToDto(form: FormData): UserDto {
    const METHOD = 'formDataToUserDto';
    logInit(CLAZZ, METHOD);
    const name = String(form.get('name')!);
    const lastName = String(form.get('lastName')!);
    const email = String(form.get('email')!);
    const document = String(form.get('document')!);
    const password = String(form.get('password')!);

    const hashedPassword = SHA256(password).toString();
    const dto: UserDto = {
        name,
        lastName,
        email,
        document,
        password: hashedPassword
    };
    logEnd(CLAZZ, METHOD);
    return dto;
}

function dtoToDomain(dto: UserDto): UserDomain {
    const METHOD = 'dtoToDomain';
    logInit(CLAZZ, METHOD);
    const domain = {
        name: dto.name,
        last_name: dto.lastName,
        email: dto.email,
        document: dto.document,
        password: dto.password,
        id: dto.id
    } as UserDomain;
    logEnd(CLAZZ, METHOD);
    return domain;
}

export const UserMapper = {
    formToDto,
    dtoToDomain
}