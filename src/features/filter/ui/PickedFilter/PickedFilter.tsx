import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

import ClearIcon from '@/shared/assets/icons/close.svg';

import styles from './PickedFilter.module.scss';

interface IPickedFilterProps extends PropsWithChildren {
    active?: boolean;
    onClick: () => void;
    withIcon?: boolean;
}

export const PickedFilter: FC<IPickedFilterProps> = ({ active = false, onClick, withIcon = true, children }) => {
    return (
        <div onClick={onClick} className={clsx(styles.pickedFilter, active && styles.active)}>
            {children}
            {withIcon && <ClearIcon className={styles.icon} />}
        </div>
    );
};
