import { UserDto } from '@/definitions/user.definition';
import { signIn } from '@/services/autentication/authentication.service';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const userDto: UserDto = await request.json();
        const token = await signIn(userDto);
        return NextResponse.json({ token });
    } catch (error: any) {
        if (error.status === 401) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        return NextResponse.json({ message: 'Internal server Error' }, { status: 500 });
    }
}