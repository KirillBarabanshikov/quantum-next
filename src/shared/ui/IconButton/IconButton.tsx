import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './IconButton.module.scss';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md';
    radius?: 'sm' | 'full';
}

export const IconButton: FC<IIconButtonProps> = ({ size = 'md', radius = 'sm', children, className, ...props }) => {
    return (
        <button
            className={clsx(styles.iconButton, styles[`size-${size}`], styles[`radius-${radius}`], className)}
            {...props}
        >
            {children}
        </button>
    );
};
