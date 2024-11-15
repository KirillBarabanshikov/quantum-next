import Image from 'next/image';
import { FC, useState } from 'react';

import { IProduct } from '@/entities/product';
import { ReviewCard } from '@/entities/review';
import { CreateReviewButton } from '@/features/review';
import ArrowIcon from '@/shared/assets/icons/arrow_right.svg';
import StarIcon from '@/shared/assets/icons/star.svg';
import { API_URL } from '@/shared/consts';
import { getCountWord } from '@/shared/lib';
import { FullScreen } from '@/shared/ui';

import styles from './Reviews.module.scss';

interface IReviewsProps {
    product: IProduct;
}

export const Reviews: FC<IReviewsProps> = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={styles.reviewsWrap}>
                <div>
                    <div className={styles.rateWrap}>
                        <StarIcon />
                        <span>{product.average}</span>
                    </div>
                    <div className={styles.reviewsCount}>{getCountWord(product.reviews.length, 'отзыв')}</div>
                </div>
                <div className={styles.imagesWrap}>
                    <div className={styles.images}>
                        {product.mediaReviews.images.slice(0, 3).map((image) => {
                            return (
                                <Image
                                    key={image.id}
                                    src={`${API_URL}/${image.image}`}
                                    width={45}
                                    height={45}
                                    alt={'review image'}
                                    className={styles.image}
                                />
                            );
                        })}
                    </div>
                    <ArrowIcon />
                </div>
            </div>
            <FullScreen
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={'Оценки и отзывы'}
                withCloseIcon={false}
                withBackIcon
            >
                <div className={styles.reviews}>
                    <div className={styles.reviewsRate}>
                        <StarIcon />
                        <div className={styles.average}>{product.average}</div>
                        <div className={styles.reviewsCount}>{getCountWord(product.reviews.length, 'отзыв')}</div>
                    </div>
                    <CreateReviewButton productId={product.id} className={styles.reviewButton} />

                    <div className={styles.reviewsList}>
                        {product.reviews.map((review) => {
                            return (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    setSelectedReviewId={() => {}}
                                    setSelectedMedia={() => {}}
                                />
                            );
                        })}
                    </div>
                </div>
            </FullScreen>
        </>
    );
};
