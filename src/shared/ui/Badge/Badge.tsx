import clsx from 'clsx';
import { FC } from 'react';

import CheckIcon from '@/shared/assets/icons/check_alt.svg';

import styles from './Badge.module.scss';

interface IBadgeProps {
    text: string;
    color: string;
}

export const Badge: FC<IBadgeProps> = ({ text, color }) => {
    return (
        <span className={clsx(styles.badge)}>
            <span className={styles.background} style={{ backgroundColor: color }} />
            <CheckIcon color={color} />
            <span className={styles.text} style={{ color }}>
                {text}
            </span>
        </span>
    );
};
