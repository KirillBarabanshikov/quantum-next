'use client';

import clsx from 'clsx';

import { FilterByCategory, Filters } from '@/feature/catalog';
import { Button, Dropdown } from '@/shared/ui';
import { ProductsList } from '@/widgets';
import { CallBanner } from '@/widgets/Banners';

import styles from './page.module.scss';

const options = [
    { label: 'По популярности', value: 'По популярности' },
    { label: 'По цене', value: 'По цене' },
];

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
                        <Dropdown
                            options={options}
                            value={'По популярности'}
                            onChange={(value) => console.log(value)}
                            className={styles.dropdown}
                        />
                        <ProductsList />
                        <Button className={styles.more}>Загрузить еще</Button>
                    </div>
                </div>
            </section>
            <CallBanner />
        </div>
    );
}
