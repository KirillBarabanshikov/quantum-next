'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { productApi, useFavoritesStore } from '@/entities/product';
import { sessionApi } from '@/entities/session';
import { Button, Input } from '@/shared/ui';

import { signInFormScheme, TSignInFormScheme } from '../../model';
import styles from './SignInForm.module.scss';

export const SignInForm: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { productsIds } = useFavoritesStore((state) => state);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInFormScheme>({ resolver: yupResolver(signInFormScheme), mode: 'all' });

    const { mutateAsync: signIn, isError } = useMutation({ mutationFn: sessionApi.signIn });

    const onSubmit = async (data: TSignInFormScheme) => {
        try {
            setIsLoading(true);
            await signIn(data);
            if (productsIds.length) {
                await productApi.addProductsToFavorite(productsIds);
            }
            window.location.reload();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.signInForm}>
            <Input
                label={'Логин'}
                autoComplete={'username'}
                {...register('username', { setValueAs: (value) => value.trim() })}
                error={errors.username?.message}
            />
            <Input
                type={'password'}
                label={'Пароль'}
                autoComplete={'current-password'}
                {...register('password', { setValueAs: (value) => value.trim() })}
                error={errors.password?.message}
            />
            <Button type={'submit'} disabled={isLoading}>
                ВОЙТИ
            </Button>
            {isError && <div className={styles.error}>Пользователь не найден</div>}
        </form>
    );
};
