import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { filterApi } from '@/entities/filter';
import { TProductFilters } from '@/entities/product';
import { Button } from '@/shared/ui';

import { FilterButtons } from '../FilterButtons';
import { FilterColors } from '../FilterColors';
import { FilterDropdown } from '../FilterDropdown';
import { FilterList } from '../FilterList';
import { FilterRange } from '../FilterRange';
import { FilterSwitcher } from '../FilterSwitcher';
import styles from './Filters.module.scss';

interface IFiltersProps {
    categoryId: number;
    currentFilters: TProductFilters | undefined;
    setCurrentFilters: Dispatch<SetStateAction<TProductFilters | undefined>>;
    className?: string;
}

export const Filters: FC<IFiltersProps> = ({ categoryId, currentFilters, setCurrentFilters, className }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { data: filters } = useQuery({
        queryKey: ['filters', categoryId],
        queryFn: () => filterApi.fetchFilters(categoryId),
    });

    useEffect(() => {
        if (!filters) return;

        setCurrentFilters(
            filters.reduce((acc, filter) => {
                acc[filter.id] = {
                    value: searchParams.get(`filters[${filter.id}]`)?.split('&&') || [],
                    type: filter.filterType,
                };
                return acc;
            }, {} as TProductFilters),
        );
    }, [filters, searchParams, setCurrentFilters]);

    const handleFilterChange = (filterId: number, value: string[]) => {
        setCurrentFilters((prev) => {
            if (!prev) return prev;
            return { ...prev, [filterId]: { ...prev[filterId], value } };
        });
    };

    const applyFilters = () => {
        if (!currentFilters) return;

        const newParams = new URLSearchParams(searchParams.toString());

        for (const filterId in currentFilters) {
            const value = currentFilters[filterId].value;
            if (value[0]) {
                newParams.set(`filters[${filterId}]`, value.join('&&'));
            } else {
                newParams.delete(`filters[${filterId}]`);
            }
        }

        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    const resetFilters = () => {
        if (!filters) return;

        setCurrentFilters(
            filters.reduce((acc, filter) => {
                acc[filter.id] = { value: [], type: filter.filterType };
                return acc;
            }, {} as TProductFilters),
        );

        router.push(pathname, { scroll: false });
    };

    return (
        <div className={clsx(styles.filters, className)}>
            <div className={styles.filtersList}>
                {currentFilters &&
                    filters?.map((filter) => {
                        if (filter.filterType === 'checkboxes' || filter.filterType === 'radio') {
                            return (
                                <FilterList
                                    key={filter.id}
                                    filter={filter}
                                    value={currentFilters[filter.id].value}
                                    onChange={(value) => handleFilterChange(filter.id, value)}
                                    className={styles.filter}
                                />
                            );
                        }
                        if (filter.filterType === 'range' || filter.filterType === 'price') {
                            return (
                                <FilterRange
                                    key={filter.id}
                                    filter={filter}
                                    value={currentFilters[filter.id].value}
                                    onChange={(value) => handleFilterChange(filter.id, value)}
                                    className={styles.filter}
                                />
                            );
                        }
                        if (filter.filterType === 'list' || filter.filterType === 'list-multiple') {
                            return (
                                <FilterDropdown
                                    key={filter.id}
                                    filter={filter}
                                    value={currentFilters[filter.id].value}
                                    onChange={(value) => handleFilterChange(filter.id, value)}
                                    className={styles.filter}
                                />
                            );
                        }
                        if (filter.filterType === 'buttons') {
                            return (
                                <FilterButtons
                                    key={filter.id}
                                    filter={filter}
                                    value={currentFilters[filter.id].value}
                                    onChange={(value) => handleFilterChange(filter.id, value)}
                                    className={styles.filter}
                                />
                            );
                        }
                        if (filter.filterType === 'switcher') {
                            return (
                                <FilterSwitcher
                                    key={filter.id}
                                    filter={filter}
                                    value={currentFilters[filter.id].value}
                                    onChange={(value) => handleFilterChange(filter.id, value)}
                                    className={styles.filter}
                                />
                            );
                        }
                        if (filter.filterType === 'colors') {
                            return (
                                <FilterColors
                                    key={filter.id}
                                    filter={filter}
                                    value={currentFilters[filter.id].value}
                                    onChange={(value) => handleFilterChange(filter.id, value)}
                                    className={styles.filter}
                                />
                            );
                        }

                        return <div key={filter.id}>{filter.filterType}</div>;
                    })}
            </div>
            <div className={styles.buttons}>
                <Button onClick={applyFilters}>Применить</Button>
                <Button variant={'outline'} onClick={resetFilters}>
                    Сбросить фильтры
                </Button>
            </div>
        </div>
    );
};
