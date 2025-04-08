import { Endpoints } from "@/app/api/endpoints";
import { AccountDto, BalanceDto } from "@/definitions/account.definition";
import { AuthenticationWebService } from "../home/authentication.web-service";

const registerAccount = async (dto: AccountDto): Promise<AccountDto> => {
  const payload = AuthenticationWebService.decodeJwt()
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
  //   method: Endpoints.accounts.compeCodes.methods.GET,
  // });

  const response = {
    ok: true,
    status: 200,
    json: async () => [
      { key: '001', value: 'Banco do Brasil S.A.' },
      { key: '033', value: 'Santander' },
      { key: '104', value: 'Caixa Econômica Federal' },
      { key: '237', value: 'Bradesco S.A.' },
      { key: '341', value: 'Itaú Unibanco S.A.' },
      { key: '399', value: 'HSBC Brasil S.A.' },
      { key: '756', value: 'Banco Cooperativo do Brasil S.A.' }
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