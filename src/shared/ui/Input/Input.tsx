'use client';

import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, useId, useState } from 'react';

import EyeHideIcon from '@/shared/assets/icons/eye_hide.svg';
import EyeShowIcon from '@/shared/assets/icons/eye_show.svg';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    theme?: 'white' | 'blue' | 'grey';
    extent?: 'sm' | 'md';
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({ label, hint, theme = 'grey', extent = 'sm', error, type = 'text', className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const id = useId();

        const currentType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className={clsx(styles.inputWrap, styles[theme], styles[extent], error && styles.isError, className)}>
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
                    {type === 'password' &&
                        (showPassword ? (
                            <div className={styles.eye}>
                                <EyeHideIcon onClick={() => setShowPassword(false)} />
                            </div>
                        ) : (
                            <div className={styles.eye}>
                                <EyeShowIcon onClick={() => setShowPassword(true)} />
                            </div>
                        ))}
                </div>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        );
    },
);

Input.displayName = 'Input';
