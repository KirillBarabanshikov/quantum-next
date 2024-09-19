'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

import styles from './Switch.module.scss';

interface ISwitchProps {
    isOn: boolean;
}

export const Switch: FC<ISwitchProps> = ({ isOn }) => {
    const [value, setValue] = useState(isOn);

    const handleOnClick = () => {
        const currentValue = !value;
        setValue(currentValue);
    };

    return (
        <motion.div className={clsx(styles.switch, value && styles.isOn)} onClick={handleOnClick} layout layoutRoot>
            <motion.div className={styles.handle} layout transition={{ type: 'easeOut', duration: 0.15 }} />
        </motion.div>
    );
};
