import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import styles from './Colors.module.scss';

interface IColorsProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value: string
}

export const Colors = forwardRef<HTMLInputElement, IColorsProps>(({ className, value, ...props }, ref) => {

    return (
        <label className={clsx(styles.colors, className)}>
            <input type={'checkbox'} ref={ref} {...props} />
            <span className={clsx(styles.radio)}>
                <div className={styles.ellipse} style={{backgroundColor: value}}/>
            </span>
        </label>
    );
});

Colors.displayName = 'Colors';
