import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  
  // Get the authentication token from cookies
  const token = req.cookies.get('pb_auth')?.value;
  const isAuthenticated = !!token; // Check if token exists
  
  // Case 1: User tries to access dashboard without being authenticated
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      console.log('Redirecting to login page');
      const loginUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Case 2: User tries to access login/signup pages while already authenticated
  if (req.nextUrl.pathname.startsWith('/auth/')) {
    if (isAuthenticated) {
      console.log('Redirecting to dasboard');
      const dashboardUrl = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};