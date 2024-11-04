import { FC } from 'react';

import { IProduct } from '@/entities/product';

import styles from '../ProductTabs.module.scss';

interface ICharacteristicsProps {
    product: IProduct;
}

export const Characteristics: FC<ICharacteristicsProps> = ({ product }) => {
    return (
        <div className={styles.specifications}>
            {product.characteristics.map((characteristic) => {
                return (
                    <div key={characteristic.id} className={styles.specification}>
                        <div className={styles.title}>{characteristic.title}</div>
                        <div className={styles.value}>
                            {characteristic.value} {characteristic?.categoryCharacteristic?.measurement}
                        </div>
                    </div>
                );
            })}
            {product.additionalCharacteristics.map((characteristic) => {
                return (
                    <div key={characteristic.id} className={styles.specification}>
                        <div className={styles.title}>{characteristic.title}</div>
                        <div className={styles.value}>{characteristic.value}</div>
                    </div>
                );
            })}
        </div>
    );
};
