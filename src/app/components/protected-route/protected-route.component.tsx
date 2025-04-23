'use client';

import { verify } from '@/services/autentication/authentication.service';
import { AUTHORIZATION } from '@/utils/constants';
import { Routes } from '@/utils/routes';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = sessionStorage.getItem(AUTHORIZATION);
            if (!token) {
                router.push(Routes.HOME.LOGIN.href);
            } else {
                try {
                    await verify(token);
                    setIsVerified(true);
                } catch {
                    router.push(Routes.HOME.LOGIN.href);
                }
            }
        };

        checkToken();
    }, [router]);

    if (!isVerified) {
        return <CircularProgress/>;
    }

    return <>{children}</>;
}