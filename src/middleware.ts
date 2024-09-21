import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const test = req.cookies.get('test');
    const { pathname } = req.nextUrl;

    if (!test && pathname !== '/loign') {
        const url = new URL('/login', req.url);
        return NextResponse.redirect(url);
    }

    if (!token && (pathname.startsWith('/cabinet') || pathname.startsWith('/create-profile'))) {
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
    matcher: [
        '/',
        '/catalog/:path*',
        '/cabinet/:path*',
        '/create-profile',
        '/cart',
        '/product/:path*',
        '/favorites',
        '/order',
    ],
};
