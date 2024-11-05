'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { apiClient } from '@/shared/api';
import { maskPhone } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';
import { AlertModal } from '@/shared/ui/AlertModal';

import { orderCallScheme, TOrderCallScheme } from '../../model';
import styles from './OrderCallForm.module.scss';

export const OrderCallForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        setValue,
        reset,
    } = useForm<TOrderCallScheme>({ resolver: yupResolver(orderCallScheme) });

    const { mutateAsync, isError } = useMutation({
        mutationFn: async (body: TOrderCallScheme) => await apiClient.post('/persons', body),
    });

    const onSubmit = async (data: TOrderCallScheme) => {
        try {
            await mutateAsync(data);
            reset();
        } catch (error) {
            console.error(error);
        } finally {
            setIsOpen(true);
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
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isError={isError}
                onEnter={() => setIsOpen(false)}
                title={isError ? 'Ошибка' : 'Успех'}
                subtitle={isError ? 'Ошибка' : 'Наши специалисты свяжутся с вами в ближайшее время'}
            />
        </form>
    );
};
