"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminAuth = requireAdminAuth;
const express_1 = require("@clerk/express");
const clerkClient = (0, express_1.createClerkClient)({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
    secretKey: process.env.CLERK_SECRET_KEY || '',
});
async function requireAdminAuth(req, res, next) {
    try {
        const auth = (0, express_1.getAuth)(req);
        if (!auth || !auth.userId) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: Valid Clerk session token required',
            });
            return;
        }
        // 1. Check Claims metadata
        const claims = (auth.sessionClaims || auth.claims || {});
        let role = claims?.metadata?.role || claims?.publicMetadata?.role;
        // 2. Fetch user details via Clerk API if metadata not in claims
        let userEmail = undefined;
        if (process.env.CLERK_SECRET_KEY) {
            try {
                const user = await clerkClient.users.getUser(auth.userId);
                role = role || user.publicMetadata?.role;
                userEmail = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
            }
            catch (err) {
                console.warn('[ClerkAuth] Failed to fetch user metadata from Clerk API:', err.message);
            }
        }
        // Recognize owner email as initial admin
        if (!role && userEmail === 'rajkumararashmika@gmail.com') {
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
    }
    catch (err) {
        console.error('[ClerkAuth] Authentication middleware error:', err.message || err);
        res.status(401).json({
            success: false,
            error: 'Unauthorized: Invalid or expired authentication token',
        });
    }
}
//# sourceMappingURL=clerkAuth.js.map