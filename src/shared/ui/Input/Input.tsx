'use client';

import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    suffixSlot?: ReactNode;
    variant?: 'default' | 'dark' | 'white';
    sizes?: 'sm' | 'md';
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    (
        { label, error, hint, suffixSlot, variant = 'default', type = 'text', sizes = 'md', className, ...props },
        ref,
    ) => {
        const id = useId();

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
                    <input type={type} id={id} className={styles.input} ref={ref} {...props} />
                    {suffixSlot}
                </div>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        );
    },
);

Input.displayName = 'Input';
