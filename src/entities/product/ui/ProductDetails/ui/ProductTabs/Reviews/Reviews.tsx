import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { IProduct } from '@/entities/product';
import { reviewApi, ReviewCard, ReviewDetail } from '@/entities/review';
import { CreateReviewButton } from '@/features/review';
import ArrowIcon from '@/shared/assets/icons/arrow_right.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import { API_URL } from '@/shared/consts';
import { getCountWord } from '@/shared/lib';
import { FullScreen } from '@/shared/ui';
import { VideoPreview } from '@/shared/ui/VideoPreview';

import styles from '../ProductTabs.module.scss';

export interface ISelectedMedia {
    id: number;
    type: 'image' | 'video';
}

interface IReviewsProps {
    product: IProduct;
}

export const Reviews: FC<IReviewsProps> = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState<number | undefined>();
    const [selectedMedia, setSelectedMedia] = useState<ISelectedMedia>();

    const { data: review } = useQuery({
        queryKey: ['review', selectedReviewId],
        queryFn: () => (selectedReviewId ? reviewApi.fetchReviewById(selectedReviewId) : undefined),
        enabled: !!selectedReviewId,
    });

    useEffect(() => {
        setIsOpen(!!selectedReviewId);
    }, [selectedReviewId]);

    return (
        <div className={styles.feedback}>
            <div className={styles.feedbackListWrap}>
                {(!!product.mediaReviews.videos.length || !!product.mediaReviews.images.length) && (
                    <div className={styles.list}>
                        <div className={styles.listTitle}>
                            Фото и видео пользователей
                            <ArrowIcon />
                        </div>
                        <div className={styles.mediaList}>
                            {product.mediaReviews.videos.map((video) => {
                                return (
                                    <VideoPreview
                                        key={video.id}
                                        src={`${API_URL}${video.video}`}
                                        width={129}
                                        height={120}
                                        className={styles.media}
                                    />
                                );
                            })}
                            {product.mediaReviews.images.map((image) => {
                                return (
                                    <Image
                                        key={image.id}
                                        src={`${API_URL}${image.image}`}
                                        alt={'image'}
                                        width={129}
                                        height={120}
                                        className={styles.media}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className={styles.feedbackList}>
                    {product.reviews.map((review) => {
                        return (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                setSelectedReviewId={setSelectedReviewId}
                                setSelectedMedia={setSelectedMedia}
                            />
                        );
                    })}
                </div>
            </div>

            <div className={styles.reviewWrap}>
                <div className={styles.gradeWrap}>
                    <GradeIcon />
                    <div>{product.average.toFixed(1)}</div>
                    <div className={styles.ellipse} />
                    <div>{getCountWord(product.reviews.length, 'отзыв')}</div>
                </div>
                <CreateReviewButton productId={product.id} />
            </div>
            <FullScreen
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setSelectedReviewId(undefined);
                    setSelectedMedia(undefined);
                }}
            >
                {review && selectedMedia && (
                    <ReviewDetail review={review} selectedMedia={selectedMedia} reviews={product.reviews} />
                )}
            </FullScreen>
        </div>
    );
};
