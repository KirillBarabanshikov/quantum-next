'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, Fragment, useEffect, useState } from 'react';

import { useCartStore } from '@/entities/cart';
import { IProduct, IProductModification } from '@/entities/product';
import { apiClient } from '@/shared/api';
import ShareIcon from '@/shared/assets/icons/share.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import { useStore } from '@/shared/hooks';
import { priceFormat } from '@/shared/lib';
import { Badge, Button, InputCounter } from '@/shared/ui';

import styles from './ProductInfo.module.scss';

interface IProductInfoProps {
    product: IProduct;
}

// TODO Переписать модификации
export const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
    const [selectedModifications, setSelectedModifications] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);
    const cartStore = useStore(useCartStore, (state) => state);
    // const store = useStore(useFavoritesStore, (state) => state);
    const router = useRouter();

    const inCart = !!cartStore?.inCart(product.id);
    // const isFavorite = !!store?.isFavorite(product.id);

    const { data: modifications } = useQuery({
        queryKey: ['modifications', product.productId],
        queryFn: async () => {
            const response = await apiClient.get<IProductModification[]>(
                `/articles/modifications?id=${product.productId}`,
            );
            return response.data;
        },
    });

    useEffect(() => {
        if (!modifications) return;

        const values: string[] = [];

        modifications.forEach((modification) => {
            values.push(modification.values[0].value);
        });

        setSelectedModifications(values);
    }, [modifications]);

    const handleAddToCart = async (productId: number) => {
        // if (!isAuthenticated || !user) {
        //     return router.push('?authentication=signin', { scroll: false });
        // }
        // if (inCart) {
        //     await deleteFromCart(productCart.id);
        // } else {
        //     await addToCart({ userId: user.id, productId });
        // }
        // await refetch();

        inCart ? cartStore?.removeFromCart(productId) : cartStore?.addToCart(productId);
    };

    // const handleAddToFavorite = () => {
    //     isFavorite ? store?.removeFromFavorites(product.id) : store?.addToFavorites(product.id);
    // };

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                setCopied(true);
                console.log('url скопирован');
            })
            .catch((err) => {
                console.error('не', err);
            });
    };

    return (
        <div className={styles.productInfo}>
            <h1 className={styles.name}>{product.title}</h1>
            <div className={styles.gradeContainer}>
                <GradeIcon />
                <span className={clsx(styles.grade, styles.info)}>0.0</span>
                <span className={styles.ellipse} />
                <span className={styles.info}>{product.reviews.length} отзыва</span>
            </div>
            <div className={styles.info}>Артикул: {product.number}</div>
            <div className={styles.price}>{priceFormat(product.price)}</div>
            <div className={styles.separator} />
            <div className={styles.tags}>
                <Badge text={'В наличии'} color={'#058943'} />
                <Badge text={'Отечественный производитель'} color={'#4733F4'} />
            </div>
            <div className={styles.specifications}>
                {product.characteristics.map((characteristic) => (
                    <div key={characteristic.id} className={styles.specification}>
                        <p className={styles.specificationTitle}>{characteristic.title}</p>
                        <p className={styles.specificationValue}>
                            {characteristic.value} {characteristic?.categoryCharacteristic?.measurement}
                        </p>
                    </div>
                ))}
            </div>
            {modifications?.map((modification) => {
                const values: string[] = [];

                return (
                    <Fragment key={modification.title}>
                        <div className={styles.separator} />
                        <div className={styles.equipments}>
                            <p>{modification.title}</p>
                            <div className={styles.equipmentsList}>
                                {modification.values.map((value, idx) => {
                                    if (values.includes(value.value)) {
                                        return <Fragment key={idx} />;
                                    } else {
                                        values.push(value.value);
                                    }

                                    const isSelected: string[] = [];

                                    modifications.forEach((mod) => {
                                        mod.values.forEach((v) => {
                                            if (v.articleId === product.id) {
                                                isSelected.push(v.value);
                                            }
                                        });
                                    });

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                const ids: number[] = [];
                                                const countMap: any = {};
                                                let mostFrequent = 0;
                                                let maxCount = 0;

                                                modifications.forEach((modification, i) => {
                                                    modification.values.forEach((val) => {
                                                        if (val.value === value.value) {
                                                            ids.push(val.articleId);
                                                            const mod = selectedModifications;
                                                            mod[i] = val.value;
                                                            setSelectedModifications([...mod]);
                                                        }
                                                    });
                                                });

                                                modifications.forEach((modification, i) => {
                                                    modification.values.forEach((val) => {
                                                        ids.forEach((id) => {
                                                            if (
                                                                val.articleId === id &&
                                                                val.value === selectedModifications[i]
                                                            ) {
                                                                countMap[id] = (countMap[id] || 0) + 1;

                                                                if (countMap[id] > maxCount) {
                                                                    maxCount = countMap[id];
                                                                    mostFrequent = id;
                                                                }
                                                            }
                                                        });
                                                    });
                                                });

                                                router.push(`/catalog/${product.categoryId}/${mostFrequent}`, {
                                                    scroll: false,
                                                });
                                            }}
                                            className={clsx(
                                                styles.equipment,
                                                isSelected.includes(value.value) && styles.selected,
                                            )}
                                        >
                                            {value.value} {value.measurement}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
            <div className={styles.buttons}>
                <Button fullWidth onClick={() => handleAddToCart(product.id)}>
                    {inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                </Button>
                <InputCounter max={product.count} />
                {/*<IconButton*/}
                {/*    radius={'full'}*/}
                {/*    onClick={handleAddToFavorite}*/}
                {/*    className={clsx(isFavorite && styles.favorite)}*/}
                {/*>*/}
                {/*    <GradeIcon />*/}
                {/*</IconButton>*/}
                <Button variant={copied ? 'solid' : 'outline'} onClick={copyUrl} className={styles.shareButton}>
                    Поделиться
                    <ShareIcon />
                </Button>
            </div>
        </div>
    );
};
