import { AccountDto, BalanceDto } from "@/definitions/account.definition";
import { Endpoints } from "@/utils/endpoints";
import { AuthenticationWebService } from "../home/authentication.web-service";

const registerAccount = async (dto: AccountDto): Promise<AccountDto> => {
  const payload = AuthenticationWebService.decodeJwt()
  dto.document = payload.document;
  const response = await fetch(Endpoints.accounts.register.path, {
    method: Endpoints.accounts.register.methods.POST,
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  return await response.json();
}

const getBalance = async (document: string): Promise<BalanceDto> => {
  // const response = await fetch(Endpoints.accounts.balance.path, {
  // method: Endpoints.accounts.balance.methods.GET,
  // body: JSON.stringify(document),
  // });
  const response = await fetchBalance(true); // TODO remover mock

  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  return response.json() as Promise<BalanceDto>;
};

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

async function fetchBalance(ok: boolean): Promise<{ ok: boolean; status: number; json: () => Promise<any> }> {
  const amount: BalanceDto = {
    availableAmount: {
      amount: 1000.00,
      currency: 'BRL',
    },
  };

  const success = {
    ok: true,
    status: 200,
    json: async () => amount,
  } as Response;

  const fail = {
    ok: false,
    status: 500,
    json: async () => { message: 'Error' },
  } as Response;

  return ok ? success : fail;
} // TODO remover mock

export const AccountsWebService = {
  getBalance,
  registerAccount,
  getCompeCodes
};