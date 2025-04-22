import { ExtractedFielLibre, ExtractedInfo, PaymentDto, ResumedPayment } from "@/definitions/payment.denifitions";
import { PaymentMapper } from "@/mappers/payment.mapper";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";
import { ApiError } from "next/dist/server/api-utils";
import { getAccounts } from "../account/account.service";
import { createExternalPayment } from "../openfinance/payment.service";

const CLAZZ = 'PaymentService';

export async function registerPaymentSlip(req: ResumedPayment): Promise<PaymentDto> {
    const METHOD = 'registerPaymentSlip';
    try {
        logInit(CLAZZ, METHOD, req);
        // TODO: validate
        const decodedBarcode = decodeBarcode(req);
        const acounts = await getAccounts(req.document);
        const amountDebit = decodedBarcode.amount;
        const totalAmount = acounts.map(account => Number(account.amount)).reduce((prev, actual) => Number(prev) + Number(actual), 0);

        if (totalAmount < amountDebit) {
            throw new ApiError(400, 'Bad Request: Insufficient ammount')
        }

        let restAmountDebit = amountDebit;

        for (const account of acounts) {
            if (restAmountDebit <= 0) {
                break;
            }
            try {
                const amountToDebit = Math.min(restAmountDebit, Number(account.amount));
                const endToEndId = generateEndToEndId();
                const transactionId = generateTransactionIdentifier();
                const paymentDto = PaymentMapper.toDto(endToEndId, transactionId, amountToDebit, decodedBarcode)
                await createExternalPayment(paymentDto, account);
                // TODO: cadastrar Historico -> await createPaymentSlipSQL(paymentDto, account);
                restAmountDebit -= amountToDebit;
            } catch (error) {
                console.error(error);
                throw error
            }
            // TODO: realizar o efetivo pagamento do boleto com os saldos transferidos para conta da ContaIntegrada
        }
        const response = {} as PaymentDto;
        logEnd(CLAZZ, METHOD, { response });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }
}

function decodeBarcode(req: ResumedPayment) {
    const barCode = req.barcode;
    const description = req.description;

    const compeCode = barCode.substring(0, 3);
    const currencyCode = barCode.substring(3, 4);
    const checkDigit = barCode.substring(4, 5);
    const dueDateFactor = barCode.substring(4, 8);
    const amountRaw = barCode.substring(8, 19);
    const fieldLibre = barCode.substring(19);

    const agencyCode = fieldLibre.substring(0, 4);
    const cedentCode = fieldLibre.substring(4, 14);
    const ourNumber = fieldLibre.substring(14, 26);

    const amount = Number(amountRaw) / 100;

    return {
        compeCode,
        currencyCode,
        checkDigit,
        dueDateFactor,
        amount,
        fieldLibre: {
            agencyCode,
            cedentCode,
            ourNumber
        } as ExtractedFielLibre,
        description
    } as ExtractedInfo
}

function generateEndToEndId(): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    const randomPart = Math.random().toString(36).substring(2, 13).padStart(11, '0');
    const endToEndId = `E${year}${month}${day}${hour}${minute}${milliseconds}${randomPart.toUpperCase()}`;
    return endToEndId.slice(0, 32).padEnd(32, '0');
}

function generateTransactionIdentifier(): string {
    const now = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    const transactionId = `${now}${randomPart}`.toUpperCase();
    return transactionId.slice(0, 35);
}