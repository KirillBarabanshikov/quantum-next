import clsx from 'clsx';
import { FC } from 'react';

import styles from './Separator.module.scss';

interface ISeparatorProps {
    className?: string;
}

export const Separator: FC<ISeparatorProps> = ({ className }) => {
    return <div className={clsx(styles.separator, className)} />;
};
