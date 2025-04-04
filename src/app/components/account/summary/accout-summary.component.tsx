'use client'

import { Card, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";

interface AccountSummaryProp {
    value: number | undefined,
    error?: string | null,
    loading?: boolean
}

export function AccountSummary({ value, loading, error }: AccountSummaryProp) {

    return (
        <Card style={{ border: 'solid black 1px', width: '100%' }}>
            <Link href="/accounts" >
                Accounts
            </Link>
            <Card>
                <Typography>
                    Balance
                </Typography>
                <Typography>
                    {
                        loading ? <CircularProgress /> :
                            error ? <span style={{ color: 'red', margin: '1vh' }}>{error}</span> :
                                value ? 'R$' + value.toFixed(2) : 'R$ 0.00'
                    }
                </Typography>
            </Card>
        </Card>
    )
}