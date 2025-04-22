'use client'

import { useAccountSummary } from "@/app/hooks/use-account";
import { Crumb } from "@/definitions/util.definition";
import { monetaryValue } from "@/utils/util";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";


export function AccountSummary({ href, label }: Crumb) {
    const { data: summaryData, loading: summaryLoading, error: summaryError } = useAccountSummary();

    return (
        <Card style={{ border: 'solid black 1px', width: '100%' }}>
            {summaryLoading ? <CircularProgress /> :
                summaryError ? <span style={{ color: 'red', margin: '1vh' }}>{summaryError.message}</span> :
                    <>
                        <Typography>
                            {`Balance at ${summaryData?.qntAcounts || 0} ${summaryData?.qntAcounts === 1 ? 'account' : 'accounts'}`}
                        </Typography>
                        <Typography>
                            {monetaryValue(summaryData?.amount || 0)}
                        </Typography>
                        <Button variant="contained" color="primary" style={{ marginTop: '10px' }} >
                            <Link href={String(href)} style={{ color: 'white', textDecoration: 'none' }}>
                                {label}
                            </Link>
                        </Button>
                    </>
            }
        </Card>
    )
}