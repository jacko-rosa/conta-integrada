'use client'

import { AccountSummary } from "@/app/components/account/summary/accout-summary.component";
import { Breadcrumps } from "@/app/components/breadcrumps/breadcrumps";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { useEffect } from "react";

export default function DashboardPage() {
    const ListCrumbs = [
        Routes.ACCOUNTS.MAIN,
        Routes.PAYMENTS.REGISTER
    ]

    useEffect(() => {
        document.title = `${BRAND} | ${Routes.DASBOARD.MAIN.label}`;
    }, []);
    return (
        <div>
            <Breadcrumps crumbs={ListCrumbs} actual={Routes.DASBOARD.MAIN} reverse />
            <AccountSummary label={Routes.ACCOUNTS.MAIN.label} href={Routes.ACCOUNTS.MAIN.href} />
        </div>
    )
}