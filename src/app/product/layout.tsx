import { PropsWithChildren } from 'react';

import { AppLayout } from '@/shared/ui';
import { Footer, Header, MobileNavbar } from '@/widgets';

import styles from './layout.module.scss';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <AppLayout
            headerSlot={<Header className={styles.header} />}
            footerSlot={<Footer />}
            bottomSlot={<MobileNavbar />}
        >
            {children}
        </AppLayout>
    );
}
