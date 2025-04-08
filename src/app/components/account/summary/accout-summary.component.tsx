'use client'

import { Routes } from "@/utils/routes";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";

interface AccountSummaryProp {
    value: number | undefined,
    error?: string | null,
    loading?: boolean
}

export function AccountSummary({ value, loading, error }: AccountSummaryProp) {

    return (
        <Box style={{ border: 'solid black 1px', width: '100%' }}>
            <Link href={Routes.ACCOUNTS.MAIN.href} >
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
        </Box>
    )
}