'use client'

import { AccountSummary } from "@/app/components/account/summary/accout-summary.component";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { useEffect } from "react";

export default function DashboardPage() {

    useEffect(() => {
        document.title = `${BRAND} | ${Routes.DASBOARD.MAIN.label}`;
    }, []);
    return (
        <div>
            <AccountSummary label={Routes.ACCOUNTS.MAIN.label} href={Routes.ACCOUNTS.MAIN.href} />
        </div>
    )
}