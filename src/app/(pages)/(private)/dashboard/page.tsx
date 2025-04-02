'use client'

import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { useEffect } from "react";

export default function DashboardPage() {
    useEffect(() => {
        document.title = `${BRAND} | ${Routes.DASBOARD.MAIN.label}`;
    }, []);
    return (
        <>
            <p>Dashboard</p>
        </>
    )
}