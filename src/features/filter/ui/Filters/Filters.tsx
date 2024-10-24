import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { filterApi } from '@/entities/filter';
import { Button } from '@/shared/ui';

import { FilterDropdown } from '../FilterDropdown';
import { FilterList } from '../FilterList';
import { FilterRange } from '../FilterRange';
import styles from './Filters.module.scss';

interface IFiltersProps {
    categoryId: number;
    className?: string;
}

export const Filters: FC<IFiltersProps> = ({ categoryId, className }) => {
    const [currentFilters, setCurrentFilters] = useState<Record<number, string[]>>({});

    const { data: filters } = useQuery({
        queryKey: ['filters', categoryId],
        queryFn: () => filterApi.fetchFilters(categoryId),
    });

    useEffect(() => {
        if (!filters) return;

        setCurrentFilters(
            filters.reduce(
                (acc, filter) => {
                    acc[filter.id] = [];
                    return acc;
                },
                {} as Record<number, string[]>,
            ),
        );
    }, [filters]);

    const handleFilterChange = (filterId: number, value: string[]) => {
        setCurrentFilters((prev) => ({ ...prev, [filterId]: value }));
    };

    return (
        <div className={clsx(styles.filters, className)}>
            <div className={styles.filtersList}>
                {filters?.map((filter) => {
                    if (filter.filterType === 'checkboxes' || filter.filterType === 'radio') {
                        return <FilterList key={filter.id} filter={filter} className={styles.filter} />;
                    }
                    if (filter.filterType === 'range') {
                        return <FilterRange key={filter.id} filter={filter} className={styles.filter} />;
                    }
                    if (filter.filterType === 'list' || filter.filterType === 'list-multiple') {
                        return (
                            <FilterDropdown
                                key={filter.id}
                                filter={filter}
                                value={currentFilters[filter.id]}
                                onChange={(value) => handleFilterChange(filter.id, value)}
                                className={styles.filter}
                            />
                        );
                    }

                    return <div key={filter.id}>{filter.title}</div>;
                })}
            </div>
            <div className={styles.buttons}>
                <Button>Применить</Button>
                <Button variant={'outline'}>Сбросить фильтры</Button>
            </div>
        </div>
    );
};
