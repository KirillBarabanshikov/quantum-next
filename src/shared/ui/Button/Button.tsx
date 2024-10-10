import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline';
    theme?: 'blue' | 'white';
    fullWidth?: boolean;
}

export const Button: FC<IButtonProps> = ({
    variant = 'solid',
    theme = 'blue',
    fullWidth,
    className,
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            className={clsx(styles.button, styles[variant], styles[theme], fullWidth && styles.fullWidth, className)}
        >
            {children}
        </button>
    );
};
