import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, FC, Fragment, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { filterApi, IFilter } from '@/entities/filter';
import { TProductFilters } from '@/entities/product';
import { FilterButtons } from '@/features/filter/ui/FilterButtons';
import { FilterColors } from '@/features/filter/ui/FilterColors';
import { FilterDropdown } from '@/features/filter/ui/FilterDropdown';
import { FilterList } from '@/features/filter/ui/FilterList';
import { FilterRange } from '@/features/filter/ui/FilterRange';
import { FilterSwitcher } from '@/features/filter/ui/FilterSwitcher';
import { PickedFilter } from '@/features/filter/ui/PickedFilter';
import FilterIcon from '@/shared/assets/icons/filter.svg';
import SortIcon from '@/shared/assets/icons/sort.svg';
import { MAX_WIDTH_LG, sortOptions } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { BottomSheet, Button, Radio } from '@/shared/ui';

import styles from './TopFilters.module.scss';

interface ITopFiltersProps {
    categoryId: number;
    currentFilters: TProductFilters | undefined;
    setCurrentFilters: Dispatch<SetStateAction<TProductFilters | undefined>>;
    sort?: string;
    setSort?: Dispatch<SetStateAction<string>>;
    className?: string;
}

export const TopFilters: FC<ITopFiltersProps> = ({
    categoryId,
    currentFilters,
    setCurrentFilters,
    sort,
    setSort,
    className,
}) => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_LG);

    const { data: filters } = useQuery({
        queryKey: ['filters', categoryId],
        queryFn: () => filterApi.fetchFilters(categoryId),
    });

    return (
        <div className={clsx(styles.topFilters, className)}>
            {isMatch ? (
                <MobileFilters
                    filters={filters}
                    currentFilters={currentFilters}
                    setCurrentFilters={setCurrentFilters}
                    sort={sort}
                    setSort={setSort}
                />
            ) : (
                <DesktopFilters
                    filters={filters}
                    currentFilters={currentFilters}
                    setCurrentFilters={setCurrentFilters}
                />
            )}
        </div>
    );
};

const DesktopFilters: FC<{
    filters?: IFilter[];
    currentFilters: TProductFilters | undefined;
    setCurrentFilters: Dispatch<SetStateAction<TProductFilters | undefined>>;
}> = ({ filters, setCurrentFilters, currentFilters }) => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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

        const newParams = new URLSearchParams(searchParams.toString());

        newParams.delete(`filters[${filterId}]`);

        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    useEffect(() => {
        if (!currentFilters || !filters) return;
        setShow(false);

        filters.forEach((filter) => {
            if (currentFilters[filter.id].value.length && searchParams.get(`filters[${filter.id}]`)) {
                return setShow(true);
            }
        });
    }, [currentFilters, filters]);

    return (
        <>
            {currentFilters &&
                filters?.map((filter) => {
                    const value = currentFilters[filter.id].value;

                    if (!value.length || !searchParams.get(`filters[${filter.id}]`)) {
                        return <Fragment key={filter.id} />;
                    }

                    return (
                        <PickedFilter key={filter.id} active={true} onClick={() => resetOne(filter.id)}>
                            <span>{filter.title}</span>
                        </PickedFilter>
                    );
                })}
            {show && (
                <PickedFilter onClick={resetAll}>
                    <span>Очистить все</span>
                </PickedFilter>
            )}
        </>
    );
};

