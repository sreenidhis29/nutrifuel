import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    // Public routes that don't require authentication
    publicRoutes: ["/", "/sign-in", "/sign-up"],

    // Routes that can be accessed while signed out
    ignoredRoutes: ["/api/webhook"],

    // Redirect to home page after sign in/up
    afterAuth(auth, req, evt) {
        // Handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            const signInUrl = new URL('/sign-in', req.url);
            return Response.redirect(signInUrl);
        }

        // Handle admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
            const user = auth.user;
            if (!user || user.publicMetadata?.role !== 'admin') {
                const homeUrl = new URL('/', req.url);
                return Response.redirect(homeUrl);
            }
        }

        // Redirect to home page after sign in/up
        if (auth.userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
            const homeUrl = new URL('/', req.url);
            return Response.redirect(homeUrl);
        }
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 