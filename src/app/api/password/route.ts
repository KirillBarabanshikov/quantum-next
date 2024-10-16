import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();

    if (password !== 'UAVmarkt24') {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const cookieStore = cookies();
    cookieStore.set('password', 'password', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ message: 'Password successful' });
}
