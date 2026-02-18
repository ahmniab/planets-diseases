'use client';
import { auth } from '@/lib/firebase/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      
      // Optional: If you want to force redirect immediately upon logout detection globally
      if (!user) {
        router.push('/login'); 
      }
    });

    return () => unsubscribe();
  }, [router]);


    return <>{children}</>;
};

export default AuthGuard;