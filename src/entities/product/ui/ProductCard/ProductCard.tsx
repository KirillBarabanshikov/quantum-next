import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import GradeIcon from '@/shared/assets/icons/grade-outline.svg';
import { Button } from '@/shared/ui';

import { IProduct } from '../../model';
import styles from './ProductCard.module.scss';

interface IProductCardProps {
    product?: IProduct;
}

export const ProductCard: FC<IProductCardProps> = () => {
    return (
        <article className={styles.productCard}>
            <div className={styles.productImage}>
                <Link href={'/product'}>
                    <Image
                        src={
                            'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                        }
                        width={300}
                        height={300}
                        alt={'product'}
                    />
                </Link>
                <GradeIcon className={clsx(styles.grade, styles.active)} />
            </div>
            <Link href={'/product'} className={styles.productTitle}>
                Рама квадрокоптера Cetus X (BETAFPV)
            </Link>
            <p className={styles.productPrice}>1 117 ₽</p>
            <Button variant={'outline'} fullWidth>
                В КОРЗИНУ
            </Button>
        </article>
    );
};
