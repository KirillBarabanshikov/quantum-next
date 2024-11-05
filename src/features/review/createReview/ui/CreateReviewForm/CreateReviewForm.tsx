import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ChangeEvent, FC, forwardRef, InputHTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';

import { reviewApi } from '@/entities/review';
import Plus from '@/shared/assets/icons/plus.svg';
import GradeIcon from '@/shared/assets/icons/start_outline.svg';
import { truncate } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { createReviewScheme, TCreateReviewScheme } from '../../model';
import styles from './CreateReviewForm.module.scss';

const ratingLabels = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

interface ICreateReviewFormProps {
    productId: number;
    onClose: () => void;
}

export const CreateReviewForm: FC<ICreateReviewFormProps> = ({ productId, onClose }) => {
    const [rating, setRating] = useState(-1);
    const { slug } = useParams<{ slug: string }>();
    const queryClient = useQueryClient();

    const { mutateAsync: createReview, isPending } = useMutation({ mutationFn: reviewApi.createReview });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TCreateReviewScheme>({ resolver: yupResolver(createReviewScheme) });

    const onSubmit = async (data: TCreateReviewScheme) => {
        try {
            await createReview({ articleId: productId, ...data });
            await queryClient.invalidateQueries({ queryKey: ['product', slug] });
            onClose();
        } catch (error) {
            console.error(error);
        }
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
                <div className={styles.error}>{errors.rating?.message}</div>
            </div>
            <div className={styles.fieldsWrap}>
                <Input label={'Достоинства'} {...register('pros')} />
                <Input label={'Недостатки'} {...register('cons')} />
                <Input label={'Комментарий к отзыву'} {...register('comment')} error={errors.comment?.message} />
            </div>
            <File
                title={'Добавьте фотографии'}
                hint={'до 10 изображений в формате PNG, JPEG.'}
                multiple
                {...register('images')}
                error={errors.images?.message}
                accept={'image/png, image/jpeg'}
            />
            <File
                title={'Добавьте видео'}
                hint={'до 3 видео длительностью не более 10 минут'}
                multiple
                {...register('videos')}
                error={errors.videos?.message}
                accept={'video/*'}
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
    error?: string;
}

const File = forwardRef<HTMLInputElement, IFileProps>(({ title, hint, error, onChange, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState<null | string>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        if (!e.target.files) return;
        let value: string | null;

        if (e.target.files.length) {
            value =
                e.target.files.length === 1
                    ? truncate(e.target.files[0].name)
                    : `Число файлов: ${e.target.files.length}`;
        } else {
            value = null;
        }

        setSelectedValue(value);
    };

    return (
        <div className={styles.file}>
            <div className={styles.title}>{title}</div>
            <div className={styles.fileWrap}>
                <label className={styles.fileArea}>
                    <input type={'file'} ref={ref} onChange={handleOnChange} {...props} />
                    <Plus />
                </label>
                <div className={styles.wrap}>
                    <div className={styles.subtitle}>Нажмите на кнопку или перетащите фото в эту область</div>
                    <div className={clsx(styles.hint, !!error && styles.error)}>{hint}</div>
                    {selectedValue && <div className={clsx(styles.hint)}>{selectedValue}</div>}
                </div>
            </div>
        </div>
    );
});

File.displayName = 'File';
