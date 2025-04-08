import { AccountDto } from "@/definitions/account.definition";

function formToDto(form: FormData): AccountDto {
    const compeCode = String(form.get('compeCode') || '');
    const branchCode = String(form.get('branchCode') || '');
    const accountNumber = String(form.get('accountNumber') || '');
    const digit = String(form.get('digit') || '');

    const dto: AccountDto = {
        document: '',
        compeCode,
        branchCode,
        accountNumber,
        digit,
    }
    return dto;
}

export const AccountMapper = {
    formToDto,
}