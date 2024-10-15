'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { sessionApi } from '@/entities/session';
import { Button, Input } from '@/shared/ui';

import { signInFormScheme, TSignInFormScheme } from '../../model';
import styles from './SignInForm.module.scss';

export const SignInForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInFormScheme>({ resolver: yupResolver(signInFormScheme), mode: 'all' });

    const { mutateAsync: signIn, isPending, isError } = useMutation({ mutationFn: sessionApi.signIn });

    const onSubmit = async (data: TSignInFormScheme) => {
        try {
            await signIn(data);
            window.location.href = '/cabinet';
        } catch (error) {
            console.error(error);
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
            <Button type={'submit'} disabled={isPending}>
                ВОЙТИ
            </Button>
            {isError && <div className={styles.error}>Пользователь не найден</div>}
        </form>
    );
};
