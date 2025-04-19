'use server';

import { AccountDto } from "@/definitions/account.definition";
import { PayloadTokenBacen } from "@/definitions/openfinance/util.definition";
import { handleError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";
import * as jwt from "jsonwebtoken";

const CLAZZ = 'OpenFinance - AuthenticationApi';

export async function authenticaitionBacen(req: AccountDto): Promise<string> {
    const METHOD = 'authenticaitionBacen';
    logInit(CLAZZ, METHOD, req);
    try {
        // Passo 1: Encaminhamento do usuário para tela de login da Instituição B
        // Passo 2: Autenticação da Instituição A com a Instituição B (TLS)
        // Passo 3: Solicitação de Consentimento à Instituição B

        const document = req.document;
        const compeCode = req.compeCode;
        const accountId = req.accountId;

        const payload = {
            client_info: {
                client_id: document,
                compe_code: compeCode,
                accout_id: accountId
            },
            receptor_info: {
                client_id: process.env.OPEN_FINANCE_CLIENT_ID!,
                roles: ["ROLE_INTEGRATED_ACCOUNT"],
            }
        } as unknown as PayloadTokenBacen;
        const options = {
            expiresIn: '1h'
        } as jwt.SignOptions;

        const response = jwt.sign(payload, process.env.OPEN_FINANCE_SECRET!, options) as string;

        logEnd(CLAZZ, METHOD, { token: response });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return handleError(error, CLAZZ, METHOD)
    }

}