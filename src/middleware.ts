import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const session = req.nextauth.token;
    if (req.nextUrl.pathname.startsWith('/auth')) {
      if (session) {
        return NextResponse.redirect(`${req.nextUrl.origin}/panel/user`);
      } else {
        return NextResponse.next();
      }
    }

    if (req.nextUrl.pathname.includes('panel/admin')) {
      if (!session) {
        return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);
      }

      if (session.role?.name.toLowerCase() !== 'admin') {
        return NextResponse.redirect(`${req.nextUrl.origin}/panel/user`);
      }

      return NextResponse.next();
    }

    if (req.nextUrl.pathname.includes('panel/user')) {
      if (!session) {
        return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);
      }

      if (session.role?.name.toLowerCase() !== 'user') {
        return NextResponse.redirect(`${req.nextUrl.origin}/panel/admin`);
      }

      return NextResponse.next();
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!req.nextUrl.pathname.startsWith('/panel')) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/auth/:path*',
    '/panel/admin/:path*',
    '/panel/user/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
