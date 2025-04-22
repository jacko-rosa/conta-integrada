import { AccountDto } from "@/definitions/account.definition";
import { PaymentDto } from "@/definitions/payment.denifitions";
import { postExternalPixPaymentApi } from "@/repositories/apis/openfinance/payment.api";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";
import { authenticate } from "./authorization.service";

const CLAZZ = 'OpenFinance - PaymentService';

export async function createExternalPayment(paymentDto: PaymentDto, accountDto: AccountDto) {
    const METHOD = 'createExternalPayment';
    logInit(CLAZZ, METHOD, { paymentDto, accountDto });
    try {
        // TODO: Validation
        const tokenBacen = await authenticate(accountDto);
        const response = await postExternalPixPaymentApi(paymentDto, tokenBacen, accountDto.compeCode);
        logEnd(CLAZZ, METHOD, response);
        return response;
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD);
    }
}