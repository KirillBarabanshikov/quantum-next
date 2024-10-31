'use client';

import { useAuth } from '@/app/_providers/AuthProvider';
import { OrderCard } from '@/entities/order/ui/OrderCard';

import styles from './OrdersPage.module.scss';

export const OrdersPage = () => {
    const { user } = useAuth();

    if (!user) return <></>;

    return (
        <div className={styles.ordersPage}>
            <div className={styles.ordersList}>
                {user.payerProfiles[0].orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
};
