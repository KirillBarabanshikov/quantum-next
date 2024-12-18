import { NextResponse } from 'next/server';

import { API_URL } from '@/shared/consts';

export async function POST(request: Request) {
    const { username, password, phone, email, passwordRepeat } = await request.json();

    const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, phone, email, passwordRepeat }),
    });

    if (!res.ok) {
        const data = await res.json();
        return NextResponse.json(data, { status: 401 });
    }

    return NextResponse.json({ message: 'Register successful' });
}
