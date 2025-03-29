'use server'

import { UserDomain } from "@/definitions/user.definition";
import { logEnd, logInit, throwError } from "@/utils/util";
import { db } from "@vercel/postgres";

const CLAZZ = 'UserRepository';

export async function createUserSql(user: UserDomain): Promise<UserDomain> {
    const METHOD = 'createUserSql';
    try {
        logInit(CLAZZ, METHOD, user);
        const connection = await db.connect();
        const data = await connection.sql`
            INSERT INTO "user" (name, last_name, email, document, password)
            VALUES (${user.name}, ${user.last_name}, ${user.email}, ${user.document}, ${user.password})
            RETURNING id;
        `;
        const id = data.rows[0].id;
        const response = { ...user, id }
        logEnd(CLAZZ, METHOD, response)
        return response;
    } catch (error) {
        return throwError(error as Error, CLAZZ, METHOD)
    }
}