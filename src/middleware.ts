import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/cabinet'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    if (!token && protectedPaths.includes(pathname)) {
        const url = new URL('/?authentication=signin', req.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/cabinet'],
};
