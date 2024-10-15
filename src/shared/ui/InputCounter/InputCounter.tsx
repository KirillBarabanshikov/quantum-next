'use client';

import clsx from 'clsx';
import { ChangeEvent, FC, useState } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';

import styles from './InputCounter.module.scss';

interface IInputCounterProps {
    size?: 'sm' | 'md';
    onIncrement?: (count: number) => void;
    onDecrement?: (count: number) => void;
    defaultCount?: number;
    max?: number;
    className?: string;
}

export const InputCounter: FC<IInputCounterProps> = ({
    size = 'md',
    onIncrement,
    onDecrement,
    defaultCount = 1,
    max,
    className,
}) => {
    const [count, setCount] = useState(defaultCount);

    const increment = () => {
        let newCount = count + 1;
        if (max && newCount >= max) newCount = max;
        setCount(newCount);
        onIncrement && onIncrement(newCount);
    };

    const decrement = () => {
        const newCount = count - 1;
        if (newCount > 0) {
            setCount(newCount);
            onDecrement && onDecrement(newCount);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let count = +e.target.value;
        if (max && count >= max) count = max;
        setCount(count);
    };

    return (
        <div className={clsx(styles.inputCounter, styles[size], className)}>
            <button onClick={decrement} className={clsx(count <= 1 && styles.disabled)}>
                <MinusIcon />
            </button>
            <input type={'number'} value={`${count}`} onChange={handleChange} />
            <button onClick={increment} className={clsx(max && count >= max && styles.disabled)}>
                <PlusIcon />
            </button>
        </div>
    );
};
