import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import styles from './Radio.module.scss';

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Radio = forwardRef<HTMLInputElement, IRadioProps>(({ label, className, ...props }, ref) => {
    return (
        <label className={clsx(styles.wrap, className)}>
            <input type={'radio'} ref={ref} {...props} />
            <span className={clsx(styles.radio)}>
                <div className={styles.ellipse} />
            </span>
            <span className={styles.label}>{label}</span>
        </label>
    );
});

Radio.displayName = 'Radio';
