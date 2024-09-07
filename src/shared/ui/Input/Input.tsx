import clsx from 'clsx';
import { FC, InputHTMLAttributes, useId } from 'react';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
}

export const Input: FC<IInputProps> = ({ label, hint, className, ...props }) => {
    const id = useId();

    return (
        <div className={styles.inputWrap}>
            {label && (
                <div className={styles.labelWrap}>
                    <label htmlFor={id} className={styles.label}>
                        {label}
                    </label>
                    {hint && <span className={styles.hint}>{hint}</span>}
                </div>
            )}
            <input type='text' id={id} className={clsx(styles.input, className)} {...props} />
        </div>
    );
};
