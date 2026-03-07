'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import CircularLoading from './CircularLoading';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            const redirectPath = encodeURIComponent(pathname);
            router.replace(`/login?redirect=${redirectPath}`);
        }
    }, [isAuthenticated, loading, router, pathname]);


    if (loading) {
        return <CircularLoading />;
    }
    if (isAuthenticated) {
      return <>{children}</>;
    }

    return null;
};

export default AuthGuard;