'use server';

import { AccountDto, BalanceDto } from "@/definitions/account.definition";
import { getExternalAccountApi, getExternalBalanceApi } from "@/repositories/apis/openfinance/account.api";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";
import { authenticate } from "./authorization.service";

const CLAZZ = 'OpenFinance - AccountService';

export async function getExternalAccount(req: AccountDto): Promise<AccountDto> {
    const METHOD = 'getExternalAccount';
    logInit(CLAZZ, METHOD, req);
    try {
        // TODO: Validation
        const tokenBacen = await authenticate(req.document, req.compeCode);
        const responses = await getExternalAccountApi(req, tokenBacen);
        // TODO: verificar se conta req existe em conta responses
        logEnd(CLAZZ, METHOD, { response: responses });
        return Promise.resolve(responses[0]);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}

export async function getExternalBalance(req: AccountDto): Promise<BalanceDto> {
    const METHOD = 'getExternalBalance';
    try {
        logInit(CLAZZ, METHOD, req);
        // TODO: Validation
        const tokenBacen = await authenticate(req.document, req.compeCode);
        const response = await getExternalBalanceApi(req, tokenBacen);
        logEnd(CLAZZ, METHOD, response);
        return response;
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}