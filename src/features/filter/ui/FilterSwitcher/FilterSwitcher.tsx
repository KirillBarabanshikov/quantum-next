import clsx from 'clsx';
import { FC } from 'react';

import { IFilter } from '@/entities/filter';
import { Switch } from '@/shared/ui';

import styles from './FilterSwitcher.module.scss';

interface IFilterSwitcherProps {
    filter: IFilter;
    value: string[];
    onChange: (value: string[]) => void;
    className?: string;
}

export const FilterSwitcher: FC<IFilterSwitcherProps> = ({ filter, value, onChange, className }) => {
    const handleOnChange = () => {
        onChange(!!value[0] ? [] : ['1']);
    };

    return (
        <div className={clsx(styles.filterSwitcher, className)}>
            <div className={styles.title}>{filter.title}</div>
            <Switch isOn={!!value[0]} onClick={handleOnChange} />
        </div>
    );
};
