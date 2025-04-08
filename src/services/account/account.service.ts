'use server';

import { AccountDto } from "@/definitions/account.definition";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";

const CLAZZ = 'AuthenticationService';

export async function registerAccount(req: AccountDto): Promise<AccountDto> {
    const METHOD = 'registerAccount';
    logInit(CLAZZ, METHOD, req);
    try {
        // const user = await getUserByDocument(req.document);
        // if (user.password !== req.password) {
        //     throw new ApiError(401, 'Unauthorized: Invalid credentials');
        // }
        // const token = siginjwt(user)
        const response: AccountDto = {
            document: 'sample-document',
            compeCode: 'sample-compeCode',
            branchCode: 'sample-branchCode',
            accountNumber: 'sample-accountNumber',
            digit: 'sample-digit'
        };

        logEnd(CLAZZ, METHOD, { response });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }

}