'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';

const links = [
    { title: 'Заказы', path: '/cabinet/orders' },
    { title: 'Профиль', path: '/cabinet/profile' },
    { title: 'Аккаунт', path: '/cabinet/account' },
    { title: 'Избранное', path: '/cabinet/favorites' },
];

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div>
            <div>
                {links.map((link) => (
                    <Link key={link.path} href={link.path}>
                        {link.title}
                    </Link>
                ))}
            </div>
            {children}
        </div>
    );
}
