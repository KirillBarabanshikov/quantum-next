import clsx from 'clsx';

import { AppLayout } from '@/shared/ui';
import { Footer, Header } from '@/widgets';

import { Navigation } from '../_ui';
import styles from '../Cabinet.module.scss';
import { AccountPage } from './AccountPage';

export default function Page() {
    return (
        <AppLayout headerSlot={<Header />} footerSlot={<Footer />}>
            <div className={'page'}>
                <section className={'container'}>
                    <h1 className={clsx(styles.title, 'title')}>Аккаунт</h1>
                    <div className={styles.wrapper}>
                        <Navigation />
                        <div className={styles.body}>
                            <AccountPage />
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
