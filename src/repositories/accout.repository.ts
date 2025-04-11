'use server';

import { AccountDomain } from "@/definitions/account.definition";
import { logEnd, logInit, throwError } from "@/utils/util";
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
        return throwError(error as Error, CLAZZ, METHOD)
    }
}