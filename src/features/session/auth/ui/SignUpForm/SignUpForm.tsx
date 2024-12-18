import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { sessionApi } from '@/entities/session';
import { MAX_WIDTH_LG } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { maskPhone } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { signUpFormScheme, TSignUpFormScheme } from '../../model';
import styles from './SignUpForm.module.scss';

interface ISignUpForm {
    setIsSuccess: (value: boolean) => void;
}

export const SignUpForm: FC<ISignUpForm> = ({ setIsSuccess }) => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_LG);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
    } = useForm<TSignUpFormScheme>({ resolver: yupResolver(signUpFormScheme), mode: 'all' });

    const { mutateAsync: signUp, isPending } = useMutation({ mutationFn: sessionApi.signUp });

    const onSubmit = async (data: TSignUpFormScheme) => {
        try {
            await signUp(data);
            setIsSuccess(true);
        } catch (error: any) {
            console.error(error);
            if (error.response.data.details === 'User with this email already exists.') {
                setError('Пользователь с таким адресом электронной почты уже существует');
            } else if (error.response.data.details === 'User with this phone already exists.') {
                setError('Пользователь с таким телефоном уже существует');
            } else if (error.response.data.details === 'User with this login already exists.') {
                setError('Пользователь с таким логином уже существует');
            } else {
                setError('Ошибка регистрации');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
            <Input
                label={'Логин'}
                hint={'допускаются только латинские буквы и цифры'}
                autoComplete={'username'}
                {...register('username')}
                error={errors.username?.message}
            />
            <Input
                label={'Телефон'}
                placeholder={'+7 (495) 000 00 00'}
                {...register('phone', {
                    onChange: (e) => {
                        setValue('phone', maskPhone(e.target.value));
                        trigger('phone');
                    },
                })}
                error={errors.phone?.message}
            />
            <Input
                type={'email'}
                label={'E-mail'}
                placeholder={'example@email.com'}
                autoComplete={'email'}
                {...register('email')}
                error={errors.email?.message}
            />
            <Input
                type={'password'}
                label={'Пароль'}
                hint={isMatch ? '' : 'пароль должен быть не менее 6 символов и содержать цифры'}
                autoComplete={'current-password'}
                {...register('password', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.password?.message}
            />
            <Input
                type={'password'}
                label={'Подтверждение пароля'}
                autoComplete={'current-password'}
                {...register('passwordRepeat', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.passwordRepeat?.message}
            />
            <div className={styles.hint}>
                Ссылка для входа в личный кабинет будет отправлена на вашу электронную почту.
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <Button type={'submit'} disabled={isPending}>
                {isMatch ? 'Продолжить' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
            </Button>
        </form>
    );
};
