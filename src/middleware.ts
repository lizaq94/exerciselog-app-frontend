import { NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const accessToken = request.cookies.get('Authentication');
  const refreshToken = request.cookies.get('Refresh');
  const isAuthenticated = accessToken || refreshToken;

  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/workouts', request.url));
    }
    return NextResponse.next();
  }

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const redirectTo = encodeURIComponent(pathname + search);
  return NextResponse.redirect(new URL(`/login?redirectTo=${redirectTo}`, request.url));
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/workouts/:path*',
    '/exercises/:path*',
    '/profile/:path*',
    '/ai-generate/:path*',
    '/stats/:path*',
  ],
};
