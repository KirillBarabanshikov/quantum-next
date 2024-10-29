import clsx from 'clsx';
import { FC } from 'react';

import styles from './Separator.module.scss';

interface ISeparatorProps {
    margin?: string;
    className?: string;
}

export const Separator: FC<ISeparatorProps> = ({ margin = '24px 0', className }) => {
    return <div className={clsx(styles.separator, className)} style={{ margin: margin }} />;
};
