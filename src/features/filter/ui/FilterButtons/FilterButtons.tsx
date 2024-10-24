import clsx from 'clsx';
import { FC } from 'react';

import { IFilter } from '@/entities/filter';

import styles from './FilterButton.module.scss';

export interface IFilterButtons {
    filter: IFilter;
    className?: string;
}

export const FilterButtons: FC<IFilterButtons> = ({ filter, className }) => {
    return (
        <div className={clsx(styles.filterButtons, className)}>
            <div className={clsx(styles.title)}>{filter.title}</div>
            <div className={styles.buttons}>
                {filter.values.map((val) => (
                    <button key={val} className={styles.button}>
                        {val}
                    </button>
                ))}
            </div>
        </div>
    );
};
