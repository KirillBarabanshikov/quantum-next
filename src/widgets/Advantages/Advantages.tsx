import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

import ExchangeIcon from '@/shared/assets/icons/exchange.svg';
import ShieldIcon from '@/shared/assets/icons/shield.svg';
import ShippingIcon from '@/shared/assets/icons/shipping.svg';

import styles from './Advantages.module.scss';

interface IAdvantagesProps {
    className?: string;
}

export const Advantages: FC<IAdvantagesProps> = ({ className }) => {
    return (
        <div className={clsx(styles.advantages, className)}>
            <div className={'container'}>
                <div className={styles.advantagesList}>
                    {advantagesList.map((advantage, index) => {
                        return (
                            <div key={index} className={styles.advantage}>
                                <div className={styles.icon}>{advantage.icon}</div>
                                <div className={styles.advantageBody}>
                                    <p className={styles.title}>{advantage.title}</p>
                                    <Link href={advantage.link} className={styles.link}>
                                        Подробнее
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const advantagesList = [
    { icon: <ExchangeIcon />, title: 'Возврат и обмен в течение 7 дней', link: '/' },
    { icon: <ShippingIcon />, title: 'Доставка по всей России и СНГ', link: '/' },
    { icon: <ShieldIcon />, title: 'Отечественные производители', link: '/' },
];
