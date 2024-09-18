import styles from './Separator.module.scss';
import { FC } from 'react';
import clsx from 'clsx';

interface ISeparatorProps {
    className?: string;
}

export const Separator: FC<ISeparatorProps> = ({ className }) => {
    return <div className={clsx(styles.separator, className)} />;
};
