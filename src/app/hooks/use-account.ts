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
                const amount = listAccounts
                    .map(account => account.amount)
                    .reduce((prev, actual) => {
                        const prevAmount: number = prev ? prev : 0;
                        const actualAmount: number = actual ? actual : 0;
                        const sumAmount: number = prevAmount + actualAmount;
                        return sumAmount;
                    })
                const currency = 'R$';
                const qntAcounts = listAccounts.length;
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