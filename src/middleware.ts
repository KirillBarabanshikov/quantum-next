import { NextRequest, NextResponse } from 'next/server';

import { instance } from '@/shared/api';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    if (!token) {
        const url = new URL('/?authentication=signin', req.url);
        return NextResponse.redirect(url);
    }

    console.log(token.value);

    if (pathname.startsWith('/cabinet')) {
        const response = await instance.get('/me', { headers: { Authorization: `Bearer ${token.value}` } });

        console.log(response.data);

        if (!response.data.payerProfiles.length) {
            return NextResponse.redirect(new URL('/create-profile', req.url));
        }
    }

    if (pathname === '/cabinet') {
        return NextResponse.redirect(new URL('/cabinet/orders', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cabinet/:path*', '/create-profile'],
};
