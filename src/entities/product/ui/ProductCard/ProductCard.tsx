'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { useAddToCartMutation } from '@/entities/product';
import { useSessionStore } from '@/entities/session';
import { useMeQuery } from '@/entities/user';
import GradeIcon from '@/shared/assets/icons/grade-outline.svg';
import { BASE_URL } from '@/shared/consts';
import { priceFormat } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { IProduct } from '../../model';
import styles from './ProductCard.module.scss';

interface IProductCardProps {
    product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
    const router = useRouter();
    const { isAuthenticated } = useSessionStore();
    const { mutateAsync: addToCart } = useAddToCartMutation();
    const { user } = useSessionStore();
    const { refetch } = useMeQuery({ enabled: false });

    const handleAddToCart = async (productId: number) => {
        if (!isAuthenticated || !user) {
            return router.push('?authentication=signin', { scroll: false });
        }
        await addToCart({ userId: user.id, productId });
        await refetch();
    };

    return (
        <article className={styles.productCard}>
            <div className={styles.productImage}>
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={
                            BASE_URL +
                            `/${product.articles[0]?.images?.length ? product.articles[0].images[0].image : ''}`
                        }
                        width={300}
                        height={300}
                        alt={'product'}
                    />
                </Link>
                <GradeIcon className={clsx(styles.grade, styles.active)} />
            </div>
            <Link href={`/product/${product.id}`} className={styles.productTitle}>
                {product.articles[0]?.title}
            </Link>
            <p className={styles.productPrice}>{priceFormat(+product.articles[0]?.price)}</p>
            <Button variant={'outline'} fullWidth onClick={() => handleAddToCart(+product.articles[0].id)}>
                В КОРЗИНУ
            </Button>
        </article>
    );
};
