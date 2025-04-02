import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export function handleApiError(error: unknown) {
    if (error instanceof ApiError) {
        if (error.statusCode === 400) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
        if (error.statusCode === 401) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        if (error.statusCode === 403) {
            return NextResponse.json({ message: error.message }, { status: 403 });
        }
        if (error.statusCode === 404) {
            return NextResponse.json({ message: error.message }, { status: 404 });
        }
        if (error.statusCode === 501) {
            return NextResponse.json({ message: 'Not Implemented' }, { status: 501 });
        }
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}