import { BaseTable } from "./util.definition";

export interface BalanceDto {
    amount: number,
    currency: string,
}

export interface AccountDto {
    id?: string;
    accountId?: string;
    document: string // CPF/CNPJ
    compeCode: string
    branchCode: string
    number: string
    digit: string
    type?: string
    amount?: number
}

export interface AccountSummary {
    amount: number,
    currency: string,
    qntAcounts: number
}

export interface AccountDomain extends BaseTable {
    document: string // CPF/CNPJ
    compe_code: string
    branch_code: string
    account_number: string
    digit: string
    type: string
    external_id: string
}
