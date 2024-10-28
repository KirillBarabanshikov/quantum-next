import clsx from 'clsx';
import { FC } from 'react';

import styles from './Separator.module.scss';

interface ISeparatorProps {
    gap?: number;
    className?: string;
}

export const Separator: FC<ISeparatorProps> = ({ gap, className }) => {
    return <div className={clsx(styles.separator, className)} style={{ margin: `${gap}px 0` }} />;
};
