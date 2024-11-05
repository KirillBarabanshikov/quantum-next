import clsx from 'clsx';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import { ISelectedMedia } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Reviews/Reviews';
import { IReview } from '@/entities/review';
import ArrowLeftIcon from '@/shared/assets/icons/arrow_left_rounded.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow_right_rounded.svg';
import StarIcon from '@/shared/assets/icons/start_outline.svg';
import { API_URL } from '@/shared/consts';
import { VideoPreview } from '@/shared/ui/VideoPreview';

import styles from './ReviewDetail.module.scss';

interface IReviewDetailProps {
    review: IReview;
    selectedMedia: ISelectedMedia;
    reviews: IReview[];
}

export const ReviewDetail: FC<IReviewDetailProps> = ({ review, selectedMedia, reviews }) => {
    const [currentMedia, setCurrentMedia] = useState(selectedMedia);
    const [currentReview, setCurrentReview] = useState(review);

    useEffect(() => {
        if (currentReview.videos.length) {
            setCurrentMedia({ id: currentReview.videos[0].id, type: 'video' });
        } else if (currentReview.images.length) {
            setCurrentMedia({ id: currentReview.images[0].id, type: 'image' });
        }
    }, [currentReview]);

    const onNext = () => {
        const filteredReviews = reviews.filter((review) => review.videos.length || review.images.length);
        const currentIndex = filteredReviews.findIndex((item) => item.id === currentReview.id);
        if (currentIndex !== -1) {
            const nextReview = filteredReviews[currentIndex + 1];
            if (!nextReview) return;
            setCurrentReview(nextReview);
        }
    };

    const onPrev = () => {
        const filteredReviews = reviews.filter((review) => review.videos.length || review.images.length);
        const currentIndex = filteredReviews.findIndex((item) => item.id === currentReview.id);
        if (currentIndex !== -1) {
            const prevReview = filteredReviews[currentIndex - 1];
            if (!prevReview) return;
            setCurrentReview(prevReview);
        }
    };

    return (
        <div className={styles.reviewDetail}>
            <button onClick={onPrev} className={clsx(styles.button, styles.left)}>
                <ArrowLeftIcon />
            </button>
            <button onClick={onNext} className={clsx(styles.button, styles.right)}>
                <ArrowRightIcon />
            </button>
            <div className={styles.mediaWrap}>
                {currentMedia.type === 'video' ? (
                    <video key={currentMedia.id} autoPlay controls playsInline className={styles.currentMedia}>
                        <source
                            src={`${API_URL}${currentReview.videos.find((image) => image.id === currentMedia.id)?.video}`}
                        />
                    </video>
                ) : (
                    <Image
                        src={`${API_URL}${currentReview.images.find((image) => image.id === currentMedia.id)?.image}`}
                        alt={'media review'}
                        fill
                        sizes={'100%'}
                        className={styles.currentMedia}
                    />
                )}
            </div>
            <div className={clsx(styles.reviewWrap, 'scrollbar-hide')}>
                <div className={styles.reviewer}>{currentReview.user.username}</div>
                <div className={styles.rating}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon key={index} className={clsx(index < currentReview.rating && styles.fill)} />
                    ))}
                </div>
                {currentReview.cons && (
                    <div className={styles.review}>
                        <div className={styles.title}>Недостатки</div>
                        <div className={styles.text}>{currentReview.cons}</div>
                    </div>
                )}
                {currentReview.pros && (
                    <div className={styles.review}>
                        <div className={styles.title}>Достоинства</div>
                        <div className={styles.text}>{currentReview.pros}</div>
                    </div>
                )}
                {currentReview.comment && (
                    <div className={styles.review}>
                        <div className={styles.title}>Комментарий</div>
                        <div className={styles.text}>{currentReview.comment}</div>
                    </div>
                )}
                {(currentReview.images || currentReview.videos) && (
                    <div className={styles.media}>
                        {currentReview.videos.map((video) => {
                            return (
                                <VideoPreview
                                    key={video.id}
                                    src={`${API_URL}${video.video}`}
                                    width={102}
                                    height={102}
                                    className={styles.video}
                                    onClick={() => {
                                        setCurrentMedia({ id: video.id, type: 'video' });
                                    }}
                                />
                            );
                        })}

                        {currentReview.images.map((image) => (
                            <Image
                                key={image.id}
                                src={`${API_URL}${image?.image}`}
                                width={102}
                                height={102}
                                alt={'media'}
                                className={styles.image}
                                onClick={() => {
                                    setCurrentMedia({ id: image.id, type: 'image' });
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
