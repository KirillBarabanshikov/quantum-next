import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, useId } from 'react';

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
        const id = useId();

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
                <input type={type} id={id} className={styles.input} ref={ref} {...props} />
                {error && <div className={styles.error}>{error}</div>}
            </div>
        );
    },
);

Input.displayName = 'Input';
