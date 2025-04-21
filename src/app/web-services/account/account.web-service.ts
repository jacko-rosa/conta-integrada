import { AccountDto } from "@/definitions/account.definition";
import { Endpoints } from "@/utils/endpoints";
import { ApiError } from "next/dist/server/api-utils";
import { AuthenticationWebService } from "../home/authentication.web-service";

const registerAccount = async (dto: AccountDto): Promise<AccountDto> => {
  const payload = AuthenticationWebService.decodeJwt()
  dto.document = payload.document;
  const response = await fetch(Endpoints.accounts.path, {
    method: Endpoints.accounts.methods.POST,
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  return await response.json();
}

const getAccounts = async (): Promise<AccountDto[]> => {
  const http = await fetch(Endpoints.accounts.path, {
    method: Endpoints.accounts.methods.GET,
    headers: {
      Authorization: `Bearer ${AuthenticationWebService.getToken()}`,
    },
  });
  if (!http.ok) {
    const errorData = await http.json();
    throw new ApiError(http.status, errorData.message);
  }
  const httpResponse = await http.json();
  const result = httpResponse.data as AccountDto[];
  return result;
}

const getCompeCodes = async (): Promise<{ key: string; value: string }[]> => {
  // const response = await fetch(Endpoints.accounts.compeCodes.path, {
  // method: Endpoints.accounts.compeCodes.methods.GET,
  // });

  const response = {
    ok: true,
    status: 200,
    json: async () => [
      { value: '001', key: 'Banco do Brasil S.A.' },
      { value: '033', key: 'Santander' },
      { value: '104', key: 'Caixa Econômica Federal' },
      { value: '237', key: 'Bradesco S.A.' },
      { value: '341', key: 'Itaú Unibanco S.A.' },
      { value: '399', key: 'HSBC Brasil S.A.' },
      { value: '756', key: 'Banco Cooperativo do Brasil S.A.' }
    ],
  } as Response;

  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  return response.json() as Promise<{ key: string; value: string }[]>;

}

export const AccountsWebService = {
  registerAccount,
  getCompeCodes,
  getAccounts
};