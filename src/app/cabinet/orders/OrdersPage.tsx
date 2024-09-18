'use client';

import { OrderCard } from '@/entities/order';
import { Dropdown } from '@/shared/ui';

import styles from './OrdersPage.module.scss';

export const Orders = () => {
    return (
        <div className={styles.orders}>
            <div className={styles.filters}>
                <Dropdown
                    options={[{ label: 'ООО «Цифродинамика»', value: '1' }]}
                    value={'1'}
                    onChange={() => {}}
                    variant={'outline'}
                />
                <div className={styles.dropdowns}>
                    <Dropdown
                        options={[{ label: 'Все заказы', value: '1' }]}
                        value={'1'}
                        onChange={() => {}}
                        position={'right'}
                    />
                    <Dropdown
                        options={[{ label: 'Сначала новые', value: '1' }]}
                        value={'1'}
                        onChange={() => {}}
                        position={'right'}
                    />
                </div>
            </div>
            <div className={styles.ordersList}>
                <OrderCard />
                <OrderCard />
            </div>
        </div>
    );
};
