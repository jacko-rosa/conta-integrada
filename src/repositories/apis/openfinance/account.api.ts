'use server';

import { AccountDto, BalanceDto } from "@/definitions/account.definition";
import { ResponseApi } from "@/definitions/openfinance/util.definition";
import { ExternalEndpoints } from "@/utils/endpoints";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit, logMid } from "@/utils/util";
import { ApiError } from "next/dist/server/api-utils";
import { v4 as uuidGenerate } from 'uuid';

const CLAZZ = 'AccountExternalService';

export async function getExternalAccountApi(req: AccountDto, token: string): Promise<AccountDto[]> {
    const METHOD = 'getExternalAccountApi';
    logInit(CLAZZ, METHOD, req);
    try {
        const url = process.env[`COMPE_${req.compeCode}`] + ExternalEndpoints.accounts.path;
        logMid(CLAZZ, METHOD, 'URL', { url });

        const httpResponse = await fetch(url, {
            method: ExternalEndpoints.accounts.methods.GET,
            headers: {
                'Authorization': token,
                'x-fapi-interaction-id': uuidGenerate()
            }
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

export async function getExternalBalanceApi(req: AccountDto, token: string): Promise<BalanceDto> {
    const METHOD = 'getExternalBalanceApi';
    try {
        logInit(CLAZZ, METHOD, req);
        const url = process.env[`COMPE_${req.compeCode}`] + ExternalEndpoints.accounts.id.balances.path(req.accountId!);
        logMid(CLAZZ, METHOD, 'URL', { url });
        const httpResponse = await fetch(url, {
            method: ExternalEndpoints.accounts.id.balances.methods.GET,
            headers: {
                'Authorization': token,
                'x-fapi-interaction-id': uuidGenerate(),
                'accountId': req.accountId!,
            }
        });
        if (!httpResponse.ok) {
            const errorData = await httpResponse.json();
            throw new ApiError(httpResponse.status, errorData.message);
        }
        const responseApi = await httpResponse.json() as unknown as ResponseApi<BalanceDto>;
        const response = responseApi.data;
        logEnd(CLAZZ, METHOD, response);
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}
