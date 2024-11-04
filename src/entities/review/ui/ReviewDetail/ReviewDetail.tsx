import clsx from 'clsx';
import Image from 'next/image';
import React, { FC, useState } from 'react';

import { ISelectedMedia } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Reviews/Reviews';
import { IReview } from '@/entities/review';
import StarIcon from '@/shared/assets/icons/start_outline.svg';
import { API_URL } from '@/shared/consts';
import { VideoPreview } from '@/shared/ui/VideoPreview';

import styles from './ReviewDetail.module.scss';

interface IReviewDetailProps {
    review: IReview;
    selectedMedia: ISelectedMedia;
}

export const ReviewDetail: FC<IReviewDetailProps> = ({ review, selectedMedia }) => {
    const [currentMedia, setCurrentMedia] = useState(selectedMedia);

    return (
        <div className={styles.reviewDetail}>
            <div className={styles.mediaWrap}>
                {currentMedia.type === 'video' ? (
                    <video autoPlay controls playsInline className={styles.currentMedia}>
                        <source
                            src={`${API_URL}${review.videos.find((image) => image.id === currentMedia.id)?.video}`}
                        />
                    </video>
                ) : (
                    <Image
                        src={`${API_URL}${review.images.find((image) => image.id === currentMedia.id)?.image}`}
                        alt={'media review'}
                        fill
                        sizes={'100%'}
                        className={styles.currentMedia}
                    />
                )}
            </div>
            <div className={clsx(styles.reviewWrap, 'scrollbar-hide')}>
                <div className={styles.reviewer}>{review.user.username}</div>
                <div className={styles.rating}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon key={index} className={clsx(index < review.rating && styles.fill)} />
                    ))}
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
                {(review.images || review.videos) && (
                    <div className={styles.media}>
                        {review.videos.map((video, index) => {
                            return (
                                <VideoPreview
                                    key={index}
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

                        {review.images.map((image, index) => (
                            <Image
                                key={index}
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
