'use server';

import { AccountDto } from "@/definitions/account.definition";
import { AccountMapper } from "@/mappers/accout.mapper";
import { createAccountSql } from "@/repositories/accout.repository";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit, logMid } from "@/utils/util";
import { getExternalAccount } from "../openfinance/account.service";

const CLAZZ = 'AccountService';

export async function registerAccount(req: AccountDto): Promise<AccountDto> {
    const METHOD = 'registerAccount';
    logInit(CLAZZ, METHOD, req);
    try {
        const externalAccount = await getExternalAccount(req);
        logMid(CLAZZ, METHOD, 'before toDomain', externalAccount);
        req.accountId = externalAccount.accountId;
        req.type = externalAccount.type;

        logMid(CLAZZ, METHOD, 'before toDomain', req);
        const domain = AccountMapper.toDomain(req);
        logMid(CLAZZ, METHOD, 'toDomain', domain);
        const accountDomain = await createAccountSql(domain);
        const response = { ...req };
        response.id = accountDomain.id;

        logEnd(CLAZZ, METHOD, { response });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }

}