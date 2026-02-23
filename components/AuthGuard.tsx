'use client';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
      return <>{children}</>;
    }

    return redirect('/login');
};

export default AuthGuard;