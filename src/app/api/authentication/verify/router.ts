import { veryfy } from '@/services/autentication/authentication.service';
import { AUTHORIZATION } from '@/utils/constants';
import { NextResponse } from 'next/server';
import { handleApiError } from '../../handle-errors';


export async function POST(request: Request) {
    try {
        const token: string = request.headers.get(AUTHORIZATION) || '';
        const response = await veryfy(token);
        return NextResponse.json({ response });
    } catch (error: unknown) {
        return handleApiError(error);
    }
}