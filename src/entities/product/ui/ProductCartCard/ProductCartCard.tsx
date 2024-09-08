import Image from 'next/image';

import DeleteIcon from '@/shared/assets/icons/delete.svg';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import { Checkbox, IconButton, InputCounter } from '@/shared/ui';

import styles from './ProductCartCard.module.scss';

export const ProductCartCard = () => {
    return (
        <article className={styles.productCard}>
            <Checkbox />
            <Image
                src={
                    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                }
                width={129}
                height={114}
                alt={'product'}
                className={styles.image}
            />
            <div className={styles.body}>
                <div className={styles.wrap}>
                    <p className={styles.name}>Набор BETAFPV Cetus Pro FPV Kit (RTF)</p>
                    <p className={styles.price}>29 990 ₽</p>
                </div>
                <p className={styles.info}>Комплект</p>
                <p className={styles.info}>Артикул: 274916</p>
                <div className={styles.buttons}>
                    <IconButton size={'sm'}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton size={'sm'}>
                        <GradeIcon className={styles.gradeIcon} />
                    </IconButton>
                    <InputCounter size={'sm'} />
                </div>
            </div>
        </article>
    );
};
