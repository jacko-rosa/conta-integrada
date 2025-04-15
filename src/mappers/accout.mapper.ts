import { AccountDomain, AccountDto } from "@/definitions/account.definition";

function formToDto(form: FormData): AccountDto {

    const compeCode = String(form.get('compeCode') || '');
    const branchCode = String(form.get('branchCode') || '');
    const accountNumber = String(form.get('accountNumber') || '');
    const digit = String(form.get('digit') || '');

    const dto: AccountDto = {
        document: '',
        compeCode,
        branchCode,
        number: accountNumber,
        digit,
    };
    return dto;
}

function toDomain(dto: AccountDto): AccountDomain {
    const domain = {
        document: dto.document,
        compe_code: dto.compeCode,
        branch_code: dto.branchCode,
        account_number: dto.number,
        digit: dto.digit,
        type: dto.type,
        external_id: dto.accountId
    } as AccountDomain;
    return domain;
}

function toDto(domain: AccountDomain): AccountDto {
    const result = {
        id: domain.id,
        accountId: domain.external_id,
        document: domain.document,
        compeCode: domain.compe_code,
        branchCode: domain.branch_code,
        number: domain.account_number,
        digit: domain.digit,
        type: domain.type,
    } as AccountDto;
    return result;
}

export const AccountMapper = {
    formToDto,
    toDomain,
    toDto
}