import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import CheckboxIcon from '@/shared/assets/icons/priority.svg';

import styles from './Checkbox.module.scss';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(({ label, className, ...props }, ref) => {
    return (
        <label className={clsx(styles.wrap, className)}>
            <input type='checkbox' ref={ref} {...props} />
            <span className={styles.checkbox}>
                <CheckboxIcon />
            </span>
            <span className={styles.label}>{label}</span>
        </label>
    );
});

Checkbox.displayName = 'Checkbox';
