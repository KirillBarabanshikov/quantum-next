import { FC } from 'react';

import DislikeIcon from '@/shared/assets/icons/dislike.svg';
import StarIcon from '@/shared/assets/icons/grade-fill.svg';
import LikeIcon from '@/shared/assets/icons/like.svg';

import styles from './ReviewCard.module.scss';

interface IReviewCardProps {}

export const ReviewCard: FC<IReviewCardProps> = () => {
    return (
        <article className={styles.reviewCard}>
            <div className={styles.reviewWrap}>
                <div className={styles.wrap}>
                    <div className={styles.reviewer}>
                        Александр Козак
                        <time className={styles.date}>месяц назад</time>
                    </div>
                    <div className={styles.rating}>
                        <StarIcon />
                        <StarIcon />
                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.title}>Недостатки</div>
                    <div className={styles.text}>
                        Набор быстро пришел. Летает бодро. В качестве обучения очень хорош. Упал раз 200, но продолжает
                        летать{' '}
                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.title}>Достоинства</div>
                    <div className={styles.text}>
                        Набор быстро пришел. Летает бодро. В качестве обучения очень хорош. Упал раз 200, но продолжает
                        летать{' '}
                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.title}>Комментарий</div>
                    <div className={styles.text}>
                        Набор быстро пришел. Летает бодро. В качестве обучения очень хорош. Упал раз 200, но продолжает
                        летать{' '}
                    </div>
                </div>
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
