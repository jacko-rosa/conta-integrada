'use client'

import { Account } from "@/app/components/account/accout.component";
import { Breadcrumps } from "@/app/components/breadcrumps/breadcrumps";
import { useAccountSummary } from "@/app/hooks/use-account";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { Button, Card, CircularProgress, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function AccountPage() {
    const { data: summaryData, loading: summaryLoading, error: summaryError } = useAccountSummary();
    const countAccounts = 4;

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
                                saldo em {countAccounts} Contas
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
                    Your Accounts
                </Typography>
                <ul style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', gap: '1vh' }}>
                    <li><Account compeCode={"104"} branchCode={"1644"} accountNumber={"26242"} digit={"3"} balance={0} id="1" loading={undefined} /></li>
                    <Divider />
                    <li><Account compeCode={"104"} branchCode={"1644"} accountNumber={"26242"} digit={"4"} balance={0} id="2" loading={undefined} /></li>
                    <Divider />
                    <li><Account compeCode={"104"} branchCode={"1644"} accountNumber={"26242"} digit={"5"} balance={0} id="3" loading={undefined} /></li>
                    <Divider />
                    <li><Account compeCode={"104"} branchCode={"1644"} accountNumber={"26242"} digit={"6"} balance={0} id="" loading={undefined} /></li>
                </ul>
            </Card>

        </div>
    )
}