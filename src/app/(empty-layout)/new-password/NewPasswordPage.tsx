'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ArrowBack from '@/shared/assets/icons/arrow_right_alt.svg';
import { Button, Input } from '@/shared/ui';

import styles from './NewPasswordPage.module.scss';

const newPasswordScheme = yup.object().shape({
    password: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(6, 'Пароль должен содержать не менее 6 символов')
        .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
        .oneOf([yup.ref('passwordRepeat')], 'Пароли должны совпадать'),
    passwordRepeat: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(6, 'Пароль должен содержать не менее 6 символов')
        .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export type TNewPasswordScheme = yup.InferType<typeof newPasswordScheme>;

export const NewPasswordPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm<TNewPasswordScheme>({ resolver: yupResolver(newPasswordScheme) });

    const onSubmit = (data: TNewPasswordScheme) => {
        console.log(data);
    };

    return (
        <div className={styles.newPasswordPage}>
            <div className={clsx(styles.container, 'container')}>
                <button className={styles.backButton} onClick={() => router.push('/')}>
                    <ArrowBack />
                    Назад на главную
                </button>
                <div className={styles.formWrap}>
                    <div>
                        <h1 className={styles.title}>Создание нового пароля</h1>
                        <p className={styles.hint}>Пароль должен быть не менее 6 символов и содержать цифры</p>
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                label={'Новый пароль'}
                                type={'password'}
                                extent={'md'}
                                {...register('password', {
                                    onChange: () => {
                                        trigger('passwordRepeat');
                                        trigger('password');
                                    },
                                })}
                                error={errors.password?.message}
                            />
                            <Input
                                label={'Подтверждение нового пароля'}
                                type={'password'}
                                extent={'md'}
                                {...register('passwordRepeat', {
                                    onChange: () => {
                                        trigger('passwordRepeat');
                                        trigger('password');
                                    },
                                })}
                                error={errors.passwordRepeat?.message}
                            />
                            <Button type={'submit'}>Сохранить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
