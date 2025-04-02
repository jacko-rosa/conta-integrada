'use client';

import { veryfy } from '@/services/autentication/authentication.service';
import { AUTHORIZATION } from '@/utils/constants';
import { Routes } from '@/utils/routes';
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
                    await veryfy(token);
                    setIsVerified(true);
                } catch {
                    router.push(Routes.HOME.LOGIN.href);
                }
            }
        };

        checkToken();
    }, [router]);

    if (!isVerified) {
        return null; // Placeholder enquanto verifica (pode ser um spinner ou outro componente)
    }

    return <>{children}</>;
}