const MobileFilters: FC<{
    filters?: IFilter[];
    currentFilters: TProductFilters | undefined;
    setCurrentFilters: Dispatch<SetStateAction<TProductFilters | undefined>>;
    sort?: string;
    setSort?: Dispatch<SetStateAction<string>>;
}> = ({ filters, setCurrentFilters, currentFilters, sort, setSort }) => {
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const [currentSort, setCurrentSort] = useState(sort);
    const router = useRouter();
    const searchParams = useSearchParams();

    const filtersByType = (filter: IFilter, single?: boolean) => {
        if (!currentFilters) return <></>;

        if (filter.filterType === 'checkboxes' || filter.filterType === 'radio') {
            return (
                <FilterList
                    key={filter.id}
                    filter={filter}
                    value={currentFilters[filter.id].value}
                    onChange={(value) => handleFilterChange(filter.id, value)}
                    className={styles.filter}
                    opened
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
                    opened={single}
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
    };

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
                newParams.set(`filters[${filterId}]`, value.join(','));
            } else {
                newParams.delete(`filters[${filterId}]`);
            }
        }

        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    return (
        <>
            <PickedFilter onClick={() => setIsOpenSort(true)} withIcon={false}>
                <SortIcon />
            </PickedFilter>
            <PickedFilter onClick={() => setIsOpenFilters(true)} withIcon={false}>
                <FilterIcon /> <span>Фильтр</span>
            </PickedFilter>
            {filters?.map((filter) => {
                return (
                    <FilterWithBottomSheet
                        key={filter.id}
                        filter={filter}
                        filtersByType={filtersByType}
                        applyFilters={applyFilters}
                        currentFilters={currentFilters}
                        setCurrentFilters={setCurrentFilters}
                    />
                );
            })}
            <BottomSheet
                isOpen={isOpenSort}
                onClose={() => {
                    setIsOpenSort(false);
                    setCurrentSort(sort);
                }}
                title={'Сортировка'}
            >
                <div className={styles.options}>
                    {sortOptions.map((option, index) => {
                        return (
                            <Radio
                                key={index}
                                label={option.label}
                                variant={'filters'}
                                name={'sort'}
                                value={option.value}
                                checked={option.value === currentSort}
                                onChange={(e) => setCurrentSort(e.target.value)}
                            />
                        );
                    })}
                    <Button
                        fullWidth
                        className={styles.button}
                        onClick={() => {
                            setSort && setSort(currentSort || '');
                            setIsOpenSort(false);
                        }}
                    >
                        Применить
                    </Button>
                </div>
            </BottomSheet>
            <BottomSheet isOpen={isOpenFilters} onClose={() => setIsOpenFilters(false)} title={'Фильтры'} fullHeight>
                {currentFilters && filters?.map((filter) => filtersByType(filter))}
                <Button
                    fullWidth
                    className={styles.button}
                    onClick={() => {
                        applyFilters();
                        setIsOpenFilters(false);
                    }}
                >
                    Применить
                </Button>
            </BottomSheet>
        </>
    );
};

const FilterWithBottomSheet: FC<{
    filter: IFilter;
    filtersByType: (filter: IFilter, single: boolean) => ReactNode;
    applyFilters: () => void;
    currentFilters: TProductFilters | undefined;
    setCurrentFilters: Dispatch<SetStateAction<TProductFilters | undefined>>;
}> = ({ filter, filtersByType, applyFilters, currentFilters, setCurrentFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const active = !!(currentFilters
        ? currentFilters[filter.id].value.length && searchParams.get(`filters[${filter.id}]`)
        : undefined);

    return (
        <Fragment>
            <PickedFilter
                onClick={() => {
                    if (active) {
                        setCurrentFilters((prev) => {
                            if (!prev) return;

                            return { ...prev, [filter.id]: { ...prev[filter.id], value: [] } };
                        });

                        const newParams = new URLSearchParams(searchParams.toString());

                        newParams.delete(`filters[${filter.id}]`);

                        router.push(`?${newParams.toString()}`, { scroll: false });
                    } else {
                        setIsOpen(true);
                    }
                }}
                withIcon={active}
                active={active}
            >
                {filter.title}
            </PickedFilter>
            <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title={'Фильтры'}>
                {filtersByType(filter, true)}
                <Button
                    fullWidth
                    className={styles.button}
                    onClick={() => {
                        applyFilters();
                        setIsOpen(false);
                    }}
                >
                    Применить
                </Button>
            </BottomSheet>
        </Fragment>
    );
};
