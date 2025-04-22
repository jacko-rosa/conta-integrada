'use client';

import { ResumedPayment } from '@/definitions/payment.denifitions';
import { Endpoints } from '@/utils/endpoints';
import { AuthenticationWebService } from '../home/authentication.web-service';

const registerPayment = async (barcode: string, description: string) => {
  const payload = AuthenticationWebService.decodeJwt();
  const document = payload.document;
  const resumedPayment: ResumedPayment = { document, barcode, description }

  const response = await fetch(Endpoints.payments.slip.path, {
    method: Endpoints.payments.slip.methods.POST,
    body: JSON.stringify(resumedPayment),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  return await response.json();
}

export const PaymentWebService = {
  registerPayment
}