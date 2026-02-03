import { NextResponse } from 'next/server';
import { authAdmin } from '@/lib/firebaseAdmin/firebase';

export async function POST(req: Request) {
  try {
    console.log('Login route called');
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ error: 'No token' }, { status: 400 });

    const expiresIn = 14 * 24 * 60 * 60 * 1000; // 14 days
    const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });

    
    const response = NextResponse.json({ status: 'success' });
    response.cookies.set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 401 });
  }
}