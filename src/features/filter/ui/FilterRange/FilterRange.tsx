import clsx from 'clsx';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
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
    const [values, setValues] = useState([min, max]);

    const handleOnChange = useCallback(
        (newValues: number[]) => {
            onChange(newValues.map((val) => val.toString()));
            setValues(newValues);
        },
        [onChange],
    );

    useEffect(() => {
        if (value.length) return;
        setValues([min, max]);
    }, [value]);

    const handleInputChange = useCallback((index: 0 | 1, e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.target.value;
        setValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            return updatedValues;
        });
    }, []);

    const handleOnBlur = () => {
        const [minValue, maxValue] = values;

        const correctedValues = [
            Math.max(min, Math.min(minValue, maxValue)),
            Math.min(max, Math.max(maxValue, minValue)),
        ];
        setValues(correctedValues);
        onChange(correctedValues.map((val) => val.toString()));
    };

    return (
        <div className={clsx(styles.filterRange, className)}>
            <div className={styles.title}>{filter.title}</div>
            <div className={styles.inputsWrap}>
                <div className={styles.input}>
                    <span>от</span>
                    <input
                        type={'number'}
                        value={values[0]}
                        onChange={(e) => handleInputChange(0, e)}
                        onBlur={handleOnBlur}
                    />
                </div>
                <div className={styles.input}>
                    <span>до</span>
                    <input
                        type={'number'}
                        value={values[1]}
                        onChange={(e) => handleInputChange(1, e)}
                        onBlur={handleOnBlur}
                    />
                </div>
            </div>
            <ReactSlider
                className={styles.horizontalSlider}
                thumbClassName={styles.thumb}
                trackClassName={styles.track}
                defaultValue={[min, max]}
                min={min}
                max={max}
                value={values}
                onChange={handleOnChange}
                pearling
                minDistance={1}
            />
        </div>
    );
};
