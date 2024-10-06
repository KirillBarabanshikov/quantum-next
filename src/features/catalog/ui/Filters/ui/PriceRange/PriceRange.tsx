import { ChangeEvent, FC, useState } from 'react';
import ReactSlider from 'react-slider';

import styles from './PriceRange.module.scss';

interface IRangeProps {
    min: number;
    max: number;
    onChange: (values: number[]) => void;
}

export const Range: FC<IRangeProps> = ({ min, max, onChange }) => {
    const [values, setValues] = useState([min, max]);

    const handleOnChange = (newValues: number[]) => {
        setValues(newValues);
        onChange(newValues);
    };

    const handleOnChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        const data = [...values];
        if (+e.target.value >= data[1]) data[0] = data[1] - 5;
        else if (+e.target.value < min) data[0] = min;
        else data[0] = +e.target.value;
        setValues(data);
    };

    const handleOnChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        const data = [...values];
        if (+e.target.value <= data[0]) data[1] = data[1] + 5;
        else if (+e.target.value > max) data[1] = max;
        else data[1] = +e.target.value;
        setValues(data);
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.inputsWrap}>
                <div className={styles.input}>
                    <span>от</span>
                    <input value={values[0]} onChange={handleOnChangeMin} />
                </div>
                <div className={styles.input}>
                    <span>до</span>
                    <input value={values[1]} onChange={handleOnChangeMax} />
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
                minDistance={5}
            />
        </div>
    );
};
