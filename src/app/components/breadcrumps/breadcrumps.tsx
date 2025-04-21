import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export interface Crumb {
    label: string;
    href: string | ((id: string) => string)
};

interface BreadcrumpsProps {
    crumbs: Crumb[];
    actual: Crumb;
    reverse?: boolean
}

export function Breadcrumps({ crumbs, actual, reverse = false }: BreadcrumpsProps) {
    return (
        <>
            {reverse === false ? (
                <Breadcrumbs aria-label="breadcrumb" style={{ color: 'var(--foreground)' }}>
                    {listCrumbs(crumbs)}
                    <Typography>{actual.label}</Typography>
                </Breadcrumbs>
            ) : (
                <Breadcrumbs aria-label="breadcrumb" style={{ color: 'var(--foreground)' }}>
                    <Typography>{actual.label}</Typography>
                    {listCrumbs(crumbs)}
                </Breadcrumbs>
            )}
        </>
    );
}

function listCrumbs(crumbs: Crumb[]) {
    return crumbs.map((crumb, index) => {
        return (
            <Link key={index} href={String(crumb.href)} style={{ textDecoration: 'none', color: 'var(--primary-blue)' }} >
                {crumb.label}
            </Link>
        );
    })
}