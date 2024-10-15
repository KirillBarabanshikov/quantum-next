import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { IReview } from '@/entities/review';
import DislikeIcon from '@/shared/assets/icons/dislike.svg';
import LikeIcon from '@/shared/assets/icons/like.svg';
import StarIcon from '@/shared/assets/icons/start_outline.svg';

import image from './image.png';
import styles from './ReviewCard.module.scss';

interface IReviewCardProps {
    review: IReview;
}

export const ReviewCard: FC<IReviewCardProps> = ({ review }) => {
    return (
        <article className={styles.reviewCard}>
            <div className={styles.reviewWrap}>
                <div className={styles.wrap}>
                    <div className={styles.reviewer}>
                        {review.user.username}
                        <time className={styles.date}>месяц назад</time>
                    </div>
                    <div className={styles.rating}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon key={index} className={clsx(index < review.rating && styles.fill)} />
                        ))}
                    </div>
                </div>
                {review.cons && (
                    <div className={styles.review}>
                        <div className={styles.title}>Недостатки</div>
                        <div className={styles.text}>{review.cons}</div>
                    </div>
                )}
                {review.pros && (
                    <div className={styles.review}>
                        <div className={styles.title}>Достоинства</div>
                        <div className={styles.text}>{review.pros}</div>
                    </div>
                )}
                {review.comment && (
                    <div className={styles.review}>
                        <div className={styles.title}>Комментарий</div>
                        <div className={styles.text}>{review.comment}</div>
                    </div>
                )}
                {review.images && (
                    <div className={styles.media}>
                        <Image src={image.src} width={130} height={160} alt={'media'} className={styles.image} />
                    </div>
                )}
            </div>
            <div className={styles.feedbackWrap}>
                <time className={styles.date}>месяц назад</time>
                <div className={styles.feedbacks}>
                    <div className={styles.feedback}>
                        <LikeIcon />
                        (5)
                    </div>
                    <div className={styles.feedback}>
                        <DislikeIcon />
                        (0)
                    </div>
                </div>
            </div>
        </article>
    );
};
