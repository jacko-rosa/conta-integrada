'use server';

import { AccountDomain } from "@/definitions/account.definition";
import { handleDbError } from "@/utils/handle-error";
import { logEnd, logInit } from "@/utils/util";
import { db } from "@vercel/postgres";

const CLAZZ = 'AccountRepository';

export async function createAccountSql(domain: AccountDomain): Promise<AccountDomain> {
    const METHOD = 'createAccountSql';
    try {
        logInit(CLAZZ, METHOD, domain);
        const connection = await db.connect();
        const data = await connection.sql`
            INSERT INTO "account" (
                document, 
                compe_code, 
                branch_code, 
                account_number, 
                digit, 
                type,
                external_id
            )
            VALUES (
                ${domain.document},
                ${domain.compe_code}, 
                ${domain.branch_code}, 
                ${domain.account_number}, 
                ${domain.digit},
                ${domain.type},
                ${domain.external_id}
            )
            RETURNING id;
        `;
        const id = data.rows[0].id;
        const response = { ...domain, id }
        logEnd(CLAZZ, METHOD, response)
        return response;
    } catch (error) {
        console.error('error', error);
        const treatdError = error as unknown as Error;
        return handleDbError(treatdError, CLAZZ, METHOD)
    }
}

export async function getAccountsSql(document: string): Promise<AccountDomain[]> {
    const METHOD = 'getAccountsSql';
    try {
        logInit(CLAZZ, METHOD, { document });
        const connection = await db.connect();
        const data = await connection.sql`
            SELECT 
                * 
            FROM "account"
            WHERE 1=1
                AND document = ${document};
        `;
        const responses = data.rows as AccountDomain[];
        logEnd(CLAZZ, METHOD, responses)
        return responses;
    } catch (error) {
        return handleDbError(error as Error, CLAZZ, METHOD)
    }
}