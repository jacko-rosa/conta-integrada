export interface ResumedPayment {
    document: string;
    barcode: string;
    description?: string;
}

export interface ExtractedInfo {
    description: string;
    compeCode: string;
    currencyCode: string;
    checkDigit: string;
    dueDateFactor: string;
    amount: number;
    fieldLibre: ExtractedFielLibre;
}

export interface ExtractedFielLibre {
    agencyCode: string;
    cedentCode: string;
    ourNumber: string;
}

export interface PaymentDto {
    paymentId?: string;
    endToEndId: string;
    creationDateTime?: Date;
    statusUpdateDateTime?: Date;
    status?: string;
    localInstrument: string;
    cnpjInitiator: string;
    payment: {
        currency: string;
        amount?: number
    };
    transactionIdentification: string;
    remittanceInformation?: string;
    creditorAccount: {
        ispb: string;
        issuer: string;
        number: string;
        accountType: string;
    };
    debtorAccount?: {
        ispb: string;
        issuer: string;
        number: string;
        accountType: string;
    };
}