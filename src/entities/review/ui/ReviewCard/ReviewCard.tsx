import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';

import { useAuth } from '@/app/_providers/AuthProvider';
import { ISelectedMedia } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Reviews/Reviews';
import { IReview } from '@/entities/review';
import { apiClient } from '@/shared/api';
import DislikeIcon from '@/shared/assets/icons/dislike.svg';
import LikeIcon from '@/shared/assets/icons/like.svg';
import StarIcon from '@/shared/assets/icons/start_outline.svg';
import { API_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { VideoPreview } from '@/shared/ui/VideoPreview';

import styles from './ReviewCard.module.scss';

interface IReviewCardProps {
    review: IReview;
    setSelectedReviewId: Dispatch<SetStateAction<number | undefined>>;
    setSelectedMedia: Dispatch<SetStateAction<ISelectedMedia | undefined>>;
}

export const ReviewCard: FC<IReviewCardProps> = ({ review, setSelectedReviewId, setSelectedMedia }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const { slug } = useParams<{ slug: string }>();
    const queryClient = useQueryClient();
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    const { mutate: like } = useMutation({
        mutationFn: async () => {
            await apiClient.post('/reviews/like', { reviewId: review.id });
            await queryClient.invalidateQueries({ queryKey: ['product', slug] });
        },
    });
    const { mutate: dislike } = useMutation({
        mutationFn: async () => {
            await apiClient.post('/reviews/dislike', { reviewId: review.id });
            await queryClient.invalidateQueries({ queryKey: ['product', slug] });
        },
    });

    return (
        <article className={styles.reviewCard}>
            <div className={styles.reviewWrap}>
                <div className={styles.wrap}>
                    <div className={styles.reviewer}>
                        {review.user.username}
                        <time className={styles.date}></time>
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
                {(!!review.images.length || !!review.videos.length) && (
                    <div className={styles.media}>
                        {review.videos.map((video) => {
                            return (
                                <VideoPreview
                                    key={video.id}
                                    src={`${API_URL}${video.video}`}
                                    width={isMatch ? 90 : 130}
                                    height={isMatch ? 84 : 160}
                                    onClick={() => {
                                        setSelectedReviewId(review.id);
                                        setSelectedMedia({ id: video.id, type: 'video' });
                                    }}
                                    className={styles.video}
                                />
                            );
                        })}

                        {review.images.slice(0, 4 - review.videos.length).map((image, index) => (
                            <div key={image.id} className={styles.imageWrap}>
                                <Image
                                    src={`${API_URL}${image?.image}`}
                                    width={isMatch ? 90 : 130}
                                    height={isMatch ? 84 : 160}
                                    alt={'media'}
                                    className={styles.image}
                                    onClick={() => {
                                        setSelectedReviewId(review.id);
                                        setSelectedMedia({ id: image.id, type: 'image' });
                                    }}
                                />
                                {index + 1 === 4 - review.videos.length && (
                                    <div className={styles.badge}>
                                        +{review.images.length - (4 - review.videos.length)} фото
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.feedbackWrap}>
                <time className={styles.date}></time>
                <div className={styles.feedbacks}>
                    <div className={styles.feedback}>
                        <LikeIcon
                            onClick={() => (isAuthenticated ? like() : router.push('?auth=signin', { scroll: false }))}
                        />
                        ({review.likes})
                    </div>
                    <div className={styles.feedback}>
                        <DislikeIcon
                            onClick={() =>
                                isAuthenticated ? dislike() : router.push('?auth=signin', { scroll: false })
                            }
                        />
                        ({review.dislikes})
                    </div>
                </div>
            </div>
        </article>
    );
};
