'use client'

import { Breadcrumps } from "@/app/components/breadcrumps/breadcrumps";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { useEffect } from "react";

export default function AccountEditPage() {
    useEffect(() => {
        document.title = `${BRAND} | ${Routes.ACCOUNTS.EDIT.label}`;
    }, []);
    return (
        <div>
            <Breadcrumps crumbs={[Routes.ACCOUNTS.MAIN]} actual={Routes.ACCOUNTS.EDIT} />
        </div>
    )
}