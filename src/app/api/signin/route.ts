import { NextResponse } from 'next/server';

import { instance } from '@/shared/api';

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const response = await instance.post('/authentication_token', body);

        const token = response.data.token;

        const responseHeaders = new Headers();
        responseHeaders.append(
            'Set-Cookie',
            `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production'}`,
        );

        return new NextResponse(JSON.stringify({ message: 'Registration successful' }), {
            status: 200,
            headers: responseHeaders,
        });
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify({ message: 'Registration failed' }), {
            status: 400,
        });
    }
}
