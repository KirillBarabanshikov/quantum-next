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
    type = 'button',
    children,
    className,
    ...props
}) => {
    return (
        <button
            type={type}
            className={clsx(
                className,
                styles.button,
                styles[variant],
                styles[theme],
                fullWidth && styles.fullWidth,
                styles[size],
            )}
            {...props}
        >
            {children}
        </button>
    );
};
