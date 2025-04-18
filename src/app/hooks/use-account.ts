import { AccountDto, BalanceDto } from '@/definitions/account.definition';
import { PayloadToken } from '@/definitions/util.definition';
import { useEffect, useState } from 'react';
import { AccountsWebService } from '../web-services/account/account.web-service';
import { AuthenticationWebService } from '../web-services/home/authentication.web-service';

export function useAccountSummary() {
    const [data, setData] = useState<BalanceDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const token: PayloadToken = AuthenticationWebService.decodeJwt();
                const document = token.document;
                const result = await AccountsWebService.getBalance(document);
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { data, loading, error };
}

export function useAccounts() {
    const [data, setData] = useState<AccountDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await AccountsWebService.getAccounts();
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return { data, loading, error };
}