import clsx from 'clsx';

import { AppLayout } from '@/shared/ui';
import { Footer, Header, MobileNavbar } from '@/widgets';

import { Navigation } from './_ui';
import styles from './Cabinet.module.scss';

export default function Page() {
    return (
        <AppLayout headerSlot={<Header />} footerSlot={<Footer />} bottomSlot={<MobileNavbar />}>
            <div className={'page'}>
                <section className={'container'}>
                    <h1 className={clsx(styles.title, 'title')}>Личный кабинет</h1>
                    <div className={styles.wrapper}>
                        <Navigation className={styles.navigation} />
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
