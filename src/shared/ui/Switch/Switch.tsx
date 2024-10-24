import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

import styles from './Switch.module.scss';

interface ISwitchProps {
    isOn: boolean;
    onClick: () => void;
}

export const Switch: FC<ISwitchProps> = ({ isOn, onClick }) => {
    return (
        <motion.div className={clsx(styles.switch, isOn && styles.isOn)} onClick={onClick} layout layoutRoot>
            <motion.div className={styles.handle} layout transition={{ type: 'easeOut', duration: 0.15 }} />
        </motion.div>
    );
};
