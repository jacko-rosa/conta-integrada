import { ResumedPayment } from "@/definitions/payment.denifitions";
import { registerPaymentSlip } from "@/services/payment/payment.service";
import { NextResponse } from "next/server";
import { handleApiError } from "../../handle-errors";

export async function POST(request: Request) {
    try {
        const req: ResumedPayment = await request.json();
        const data = await registerPaymentSlip(req);
        return NextResponse.json({ data });
    } catch (error: unknown) {
        return handleApiError(error);
    }
}