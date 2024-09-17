import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/shared/ui';

import { signInFormScheme, TSignInFormScheme } from '../../model';
import styles from './SignInForm.module.scss';

export const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInFormScheme>({ resolver: yupResolver(signInFormScheme), mode: 'all' });

    const onSubmit = (data: TSignInFormScheme) => {
        console.log(data);
    };

    return (
        <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
            <Input
                label={'Логин'}
                extent={'md'}
                autoComplete={'username'}
                {...register('username', { setValueAs: (value) => value.trim() })}
                error={errors.username?.message}
            />
            <Input
                type={'password'}
                label={'Пароль'}
                extent={'md'}
                autoComplete={'current-password'}
                {...register('password', { setValueAs: (value) => value.trim() })}
                error={errors.password?.message}
            />
            <Button type={'submit'}>ВОЙТИ</Button>
        </form>
    );
};
