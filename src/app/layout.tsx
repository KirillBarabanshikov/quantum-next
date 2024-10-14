import 'swiper/css';
import 'swiper/css/pagination';
import './_styles/index.css';

import type { Metadata } from 'next';
import React from 'react';

import { QueryProvider } from './_providers/QueryProvider';
import { gilroy } from './_styles/fonts';

export const metadata: Metadata = {
    title: 'rubot.pro – маркетплейс',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ru'>
            <body className={gilroy.className}>
                <QueryProvider>{children}</QueryProvider>
                <div id={'portal'} />
            </body>
        </html>
    );
}
