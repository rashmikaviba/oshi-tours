import { Request, Response, NextFunction } from 'express';
import { getAuth, createClerkClient } from '@clerk/express';

const clerkClient = createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
  secretKey: process.env.CLERK_SECRET_KEY || '',
});

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

export async function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: Valid Clerk session token required',
      });
      return;
    }

    // 1. Check Claims metadata
    const claims = (auth.sessionClaims || (auth as any).claims || {}) as any;
    let role = claims?.metadata?.role || claims?.publicMetadata?.role;

    // 2. Fetch user details via Clerk API if metadata not in claims
    let userEmail: string | undefined = undefined;
    if (process.env.CLERK_SECRET_KEY) {
      try {
        const user = await clerkClient.users.getUser(auth.userId);
        role = role || (user.publicMetadata as any)?.role;
        userEmail = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
      } catch (err: any) {
        console.warn('[ClerkAuth] Failed to fetch user metadata from Clerk API:', err.message);
      }
    }

    // Recognize owner email as initial admin
    if (!role && (userEmail === 'oshitourslanka@gmail.com' || userEmail === 'rajkumararashmika@gmail.com')) {
      role = 'admin';
    }

    if (role !== 'admin') {
      res.status(403).json({
        success: false,
        error: 'Forbidden: Administrator privileges required',
      });
      return;
    }

    req.userId = auth.userId;
    req.userRole = role;
    next();
  } catch (err: any) {
    console.error('[ClerkAuth] Authentication middleware error:', err.message || err);
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or expired authentication token',
    });
  }
}
