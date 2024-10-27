import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react';

import { filterApi } from '@/entities/filter';
import { TProductFilters } from '@/entities/product';
import ClearIcon from '@/shared/assets/icons/close.svg';

import styles from './TopFilters.module.scss';

interface ITopFiltersProps {
    categoryId: number;
    currentFilters: TProductFilters | undefined;
    setCurrentFilters: Dispatch<SetStateAction<TProductFilters | undefined>>;
    className?: string;
}

export const TopFilters: FC<ITopFiltersProps> = ({ categoryId, currentFilters, setCurrentFilters, className }) => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { data: filters } = useQuery({
        queryKey: ['filters', categoryId],
        queryFn: () => filterApi.fetchFilters(categoryId),
    });

    const resetAll = () => {
        if (!filters) return;

        setCurrentFilters(
            filters.reduce((acc, filter) => {
                acc[filter.id] = { value: [], type: filter.filterType };
                return acc;
            }, {} as TProductFilters),
        );

        router.push(pathname, { scroll: false });
    };

    const resetOne = (filterId: number) => {
        if (!filters) return;

        setCurrentFilters((prev) => {
            if (!prev) return;

            return { ...prev, [filterId]: { ...prev[filterId], value: [] } };
        });

        router.push(pathname, { scroll: false });
    };

    useEffect(() => {
        if (!currentFilters || !filters) return;
        setShow(false);

        filters.forEach((filter) => {
            if (currentFilters[filter.id].value.length) {
                return setShow(true);
            }
        });
    }, [currentFilters, filters]);

    return (
        <div className={clsx(styles.topFilters, className)}>
            {currentFilters &&
                filters?.map((filter) => {
                    const value = currentFilters[filter.id].value;

                    if (!value.length) {
                        return <Fragment key={filter.id} />;
                    }

                    return (
                        <div key={filter.id} onClick={() => resetOne(filter.id)} className={styles.pickedFilter}>
                            <span>{filter.title}</span> <ClearIcon />
                        </div>
                    );
                })}
            {show && (
                <div onClick={resetAll} className={clsx(styles.pickedFilter, styles.reset)}>
                    <span>Очистить все</span> <ClearIcon />
                </div>
            )}
        </div>
    );
};
