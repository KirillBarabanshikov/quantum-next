'use client';

import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { Layout } from '@/shared/ui';
import { Footer, Header, SideNavigation } from '@/widgets';

import styles from './layout.module.scss';

const navItems = [
    { title: 'Контакты', href: '/contacts' },
    { title: 'Гарантии и возврат', href: '/warranty-return' },
    { title: 'Доставка и оплата', href: '/delivery-payment' },
    { title: 'Сервисный центр', href: '/service-center' },
    { title: 'Политика конфиденциальности', href: '/privacy-policy' },
    { title: 'Публичная оферта', href: '/public-offer' },
];

export default function UniversalLayout({ children }: PropsWithChildren) {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    return (
        <Layout headerSlot={isMatch ? undefined : <Header />} footerSlot={isMatch ? undefined : <Footer />}>
            <div className={clsx(styles.universalLayout, 'container')}>
                <SideNavigation items={navItems} />
                {children}
            </div>
        </Layout>
    );
}
