'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';

import { IProduct, IProductModification } from '@/entities/product';
import { apiClient } from '@/shared/api';

import styles from './ProductModifications.module.scss';

interface IModification {
    articleId: number[];
    slug: string[];
    measurement?: string;
}

interface IProductModificationsProps {
    product: IProduct;
}

export const ProductModifications: FC<IProductModificationsProps> = ({ product }) => {
    const router = useRouter();

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
        if (!modifications) return [];

        return modifications.map((item) => {
            const groupedValues: { [key: string]: IModification } = {};

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

    const handleNavigate = useCallback(
        (title: string, value: any) => {
            if (!transformedModifications || !modifications) return;

            const currentSelection = transformedModifications.reduce(
                (acc, mod) => {
                    const activeValue = mod.values.find((val) => val.slug.includes(product.slug));
                    if (activeValue) acc[mod.title] = activeValue.value;
                    return acc;
                },
                {} as Record<string, string>,
            );

            currentSelection[title] = value.value;

            const slugs = modifications.flatMap((mod) =>
                mod.values
                    .filter(
                        (val) => val.value === currentSelection[mod.title] && value.articleId.includes(val.articleId),
                    )
                    .map((val) => val.slug),
            );

            const mostFrequentSlug = slugs
                .sort((a, b) => slugs.filter((v) => v === a).length - slugs.filter((v) => v === b).length)
                .pop();

            if (mostFrequentSlug) {
                router.push(`/product/${mostFrequentSlug}`);
            }
        },
        [transformedModifications, modifications, product.slug, router],
    );

    if (!transformedModifications.length) return <></>;

    return (
        <div className={styles.productModifications}>
            {transformedModifications.map((modification) => {
                return (
                    <div key={modification.title} className={styles.modification}>
                        <div className={styles.title}>{modification.title}</div>
                        <div className={styles.values}>
                            {modification.values.map((value) => {
                                const active = value.slug.includes(product.slug);

                                return (
                                    <div
                                        key={value.value}
                                        className={clsx(styles.value, active && styles.active)}
                                        onClick={() => handleNavigate(modification.title, value)}
                                    >
                                        {value.value} {value.measurement}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
