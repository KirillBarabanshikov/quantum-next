import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline';
    theme?: 'blue' | 'white';
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<IButtonProps> = ({
    variant = 'solid',
    theme = 'blue',
    fullWidth = false,
    size = 'lg',
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[theme],
                fullWidth && styles.fullWidth,
                styles[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};
