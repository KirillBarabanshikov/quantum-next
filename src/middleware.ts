import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    if (!token) {
        const url = new URL('/?authentication=signin', req.url);
        return NextResponse.redirect(url);
    }

    if (pathname === '/cabinet') {
        const url = new URL('/cabinet/orders', req.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cabinet/:path*', '/create-profile'],
};
