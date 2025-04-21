'use client'

import { Instituition } from "@/definitions/instituition.definitions";
import { ImagesArguments } from "@/utils/images";
import { Routes } from "@/utils/routes";
import { monetaryValue } from "@/utils/util";
import { Box, Card, Typography } from "@mui/material";
import Image from 'next/image';
import Link from "next/link";

interface AccountProp {
    compeCode: string,
    branchCode: string,
    accountNumber: string,
    digit: string,
    balance?: number,
    id: string
}

export function Account({ compeCode, branchCode, accountNumber, digit, balance, id }: AccountProp) {
    return (
        <Box style={{ border: 'solid black 1px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {showContent({ compeCode, branchCode, accountNumber, digit, balance, id })}
        </Box >
    )
}

function showContent({ compeCode, branchCode, accountNumber, digit, balance, id }: AccountProp) {
    balance = balance ? balance : 0.00;
    const instituition = Instituition.findByCompeCode(compeCode)?.brandName || 'Unknow';
    return (
        <>
            <Image src={ImagesArguments.banks.src + compeCode + '.png'} alt={ImagesArguments.banks.alt + compeCode} width={"50"} height={'50'} />
            <Card>
                <Typography>
                    {branchCode} | {accountNumber}-{digit}
                </Typography>
                <Typography>
                    <Link href={Routes.ACCOUNTS.EDIT.href(id)} >
                        <span>{instituition}</span>
                    </Link>
                </Typography>
                <Typography>
                    {monetaryValue(balance)}
                </Typography>
            </Card>
        </>
    )
}