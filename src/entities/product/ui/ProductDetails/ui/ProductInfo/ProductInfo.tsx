'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, Fragment, useState } from 'react';

import { IArticle, IProduct, useAddToCartMutation, useDeleteFromCartMutation } from '@/entities/product';
import { useSessionStore } from '@/entities/session';
import { useMeQuery } from '@/entities/user';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';
import { priceFormat } from '@/shared/lib';
import { Badge, Button, IconButton, InputCounter } from '@/shared/ui';

import styles from './ProductInfo.module.scss';
import { IModification } from '@/entities/product/model';

interface IProductInfoProps {
    product: IProduct;
}

export const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
    const [selectedArticle, setSelectedArticle] = useState<IArticle | undefined>(product.articles[0]);

    const { mutateAsync: addToCart } = useAddToCartMutation();
    const { mutateAsync: deleteFromCart } = useDeleteFromCartMutation();
    const { isAuthenticated, user } = useSessionStore();
    const router = useRouter();
    const { refetch } = useMeQuery({ enabled: false });

    const productCart = user?.cart.find((item) => item.product.id === product.articles[0].id);
    const inCart = !!productCart;

    const handleAddToCart = async (productId: number) => {
        if (!isAuthenticated || !user) {
            return router.push('?authentication=signin', { scroll: false });
        }
        if (inCart) {
            await deleteFromCart(productCart.id);
        } else {
            await addToCart({ userId: user.id, productId });
        }
        await refetch();
    };

    if (!selectedArticle) return <></>;

    // Функция для получения всех возможных комбинаций на основе общего articleId
    const getAllCombinations = (modifications) => {
        // Создадим объект, где ключом будет articleId, а значениями будут объединенные данные по этому articleId
        const combinationsByArticle = {};

        modifications.forEach((modification) => {
            modification.values.forEach((value) => {
                if (!combinationsByArticle[value.articleId]) {
                    combinationsByArticle[value.articleId] = {};
                }
                combinationsByArticle[value.articleId][modification.title] =
                    `${value.value} ${value.measurement || ''}`.trim();
            });
        });

        // Преобразуем объект в массив комбинаций
        return Object.values(combinationsByArticle);
    };

    const combinations = getAllCombinations(product.modifications);

    console.log(combinations);

    return (
        <div className={styles.productInfo}>
            <h1 className={styles.name}>{selectedArticle?.title}</h1>
            <div className={styles.gradeContainer}>
                <GradeIcon />
                <span className={clsx(styles.grade, styles.info)}>0.0</span>
                <span className={styles.ellipse} />
                <span className={styles.info}>0 отзыва</span>
            </div>

            <ul>
                {combinations.map((combination, index) => (
                    <li key={index}>
                        {Object.entries(combination).map(([key, value]) => (
                            <span key={key}>
                                {key}: {value},{' '}
                            </span>
                        ))}
                    </li>
                ))}
            </ul>

            <div className={styles.info}>Артикул: {selectedArticle.number}</div>
            <div className={styles.price}>{priceFormat(+selectedArticle.price)}</div>
            <div className={styles.separator} />
            <div className={styles.tags}>
                <Badge text={'В наличии'} color={'#058943'} />
                <Badge text={'Отечественный производитель'} color={'#4733F4'} />
            </div>
            <div className={styles.specifications}>
                {selectedArticle.characteristics.map((characteristic) => (
                    <div key={characteristic.id} className={styles.specification}>
                        <p className={styles.specificationTitle}>{characteristic.title}</p>
                        <p className={styles.specificationValue}>
                            {characteristic.value} {characteristic?.categoryCharacteristic?.measurement}
                        </p>
                    </div>
                ))}
            </div>
            {product.modifications.map((modification) => {
                return (
                    <Fragment key={modification.title}>
                        <div className={styles.separator} />
                        <div className={styles.equipments}>
                            <p>{modification.title}</p>
                            <div className={styles.equipmentsList}></div>
                        </div>
                    </Fragment>
                );
            })}
            <div className={styles.buttons}>
                <Button fullWidth onClick={() => handleAddToCart(+product.articles[0].id)}>
                    {inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                </Button>
                <InputCounter />
                <IconButton radius={'full'}>
                    <GradeIcon />
                </IconButton>
                <Button variant={'outline'} className={styles.shareButton}>
                    Поделиться
                    <ShareIcon />
                </Button>
            </div>
        </div>
    );
};
