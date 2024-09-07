import clsx from 'clsx';

import { Button } from '@/shared/ui';

import styles from './FilterByCategory.module.scss';

export const FilterByCategory = () => {
    return (
        <div className={clsx(styles.categories, 'container', 'scrollable')}>
            {Array.from({ length: 7 }).map((_, index) => {
                return (
                    <Button key={index} variant={'outline'} size={'md'}>
                        Приемники
                    </Button>
                );
            })}
        </div>
    );
};
