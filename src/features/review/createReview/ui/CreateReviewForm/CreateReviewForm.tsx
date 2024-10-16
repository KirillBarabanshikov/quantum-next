import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC, forwardRef, InputHTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';

import { reviewApi } from '@/entities/review';
import GradeIcon from '@/shared/assets/icons/grade-outline.svg';
import Plus from '@/shared/assets/icons/plus.svg';
import { Button, Input } from '@/shared/ui';

import { createReviewScheme, TCreateReviewScheme } from '../../model';
import styles from './CreateReviewForm.module.scss';

const ratingLabels = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

interface ICreateReviewFormProps {
    productId: number;
}

export const CreateReviewForm: FC<ICreateReviewFormProps> = ({ productId }) => {
    const [rating, setRating] = useState(-1);

    const { mutateAsync: createReview, isPending } = useMutation({ mutationFn: reviewApi.createReview });

    const { register, handleSubmit } = useForm<TCreateReviewScheme>({ resolver: yupResolver(createReviewScheme) });

    const onSubmit = async (data: TCreateReviewScheme) => {
        if (rating < 0) return;
        await createReview({ articleId: productId, ...data });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.reviewForm}>
            <div className={styles.ratingWrap}>
                <div className={styles.rating}>
                    {Array.from({ length: 5 }).map((_, index) => {
                        return (
                            <label key={index} className={clsx(styles.grade, index < rating && styles.active)}>
                                <input
                                    type={'radio'}
                                    value={index + 1}
                                    {...register('rating', { onChange: (e) => setRating(+e.target.value) })}
                                />
                                <GradeIcon />
                            </label>
                        );
                    })}
                </div>
                <div className={styles.label}>{rating > 0 && ratingLabels[rating - 1]}</div>
            </div>
            <div className={styles.fieldsWrap}>
                <Input label={'Достоинства'} extent={'md'} {...register('pros')} />
                <Input label={'Недостатки'} extent={'md'} {...register('cons')} />
                <Input label={'Комментарий к отзыву'} extent={'md'} {...register('comment')} />
            </div>
            <File
                title={'Добавьте фотографии'}
                hint={'до 10 изображений в формате PNG, JPEG.'}
                multiple
                {...register('images')}
            />
            <File
                title={'Добавьте видео'}
                hint={'до 3 видео длительностью не более 10 минут'}
                multiple
                {...register('videos')}
            />
            <Button type={'submit'} fullWidth disabled={isPending}>
                Отправить отзыв
            </Button>
        </form>
    );
};

interface IFileProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    hint: string;
}

const File = forwardRef<HTMLInputElement, IFileProps>(({ title, hint, ...props }, ref) => {
    return (
        <div className={styles.file}>
            <div className={styles.title}>{title}</div>
            <div className={styles.fileWrap}>
                <label className={styles.fileArea}>
                    <input type={'file'} ref={ref} {...props} />
                    <Plus />
                </label>
                <div>
                    <div className={styles.subtitle}>Нажмите на кнопку или перетащите фото в эту область</div>
                    <div className={styles.hint}>{hint}</div>
                </div>
            </div>
        </div>
    );
});

File.displayName = 'File';
