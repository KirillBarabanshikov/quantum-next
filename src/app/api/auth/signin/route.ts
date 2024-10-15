import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { API_URL } from '@/shared/consts';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    const res = await fetch(`${API_URL}/api/authentication_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const { token } = await res.json();

    const cookieStore = cookies();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ message: 'Login successful' });
}
