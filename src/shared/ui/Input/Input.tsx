'use client';

import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    suffixSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({ label, error, suffixSlot, type = 'text', className, ...props }, ref) => {
        const id = useId();

        return (
            <div className={clsx(styles.inputWrap, error && styles.isError, className)}>
                {label && (
                    <div className={styles.labelWrap}>
                        <label htmlFor={id} className={styles.label}>
                            {label}
                        </label>
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
