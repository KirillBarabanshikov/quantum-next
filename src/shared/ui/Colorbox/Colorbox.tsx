import clsx from 'clsx';
import { FC } from 'react';

import styles from './Colorbox.module.scss';

interface IColorboxProps {
    selected: boolean;
    onClick: () => void;
    color: string;
}

export const Colorbox: FC<IColorboxProps> = ({ selected, onClick, color }) => {
    return (
        <div className={clsx(styles.colorbox, selected && styles.selected)} onClick={onClick}>
            <div className={styles.color} style={{ backgroundColor: color }} />
        </div>
    );
};
