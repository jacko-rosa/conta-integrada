import { Balance } from '@/definitions/account.definition';
import { useEffect, useState } from 'react';
import { AccountsWebService } from '../web-services/account/account.web-service';

export function useAccountSummary() {
    const [data, setData] = useState<Balance | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await AccountsWebService.getBalance('123456789'); // TODO Substitua pelo documento real
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