'use client';

import { useState } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';

import styles from './InputCounter.module.scss';

export const InputCounter = () => {
    const [count, setCount] = useState(1);

    const increment = () => {
        setCount((prev) => prev + 1);
    };

    const decrement = () => {
        setCount((prev) => prev - 1);
    };

    return (
        <div className={styles.inputCounter}>
            <button onClick={decrement}>
                <MinusIcon />
            </button>
            <input type={'number'} value={`${count}`} onChange={(e) => setCount(+e.target.value)} />
            <button onClick={increment}>
                <PlusIcon />
            </button>
        </div>
    );
};
