import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export interface Crumb {
    label: string;
    href: string | ((id: string) => string)
};

interface BreadcrumpsProps {
    crumbs: Crumb[];
    actual: Crumb;
}

export function Breadcrumps({ crumbs, actual }: BreadcrumpsProps) {
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{color: 'var(--foreground)'}}>
            {listCrumbs(crumbs)}
            <Typography>{actual.label}</Typography>;
        </Breadcrumbs>
    );
}

function listCrumbs(crumbs: Crumb[]) {
    return crumbs.map((crumb, index) => {
        return (
            <Link key={index} href={String(crumb.href)} style={{textDecoration:'none', color: 'var(--primary-blue)'}} >
                {crumb.label}
            </Link>
        );
    })
}