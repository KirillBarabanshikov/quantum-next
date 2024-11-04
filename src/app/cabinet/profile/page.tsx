import clsx from 'clsx';

import { AppLayout } from '@/shared/ui';
import { ChildHeader, Footer, Header } from '@/widgets';

import { Navigation } from '../_ui';
import styles from '../Cabinet.module.scss';
import { ProfilePage } from './ProfilePage';

export default function Page() {
    return (
        <AppLayout
            headerSlot={
                <>
                    <Header className={styles.header} />
                    <ChildHeader title={'Профиль'} className={styles.childHeader} />
                </>
            }
            footerSlot={<Footer />}
        >
            <div className={'page'}>
                <section className={'container'}>
                    <h1 className={clsx(styles.title, styles.childTitle, 'title')}>Профиль</h1>
                    <div className={styles.wrapper}>
                        <Navigation className={styles.childNav} />
                        <div className={styles.body}>
                            <ProfilePage />
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
