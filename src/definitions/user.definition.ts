import { BaseTable } from "./util.definition";

export interface UserDto {
    id?: string;
    name: string;
    lastName: string;
    document: string; // CPF/CNPJ
    email: string;
    password: string;
}

export interface UserDomain extends BaseTable {
    name: string;
    last_name: string;
    email: string;
    document: string;
    password: string;
}