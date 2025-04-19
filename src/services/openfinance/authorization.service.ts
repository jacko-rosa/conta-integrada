'use server';

import { AccountDto } from "@/definitions/account.definition";
import { authenticaitionBacen } from "@/repositories/apis/openfinance/authentication.api";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";

const CLAZZ = 'OpenFinance - AuthorizationService';

export async function authenticate(req: AccountDto): Promise<string> {
    const METHOD = 'authenticate';
    logInit(CLAZZ, METHOD, req);
    try {
        // TODO: Validation
        const response = await authenticaitionBacen(req);
        logEnd(CLAZZ, METHOD, { response });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}