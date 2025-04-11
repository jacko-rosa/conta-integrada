import { AccountDto } from "@/definitions/account.definition";
import { registerAccount } from "@/services/account/account.service";
import { NextResponse } from "next/server";
import { handleApiError } from "../../handle-errors";

export async function POST(request: Request) {
    try {
        const dto: AccountDto = await request.json();

        const data = await registerAccount(dto);
        return NextResponse.json({ data });
    } catch (error: unknown) {
        return handleApiError(error);
    }
}