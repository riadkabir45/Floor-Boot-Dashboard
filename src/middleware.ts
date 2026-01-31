import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the token from the cookies
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 2. Define your "Public" routes (routes that don't need a token)
  const isAuthPage = pathname.startsWith('/sign-in');
  const isPublicAsset = pathname.startsWith('/_next') || pathname.includes('.');

  // 3. REDIRECT LOGIC
  
  // If no token exists and user is trying to access a protected page
  if (!token && !isAuthPage && !isPublicAsset) {
    const signInUrl = new URL('/sign-in', request.url);
    // Optional: add a "callback" so user returns here after login
    signInUrl.searchParams.set('from', pathname); 
    return NextResponse.redirect(signInUrl);
  }

  // If token exists and user tries to go to /sign-in, send them home/dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 4. Matcher Configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes
     * 2. /_next (static files)
     * 3. /_static, /favicon.ico, /public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};