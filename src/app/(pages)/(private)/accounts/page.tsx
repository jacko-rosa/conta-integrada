'use client'

import { Account } from "@/app/components/account/accout.component";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { useEffect } from "react";

export default function AccountPage() {
    // const { data: summaryData, loading: summaryLoading, error: summaryError } = useAccountSummary();

    useEffect(() => {
        document.title = `${BRAND} | ${Routes.DASBOARD.MAIN.label}`;
    }, []);
    return (
        <div>
            <Account compeCode={"104"} branchCode={"1644"} accountNumber={"26242"} digit={"3"} balance={0} id="1" />
        </div>
    )
}