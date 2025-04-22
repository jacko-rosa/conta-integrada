import { ResponseApi } from "@/definitions/openfinance/util.definition";
import { PaymentDto } from "@/definitions/payment.denifitions";
import { ExternalEndpoints } from "@/utils/endpoints";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit, logMid } from "@/utils/util";
import { ApiError } from "next/dist/server/api-utils";
import { v4 as uuidGenerate } from 'uuid';

const CLAZZ = 'PaymentExternalApi';

export async function postExternalPixPaymentApi(req: PaymentDto, token: string, compeCode: string): Promise<PaymentDto> {
    const METHOD = 'postExternalPixPaymentApi';
    logInit(CLAZZ, METHOD, req);

    try {
        const url = process.env[`COMPE_${compeCode}`] + ExternalEndpoints.pix.payments.path;
        const body = JSON.stringify({ data: [req] });
        const headers = {
            'Authorization': `Bearer ${token}`,
            'x-fapi-interaction-id': uuidGenerate(),
            'x-idempotency-key': uuidGenerate()
        };
        logMid(CLAZZ, METHOD, 'URL', { url });

        const httpResponse = await fetch(url, {
            method: ExternalEndpoints.pix.payments.methods.POST,
            body,
            headers
        });
        if (!httpResponse.ok) {
            const errorData = await httpResponse.json();
            throw new ApiError(httpResponse.status, errorData.message);
        }
        const responseApi = await httpResponse.json() as unknown as ResponseApi<PaymentDto[]>;
        const response = responseApi.data[0];

        logEnd(CLAZZ, METHOD, response);
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}