import clsx from 'clsx';
import { FC } from 'react';

import { Button } from '@/shared/ui';

import styles from './Filters.module.scss';

interface IFiltersProps {
    className?: string;
}

export const Filters: FC<IFiltersProps> = ({ className }) => {
    return (
        <div className={clsx(styles.filters, className)}>
            <div className={styles.buttons}>
                <Button>Применить</Button>
                <Button variant={'outline'}>Сбросить фильтры</Button>
            </div>
        </div>
    );
};
