'use server';

import { authenticaitionBacen } from "@/repositories/apis/openfinance/authentication.api";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";

const CLAZZ = 'OpenFinance - AuthorizationService';

export async function authenticate(document: string, compeCode: string): Promise<string> {
    const METHOD = 'authenticate';
    logInit(CLAZZ, METHOD, { document, compeCode });
    try {
        // TODO: Validation
        const response = await authenticaitionBacen(document, compeCode);
        logEnd(CLAZZ, METHOD, { response });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}