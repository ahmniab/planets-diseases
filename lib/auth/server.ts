'use server';

import { authAdmin } from "../firebaseAdmin/firebase";
import { cookies } from 'next/headers';

export async function getServerSession() {
  const session = (await cookies()).get('__session')?.value;
  if (!session) return null;

  try {
    const decodedSession = await authAdmin.verifySessionCookie(session, true);
    return decodedSession;
  } catch {
    return null; 
  }
}
