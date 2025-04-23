import { AccountDto, AccountSummary } from '@/definitions/account.definition';
import { useEffect, useState } from 'react';
import { AccountsWebService } from '../web-services/account/account.web-service';

export function useAccountSummary() {
    const [data, setData] = useState<AccountSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const listAccounts = await AccountsWebService.getAccounts();
                let amount = 0;
                if (!!listAccounts && listAccounts.length > 0) {
                    amount = listAccounts
                    .map(account => account.amount)
                    .reduce((prev, actual) => {
                        const prevAmount = prev ? prev : 0;
                        const actualAmount = actual ? actual : 0;
                        const sumAmount = Number(prevAmount) + Number(actualAmount);
                        return sumAmount;
                    }) || 0;
                }
                
                const currency = 'R$';
                const qntAcounts = listAccounts?.length || 0;
                const sumary = { amount, currency, qntAcounts } as AccountSummary
                setData(sumary);
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