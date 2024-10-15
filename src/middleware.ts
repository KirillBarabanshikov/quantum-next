import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const password = cookieStore.get('password')?.value;

    if (!password && request.nextUrl.pathname !== '/password') {
        return NextResponse.redirect(new URL('/password', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/cabinet')) {
        if (!token) {
            return NextResponse.redirect(new URL('/?auth=signin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};