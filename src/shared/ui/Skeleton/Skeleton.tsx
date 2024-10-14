import clsx from 'clsx';
import { FC } from 'react';

import styles from './Skeleton.module.scss';

interface ISkeletonProps {
    width?: number;
    height?: number;
    className?: string;
}

export const Skeleton: FC<ISkeletonProps> = ({ className, height, width }) => {
    return <div className={clsx(styles.skeleton, className)} style={{ height: height, width: width }} />;
};
