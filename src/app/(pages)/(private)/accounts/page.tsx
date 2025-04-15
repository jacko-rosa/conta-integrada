'use client'

import { Account } from "@/app/components/account/accout.component";
import { Breadcrumps } from "@/app/components/breadcrumps/breadcrumps";
import { useAccounts, useAccountSummary } from "@/app/hooks/use-account";
import { AccountDto } from "@/definitions/account.definition";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { Button, Card, CircularProgress, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function AccountPage() {
    const { data: summaryData, loading: summaryLoading, error: summaryError } = useAccountSummary();
    const { data: listAccounts, loading: accountsLoading, error: accountsError } = useAccounts();

    useEffect(() => {
        document.title = `${BRAND} | ${Routes.DASBOARD.MAIN.label}`;
    }, []);

    return (
        <div>
            <Breadcrumps crumbs={[]} actual={Routes.ACCOUNTS.MAIN} />

            <Card style={{ border: 'solid black 1px', width: '100%' }}>
                {summaryLoading ? <CircularProgress /> :
                    summaryError ? <span style={{ color: 'red', margin: '1vh' }}>{summaryError.message}</span> :
                        <>
                            <Typography>
                                {`Balance at ${listAccounts?.length || 0} ${listAccounts?.length === 1 ? 'account' : 'accounts'}`}
                            </Typography>
                            <Typography>
                                R$ {summaryData?.availableAmount.amount?.toFixed(2)}
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} >
                                <Link href={Routes.ACCOUNTS.REGISTER.href} style={{ color: 'white', textDecoration: 'none' }}>
                                    Add Account
                                </Link>
                            </Button>
                        </>
                }
            </Card>

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

    console.log('listAccounts', listAccounts);


    return listAccounts?.map((account, index) => (
        <li key={index}>
            <Account
                compeCode={account.compeCode}
                branchCode={account.branchCode}
                accountNumber={account.number}
                digit={account.digit}
                balance={0}
                id={account.id ?? String(index)}
            />
            <Divider />
        </li>
    )) || null;
}