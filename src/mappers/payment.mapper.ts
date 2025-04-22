import { ExtractedInfo, PaymentDto } from "@/definitions/payment.denifitions";

function reduceTypeAccount(): string {
    return 'CACC'; // TODO:
}

function toDto(endToEndId: string, transactionIdentification: string, amount: number, resumePayment: ExtractedInfo): PaymentDto {
    const result: PaymentDto = {
        endToEndId: endToEndId,
        localInstrument: 'INNC',
        payment: {
            currency: 'R$',
            amount: amount
        },
        creditorAccount: {
            ispb: '000',
            issuer: '0000',
            number: '0000',
            accountType: reduceTypeAccount(),
        },
        remittanceInformation: `CONTA INTEGRADA | ${resumePayment.description}`,
        cnpjInitiator: '00000000000000',
        transactionIdentification: transactionIdentification
    }
    return result;
}

export const PaymentMapper = {
    toDto
}