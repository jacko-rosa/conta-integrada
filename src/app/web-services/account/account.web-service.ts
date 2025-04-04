import { Balance } from "@/definitions/account.definition";

const getBalance: (document: string) => Promise<Balance> = async (document: string) => {
  // const response = await fetch(Endpoints.accounts.balance.path, {
  // method: Endpoints.accounts.balance.methods.GET,
  // body: JSON.stringify(document),
  // });
  const response = await fetchBalance(true); // TODO remover mock

  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  return response.json() as Promise<Balance>;
};

async function fetchBalance(ok: boolean): Promise<{ ok: boolean; status: number; json: () => Promise<any> }> {
  const amount: Balance = {
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
  getBalance
};