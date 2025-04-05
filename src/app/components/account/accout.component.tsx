'use client'

import { ImagesArguments } from "@/utils/images";
import { Routes } from "@/utils/routes";
import { Card, Typography } from "@mui/material";
import Image from 'next/image';
import Link from "next/link";

interface AccountProp {
    compeCode: string,
    branchCode: string,
    accountNumber: string,
    digit: string,
    balance: number,
    id: string,
    error?: string | null,
    loading?: boolean
}

export function Account({ compeCode, branchCode, accountNumber, digit, balance, id, loading, error }: AccountProp) {

    return (
        <Card style={{ border: 'solid black 1px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image src={ImagesArguments.banks.src + compeCode + '.png'} alt={ImagesArguments.banks.alt + compeCode} width={"50"} height={'50'} />
            <Card>
                <Typography>
                    {branchCode} | {accountNumber}-{digit}
                </Typography>
                <Typography>
                    <Link href={Routes.ACCOUNTS.EDIT.href(id)} >
                        <span>Caixa Economica Federeal {/*TODO via compeCode*/}</span>
                    </Link>
                </Typography>
                <Typography>
                    R$ {balance}
                </Typography>
            </Card>
        </Card>
    )
}