import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (request.nextUrl.pathname.startsWith('/cabinet')) {
        if (!token) {
            const test = NextResponse.redirect(new URL('/login', request.url), { status: 303 });
            test.headers.set('x-middleware-cache', 'no-cache'); // Set x-middleware-cache to no-cache
            return test;
        }
    }

    if (request.nextUrl.pathname.startsWith('/login')) {
        if (token) {
            const test = NextResponse.redirect(new URL('/', request.url), { status: 303 });
            test.headers.set('x-middleware-cache', 'no-cache'); // Set x-middleware-cache to no-cache
            return test;
        }
    }

    // const verifyRes = await fetch('https://your-auth-api.com/verify-token', {
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });
    //
    // if (!verifyRes.ok) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    const response = NextResponse.next();
    response.headers.set(`x-middleware-cache`, `no-cache`); // Set x-middleware-cache to no-cache
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
