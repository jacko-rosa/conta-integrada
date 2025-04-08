'use client'

import { AccountSummary } from "@/app/components/account/summary/accout-summary.component";
import { useAccountSummary } from "@/app/hooks/use-account";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { useEffect } from "react";

export default function DashboardPage() {
    const { data: summaryData, loading: summaryLoading, error: summaryError } = useAccountSummary();

    useEffect(() => {
        document.title = `${BRAND} | ${Routes.DASBOARD.MAIN.label}`;
    }, []);
    return (
        <div>
            <AccountSummary value={summaryData?.availableAmount.amount} loading={summaryLoading} error={summaryError?.message} />
        </div>
    )
}