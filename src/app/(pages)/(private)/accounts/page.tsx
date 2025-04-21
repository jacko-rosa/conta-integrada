'use client'

import { Account } from "@/app/components/account/accout.component";
import { AccountSummary } from "@/app/components/account/summary/accout-summary.component";
import { Breadcrumps } from "@/app/components/breadcrumps/breadcrumps";
import { useAccounts, } from "@/app/hooks/use-account";
import { AccountDto } from "@/definitions/account.definition";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { Card, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect } from "react";

export default function AccountPage() {
    const { data: listAccounts, loading: accountsLoading, error: accountsError } = useAccounts();

    useEffect(() => {
        document.title = `${BRAND} | ${Routes.DASBOARD.MAIN.label}`;
    }, []);

    return (
        <div>
            <Breadcrumps crumbs={[Routes.DASBOARD.MAIN]} actual={Routes.ACCOUNTS.MAIN} />

            <AccountSummary label={"Add Account"} href={Routes.ACCOUNTS.REGISTER.href} />

            <Card>
                <Typography style={{ margin: '1vh' }}>
                    {accountsLoading ? 'Loading Accounts...' :
                        accountsError ? <span className="error">{accountsError.message}</span> :
                            listAccounts?.length > 0 ? 'Your Accounts' : 'You do not have an account'}
                </Typography>
                <ul style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', gap: '1vh' }}>
                    {accountList(listAccounts, accountsLoading, accountsError)}
                </ul>
            </Card>

        </div>
    );
}

function accountList(listAccounts: AccountDto[] | undefined, accountsLoading: boolean, accountsError: Error | null) {
    if (accountsLoading) {
        return <li><CircularProgress /></li>;
    }

    if (accountsError) {
        return <li><span style={{ color: 'red' }}>{accountsError.message}</span></li>;
    }

    return listAccounts?.map((account, index) => (
        <li key={index}>
            <Account
                compeCode={account.compeCode}
                branchCode={account.branchCode}
                accountNumber={account.number}
                digit={account.digit}
                balance={account.amount}
                id={account.id ?? String(index)}
            />
            <Divider />
        </li>
    )) || null;
}