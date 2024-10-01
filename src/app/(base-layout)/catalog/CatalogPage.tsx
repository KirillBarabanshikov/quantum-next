'use client';

import clsx from 'clsx';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { CategoriesList } from '@/widgets';

import styles from './CatalogPage.module.scss';

export const CatalogPage = () => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    return (
        <div className={styles.catalogPage}>
            <section>
                <div className={clsx(styles.title, 'container')}>
                    <h1 className={'title'}>Каталог</h1>
                </div>
                <CategoriesList />
                {isMatch && (
                    <div className={'container'}>
                        <Button variant={'outline'} fullWidth>
                            Показать еще
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
};
