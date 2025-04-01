import { UserDto } from '@/definitions/user.definition';
import { signIn } from '@/services/autentication/authentication.service';
import { NextResponse } from 'next/server';
import { handleError } from '../../handle-errors';


export async function POST(request: Request) {
    try {
        const userDto: UserDto = await request.json();
        const token = await signIn(userDto);
        return NextResponse.json({ token });
    } catch (error: unknown) {
        return handleError(error);
    }
}