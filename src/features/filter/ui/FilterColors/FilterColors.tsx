import clsx from 'clsx';
import { FC } from 'react';

import { IFilter } from '@/entities/filter';
import { Colorbox } from '@/shared/ui';

import styles from './FilterColors.module.scss';

export interface IFilterColors {
    filter: IFilter;
    value: string[];
    onChange: (value: string[]) => void;
    className?: string;
}

export const FilterColors: FC<IFilterColors> = ({ filter, value, onChange, className }) => {
    const handleOnChange = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    return (
        <div className={clsx(styles.filterColors, className)}>
            <div className={styles.title}>{filter.title}</div>
            <div className={styles.colors}>
                {filter.values.map((val) => (
                    <Colorbox
                        key={val}
                        selected={value.includes(val)}
                        onClick={() => handleOnChange(val)}
                        color={val}
                    />
                ))}
            </div>
        </div>
    );
};
