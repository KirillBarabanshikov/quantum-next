import clsx from 'clsx';
import { FC } from 'react';

import { IFilter } from '@/entities/filter';

import styles from './FilterButton.module.scss';

export interface IFilterButtons {
    filter: IFilter;
    value: string[];
    onChange: (value: string[]) => void;
    className?: string;
}

export const FilterButtons: FC<IFilterButtons> = ({ filter, value, onChange, className }) => {
    const handleOnChange = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    return (
        <div className={clsx(styles.filterButtons, className)}>
            <div className={clsx(styles.title)}>{filter.title}</div>
            <div className={styles.buttons}>
                {filter.values.map((val) => (
                    <button
                        key={val}
                        onClick={() => handleOnChange(val)}
                        className={clsx(styles.button, value.includes(val) && styles.selected)}
                    >
                        <span>{val}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
