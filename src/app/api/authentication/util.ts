import { decode, verify } from "@/services/autentication/authentication.service";
import { AUTHORIZATION } from "@/utils/constants";
import { ApiError } from "next/dist/server/api-utils";

export async function documentByToken(request: Request) {
    const token = request.headers.get(AUTHORIZATION)?.split(" ")[1];
    if (!token) {
        throw new ApiError(401, 'Unauthorized');
    }
    const verified = await verify(token)
    const tokenPayload = await decode(verified);
    return tokenPayload.document;
}