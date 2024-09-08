import clsx from 'clsx';

import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';
import { Badge, Button, IconButton, InputCounter } from '@/shared/ui';

import styles from './ProductInfo.module.scss';

export const ProductInfo = () => {
    return (
        <div className={styles.productInfo}>
            <h1 className={styles.name}>Набор BETAFPV Cetus Pro FPV Kit (RTF)</h1>
            <div className={styles.gradeContainer}>
                <GradeIcon />
                <span className={clsx(styles.grade, styles.info)}>4.4</span>
                <span className={styles.ellipse} />
                <span className={styles.info}>32 отзыва</span>
            </div>
            <div className={styles.info}>Артикул: 274916</div>
            <div className={styles.price}>29 990 ₽</div>
            <div className={styles.separator} />
            <div className={styles.tags}>
                <Badge text={'В наличии'} color={'#058943'} />
                <Badge text={'Отечественный производитель'} color={'#4733F4'} />
            </div>
            <div className={styles.specifications}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className={styles.specification}>
                        <p className={styles.specificationTitle}>Тип</p>
                        <p className={styles.specificationValue}>Квадрокоптер</p>
                    </div>
                ))}
            </div>
            <div className={styles.separator} />
            <div className={styles.equipments}>
                <p>Комплектация</p>
                <div className={styles.equipmentsList}>
                    <button className={clsx(styles.equipment, styles.selected)}>Комплект</button>
                    <button className={styles.equipment}>Только дрон</button>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button fullWidth>В КОРЗИНУ</Button>
                <InputCounter />
                <IconButton radius={'full'}>
                    <GradeIcon />
                </IconButton>
                <Button variant={'outline'} className={styles.shareButton}>
                    Поделиться
                    <ShareIcon />
                </Button>
            </div>
        </div>
    );
};
