import { AccountDto } from "@/definitions/account.definition";
import { getAccounts, registerAccount } from "@/services/account/account.service";
import { NextResponse } from "next/server";
import { documentByToken } from "../authentication/util";
import { handleApiError } from "../handle-errors";


export async function POST(request: Request) {
    try {
        const dto: AccountDto = await request.json();
        const data = await registerAccount(dto);
        return NextResponse.json({ data });
    } catch (error: unknown) {
        return handleApiError(error);
    }
}

export async function GET(request: Request) {
    try {
        const document = await documentByToken(request);
        const data = await getAccounts(document);
        return NextResponse.json({ data });
    } catch (error: unknown) {
        return handleApiError(error);
    }
}