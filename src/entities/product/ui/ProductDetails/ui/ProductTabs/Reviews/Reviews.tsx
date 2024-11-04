import { FC } from 'react';

import { IProduct } from '@/entities/product';
import { ReviewCard } from '@/entities/review';
import { CreateReviewButton } from '@/features/review';
import ArrowIcon from '@/shared/assets/icons/arrow_right.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import { getCountWord } from '@/shared/lib';

import styles from '../ProductTabs.module.scss';
import Image from 'next/image';
import { API_URL } from '@/shared/consts';

interface IReviewsProps {
    product: IProduct;
}

export const Reviews: FC<IReviewsProps> = ({ product }) => {
    return (
        <div className={styles.feedback}>
            <div className={styles.feedbackListWrap}>
                <div className={styles.list}>
                    <div className={styles.listTitle}>
                        Фото и видео пользователей
                        <ArrowIcon />
                    </div>
                    <div className={styles.mediaList}>
                        <Image
                            src={`${API_URL}/images/reviews/4-noyabrya-6724c92c1fced292297475.jpg`}
                            alt={'image'}
                            width={130}
                            height={120}
                            className={styles.media}
                        />
                    </div>
                </div>
                <div className={styles.feedbackList}>
                    {product.reviews.map((review) => {
                        return <ReviewCard key={review.id} review={review} />;
                    })}
                </div>
            </div>

            <div className={styles.reviewWrap}>
                <div className={styles.gradeWrap}>
                    <GradeIcon />
                    <div>{product.average}</div>
                    <div className={styles.ellipse} />
                    <div>{getCountWord(product.reviews.length, 'отзыв')}</div>
                </div>
                <CreateReviewButton productId={product.id} />
            </div>
        </div>
    );
};
