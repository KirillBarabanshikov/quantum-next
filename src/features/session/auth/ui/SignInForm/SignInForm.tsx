'use client';

import { yupResolver } from '@hookform/resolvers/yup';
// import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

// import { sessionApi } from '@/entities/session';
import { Button, Input } from '@/shared/ui';

import { signInFormScheme, TSignInFormScheme } from '../../model';
import styles from './SignInForm.module.scss';

interface ISignInFormProps {
    onClose?: () => void;
}

export const SignInForm: FC<ISignInFormProps> = ({ onClose }) => {
    const router = useRouter();

    // const { mutateAsync: signIn } = useMutation({
    //     mutationFn: sessionApi.signIn,
    // });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInFormScheme>({ resolver: yupResolver(signInFormScheme), mode: 'all' });

    const onSubmit = async (data: TSignInFormScheme) => {
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            // router.push('/cabinet');
            window.location.href = '/cabinet';
            onClose && onClose();
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
            <Button type={'submit'}>ВОЙТИ</Button>
        </form>
    );
};
