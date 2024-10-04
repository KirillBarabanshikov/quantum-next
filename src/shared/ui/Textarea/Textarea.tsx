'use client';

import clsx from 'clsx';
import { forwardRef, TextareaHTMLAttributes, useId } from 'react';

import styles from './Textarea.module.scss';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
    ({ label, error, className, ...props }, ref) => {
        const id = useId();

        return (
            <div className={clsx(styles.textareaWrap, error && styles.isError, className)}>
                {label && (
                    <label htmlFor={id} className={styles.label}>
                        {label}
                    </label>
                )}
                <textarea id={id} className={styles.textarea} ref={ref} {...props} />
                {error && <div className={styles.error}>{error}</div>}
            </div>
        );
    },
);

Textarea.displayName = 'Input';
