import { authAdmin } from './firebase';
import { NextRequest } from 'next/server';

export interface AuthenticatedUser {
  uid: string;
  email?: string;
}

/**
 * Verifies the Firebase ID token from the Authorization header
 * @param request - The Next.js request object
 * @returns The decoded token with user info, or throws an error
 */
export async function verifyAuthToken(request: NextRequest | Request): Promise<AuthenticatedUser> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
}

/**
 * Middleware helper for protected API routes
 * Returns user info if authenticated, or returns an error response
 */
export async function requireAuth(request: NextRequest | Request): Promise<AuthenticatedUser | Response> {
  try {
    return await verifyAuthToken(request);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Authentication required' },
      { status: 401 }
    );
  }
}
