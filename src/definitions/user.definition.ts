export interface UserDto {
    id?: string;
    name: string;
    lastName: string;
    document: string; // CPF/CNPJ
    email: string;
    password: string;
}