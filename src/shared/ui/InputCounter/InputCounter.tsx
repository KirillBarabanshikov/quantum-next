'use client';

import clsx from 'clsx';
import { FC, useState } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';

import styles from './InputCounter.module.scss';

interface IInputCounterProps {
    size?: 'sm' | 'md';
    onIncrement?: (count: number) => void;
    onDecrement?: (count: number) => void;
    defaultCount?: number;
    className?: string;
}

export const InputCounter: FC<IInputCounterProps> = ({
    size = 'md',
    onIncrement,
    onDecrement,
    defaultCount = 1,
    className,
}) => {
    const [count, setCount] = useState(defaultCount);

    const increment = () => {
        const newCount = count + 1;
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

    return (
        <div className={clsx(styles.inputCounter, styles[size], className)}>
            <button onClick={decrement} className={clsx(count === 1 && styles.disabled)}>
                <MinusIcon />
            </button>
            <input type={'number'} value={`${count}`} onChange={(e) => setCount(+e.target.value)} />
            <button onClick={increment}>
                <PlusIcon />
            </button>
        </div>
    );
};
