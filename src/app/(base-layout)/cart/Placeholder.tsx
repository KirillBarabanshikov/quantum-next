'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/_providers/AuthProvider';
import { Button } from '@/shared/ui';

import styles from './CartPage.module.scss';

export const Placeholder = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    return (
        <div className={styles.placeholder}>
            <div className={styles.placeholderTitle}>Корзина пуста</div>
            <p>
                Перейдите в каталог, чтобы добавить товары в корзину.
                {!isAuthenticated && 'Или авторизуйтесь, чтобы посмотреть уже добавленные товары.'}
            </p>
            <div className={styles.buttons}>
                <Button variant={'solid'} fullWidth onClick={() => router.push('/catalog')}>
                    Продолжить покупки
                </Button>
                {!isAuthenticated && (
                    <Button
                        variant={'outline'}
                        fullWidth
                        onClick={() => router.push('?auth=signin', { scroll: false })}
                    >
                        Войти
                    </Button>
                )}
            </div>
        </div>
    );
};
