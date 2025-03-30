import { NextResponse } from "next/server";

export function handleError(error: any) {
    if (error.status === 400) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (error.status === 401) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
    if (error.status === 403) {
        return NextResponse.json({ message: error.message }, { status: 403 });
    }
    if (error.status === 404) {
        return NextResponse.json({ message: error.message }, { status: 404 });
    }
    if (error.status === 501) {
        return NextResponse.json({ message: 'Not Implemented' }, { status: 501 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 501 });
}