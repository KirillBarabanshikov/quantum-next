'use client';

import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode, useId, useState } from 'react';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import EyeHiddenIcon from '@/shared/assets/icons/eye_hidden.svg';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    suffixSlot?: ReactNode;
    variant?: 'default' | 'dark' | 'white';
    sizes?: 'sm' | 'md';
    showErrorText?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    (
        {
            label,
            error,
            hint,
            suffixSlot,
            variant = 'default',
            type = 'text',
            sizes = 'md',
            showErrorText = true,
            className,
            ...props
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const id = useId();
        const currentType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className={clsx(styles.inputWrap, styles[variant], styles[sizes], error && styles.isError, className)}>
                {label && (
                    <div className={styles.labelWrap}>
                        <label htmlFor={id} className={styles.label}>
                            {label}
                        </label>
                        {hint && <span className={styles.hint}>{hint}</span>}
                    </div>
                )}
                <div className={styles.inputContainer}>
                    <input type={currentType} id={id} className={styles.input} ref={ref} {...props} />
                    {suffixSlot}
                    {type === 'password' &&
                        (showPassword ? (
                            <EyeHiddenIcon onClick={() => setShowPassword((prev) => !prev)} className={styles.eye} />
                        ) : (
                            <EyeIcon onClick={() => setShowPassword((prev) => !prev)} className={styles.eye} />
                        ))}
                </div>
                {error && showErrorText && <div className={styles.error}>{error}</div>}
            </div>
        );
    },
);

Input.displayName = 'Input';
