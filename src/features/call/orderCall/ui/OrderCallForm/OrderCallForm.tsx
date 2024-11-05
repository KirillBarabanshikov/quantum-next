'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { apiClient } from '@/shared/api';
import { maskPhone } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { orderCallScheme, TOrderCallScheme } from '../../model';
import styles from './OrderCallForm.module.scss';

export const OrderCallForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        setValue,
        reset,
    } = useForm<TOrderCallScheme>({ resolver: yupResolver(orderCallScheme) });

    const { mutateAsync } = useMutation({
        mutationFn: async (body: TOrderCallScheme) => await apiClient.post('/persons', body),
    });

    const onSubmit = async (data: TOrderCallScheme) => {
        try {
            await mutateAsync(data);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
                placeholder={'Ваше имя'}
                {...register('name')}
                error={errors.name?.message}
                showErrorText={false}
                variant={'dark'}
            />
            <Input
                placeholder={'Ваш телефон'}
                {...register('phone', {
                    onChange: (e) => {
                        setValue('phone', maskPhone(e.target.value));
                        trigger('phone');
                    },
                })}
                error={errors.phone?.message}
                showErrorText={false}
                variant={'dark'}
            />
            <Button type={'submit'} theme={'white'}>
                Заказать звонок
            </Button>
            <p className={styles.hint}>
                Нажимая кнопку «Заказать консультацию», я подтверждаю, что я ознакомлен и согласен с условиями политики
                обработки персональных данных.
            </p>
        </form>
    );
};
