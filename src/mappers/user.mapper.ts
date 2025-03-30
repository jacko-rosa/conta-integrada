import { UserDomain, UserDto } from "@/definitions/user.definition";
import SHA256 from 'crypto-js/sha256';

const CLAZZ = 'UserMapper';

function formToDto(form: FormData): UserDto {
    const name = String(form.get('name') || null);
    const lastName = String(form.get('lastName') || null);
    const email = String(form.get('email') || null);
    const document = String(form.get('document') || null);
    const password = String(form.get('password') || null);

    const hashedPassword = SHA256(password).toString();
    const dto: UserDto = {
        name,
        lastName,
        email,
        document,
        password: hashedPassword
    };
    return dto;
}

function dtoToDomain(dto: UserDto): UserDomain {
    const domain = {
        name: dto.name,
        last_name: dto.lastName,
        email: dto.email,
        document: dto.document,
        password: dto.password,
        id: dto.id
    } as UserDomain;
    return domain;
}

function domainToDto(domain: UserDomain): UserDto {
    const dto = {
        name: domain.name,
        lastName: domain.last_name,
        email: domain.email,
        document: domain.document,
        password: domain.password,
        id: domain.id
    } as UserDto;
    return dto;
}

export const UserMapper = {
    formToDto,
    dtoToDomain,
    domainToDto
}