'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import CloseIcon from '@/shared/assets/icons/close2.svg';
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
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Layout headerSlot={isMatch ? undefined : <Header />} footerSlot={isMatch ? undefined : <Footer />}>
            <div className={clsx(styles.universalLayout, 'container')}>
                <SideNavigation items={navItems} className={styles.sideNavigation} />
                {isMatch && (
                    <header className={styles.header}>
                        {navItems.find((item) => item.href === pathname)?.title}
                        <button onClick={router.back} className={styles.close}>
                            <CloseIcon />
                        </button>
                    </header>
                )}
                {children}
            </div>
        </Layout>
    );
}
