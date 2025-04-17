'use server';

import { AccountDto } from "@/definitions/account.definition";
import { AccountMapper } from "@/mappers/accout.mapper";
import { createAccountSql, getAccountsSql } from "@/repositories/accout.repository";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";
import { getExternalAccount, getExternalBalance } from "../openfinance/account.service";

const CLAZZ = 'AccountService';

export async function registerAccount(req: AccountDto): Promise<AccountDto> {
    const METHOD = 'registerAccount';
    try {
        logInit(CLAZZ, METHOD, req);
        const externalAccount = await getExternalAccount(req);
        req.accountId = externalAccount.accountId;
        req.type = externalAccount.type;
        const domain = AccountMapper.toDomain(req);
        const accountDomain = await createAccountSql(domain);
        const response = { ...req };
        response.id = accountDomain.id;
        logEnd(CLAZZ, METHOD, { response });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}

export async function getAccounts(document: string): Promise<AccountDto[]> {
    const METHOD = 'getAccounts';
    try {
        logInit(CLAZZ, METHOD, { document });
        const listAccountDomain = await getAccountsSql(document);
        const listDto = listAccountDomain.map((account) => AccountMapper.toDto(account));
        const promisses = listDto.map(async (account) => {
            const balance = await getExternalBalance(account);
            account.amount = balance.amount;
            return account;
        })
        const response = await Promise.all(promisses)
        logEnd(CLAZZ, METHOD, response);
        return response
    } catch (error: unknown) {
        console.error('error', error);

        return handleError(error, CLAZZ, METHOD)
    }

}