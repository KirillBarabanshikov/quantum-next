import clsx from 'clsx';

import { FilterByCategory, Filters } from '@/feature/catalog';

import styles from './page.module.scss';
import { ProductsList } from '@/widgets';
import { Button } from '@/shared/ui';

export default function Catalog() {
    return (
        <div className={styles.catalogPage}>
            <section className={styles.catalogSection}>
                <div className={clsx(styles.titleContainer, 'container')}>
                    <h1 className={'title'}>Каталог</h1>
                </div>
                <FilterByCategory className={styles.filterByCategory} />
                <div className={clsx(styles.catalogContainer, 'container')}>
                    <Filters />
                    <div className={styles.productsContainer}>
                        <ProductsList />
                        <Button className={styles.more}>Загрузить еще</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
