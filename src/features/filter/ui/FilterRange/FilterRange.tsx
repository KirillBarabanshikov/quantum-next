import clsx from 'clsx';
import { ChangeEvent, FC } from 'react';
import ReactSlider from 'react-slider';

import { IFilter } from '@/entities/filter';

import styles from './FilterRange.module.scss';

interface IFilterRangeProps {
    filter: IFilter;
    value: string[];
    onChange: (value: string[]) => void;
    className?: string;
}

export const FilterRange: FC<IFilterRangeProps> = ({ filter, value, onChange, className }) => {
    const min = +filter.values[0];
    const max = +filter.values[1];

    const handleOnChange = (newValues: number[]) => {
        onChange(newValues.map((value) => value.toString()));
    };

    const handleOnChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        const data = value.map((value) => +value);
        if (+e.target.value >= data[1]) data[0] = data[1] - 5;
        else if (+e.target.value < min) data[0] = min;
        else data[0] = +e.target.value;
        onChange(data.map((value) => value.toString()));
    };

    const handleOnChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        const data = [...value.map((value) => +value)];
        if (+e.target.value <= data[0]) data[1] = data[1] + 5;
        else if (+e.target.value > max) data[1] = max;
        else data[1] = +e.target.value;
        onChange(data.map((value) => value.toString()));
    };

    return (
        <div className={clsx(styles.filterRange, className)}>
            <div className={styles.title}>{filter.title}</div>
            <div className={styles.inputsWrap}>
                <div className={styles.input}>
                    <span>от</span>
                    <input value={value[0]} onChange={handleOnChangeMin} />
                </div>
                <div className={styles.input}>
                    <span>до</span>
                    <input value={value[1]} onChange={handleOnChangeMax} />
                </div>
            </div>
            <ReactSlider
                className={styles.horizontalSlider}
                thumbClassName={styles.thumb}
                trackClassName={styles.track}
                defaultValue={[min, max]}
                min={min}
                max={max}
                value={value.map((value) => +value)}
                onChange={handleOnChange}
                pearling
                minDistance={5}
            />
        </div>
    );
};
