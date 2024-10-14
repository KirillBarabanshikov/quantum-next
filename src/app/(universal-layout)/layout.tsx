import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { AppLayout } from '@/shared/ui';
import { Footer, Header, SideNavigation } from '@/widgets';

import styles from './layout.module.scss';
import { UniversalHeader } from './UniversalHeader';

const navItems = [
    { title: 'Контакты', href: '/contacts' },
    { title: 'Гарантии и возврат', href: '/warranty-return' },
    { title: 'Доставка и оплата', href: '/delivery-payment' },
    { title: 'Сервисный центр', href: '/service-center' },
    { title: 'Политика конфиденциальности', href: '/privacy-policy' },
    { title: 'Публичная оферта', href: '/public-offer' },
    { title: 'Согласие на обработку персональных данных', href: '/personal-data' },
];

export default function UniversalLayout({ children }: PropsWithChildren) {
    return (
        <AppLayout headerSlot={<Header className={styles.header} />} footerSlot={<Footer className={styles.footer} />}>
            <div className={clsx(styles.universalLayout, 'container')}>
                <SideNavigation items={navItems} className={styles.sideNavigation} />
                <UniversalHeader navItems={navItems} />
                {children}
            </div>
        </AppLayout>
    );
}
