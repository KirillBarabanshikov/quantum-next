import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, useMemo } from 'react';

import { IProduct, IProductModification } from '@/entities/product';
import { apiClient } from '@/shared/api';

import styles from './ProductModifications.module.scss';

interface IProductModificationsProps {
    product: IProduct;
}

export const ProductModifications: FC<IProductModificationsProps> = ({ product }) => {
    const { data: modifications } = useQuery({
        queryKey: ['modifications', product.productId],
        queryFn: async () => {
            const response = await apiClient.get<IProductModification[]>(
                `/articles/modifications?id=${product.productId}`,
            );
            return response.data;
        },
    });

    const transformedModifications = useMemo(() => {
        return modifications?.map((item) => {
            const groupedValues: { [key: string]: { articleId: number[]; slug: string[]; measurement?: string } } = {};

            item.values.forEach((val) => {
                if (!groupedValues[val.value]) {
                    groupedValues[val.value] = { articleId: [], slug: [], measurement: '' };
                }
                groupedValues[val.value].articleId.push(val.articleId);
                groupedValues[val.value].slug.push(val.slug);
                groupedValues[val.value].measurement = val.measurement;
            });

            return {
                title: item.title,
                values: Object.entries(groupedValues).map(([value, { articleId, slug, measurement }]) => ({
                    value,
                    articleId,
                    slug,
                    measurement,
                })),
            };
        });
    }, [modifications]);

    console.log(transformedModifications);

    return (
        <div className={styles.productModifications}>
            {transformedModifications?.map((modification) => {
                return (
                    <div key={modification.title} className={styles.modification}>
                        <div className={styles.title}>{modification.title}</div>
                        <div className={styles.values}>
                            {modification.values.map((value) => {
                                const active = value.slug.includes(product.slug);

                                return (
                                    <Link
                                        key={value.value}
                                        href={`/product/${value.slug[0]}`}
                                        className={clsx(styles.value, active && styles.active)}
                                        scroll={false}
                                    >
                                        {value.value} {value.measurement}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
