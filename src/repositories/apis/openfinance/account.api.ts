'use server';

import { AccountDto } from "@/definitions/account.definition";
import { ResponseApi } from "@/definitions/openfinance/util.definition";
import { ExternalEndpoints } from "@/utils/endpoints";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit, logMid } from "@/utils/util";
import { ApiError } from "next/dist/server/api-utils";

const CLAZZ = 'AccountExternalService';

export async function getExternalAccountApi(req: AccountDto, token: string): Promise<AccountDto[]> {
    const METHOD = 'getExternalAccountApi';
    logInit(CLAZZ, METHOD, req);
    try {
        const url = process.env[`COMPE_${req.compeCode}`] + ExternalEndpoints.accounts.path;
        logMid(CLAZZ, METHOD, 'URL', { url });

        const httpResponse = await fetch(url, {
            method: ExternalEndpoints.accounts.methods.GET,
            headers: { Authorization: token }
        });
        if (!httpResponse.ok) {
            const errorData = await httpResponse.json();
            throw new ApiError(httpResponse.status, errorData.message);
        }
        const responseApi = await httpResponse.json() as unknown as ResponseApi<AccountDto[]>;
        const response = responseApi.data;

        logEnd(CLAZZ, METHOD, response);
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }

}
