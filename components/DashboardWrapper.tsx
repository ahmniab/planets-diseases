'use server';

import { getServerSession } from "@/lib/auth/server";
import { redirect } from 'next/navigation';

const DashboardWrapper: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const session = await getServerSession();
    if (!session || !session.uid || new Date().getTime() > session.exp * 1000) { 
        return redirect('/login'); 
    }

    return <>{children}</>;
};

export default DashboardWrapper;