import { BaseTable } from "./util.definition";

export interface BalanceDto {
    availableAmount: {
        amount: number
        currency: string,
    }
}

export interface AccountDto {
    id?: string;
    document: string // CPF/CNPJ
    compeCode: string
    branchCode: string
    accountNumber: string
    digit: string
}
export interface Account extends BaseTable {
    document: string // CPF/CNPJ
    compe_code: string
    branch_code: string
    account_number: string
    digit: string
}
