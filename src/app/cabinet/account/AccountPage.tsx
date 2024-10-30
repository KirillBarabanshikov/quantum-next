'use client';
// TODO refactor
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAuth } from '@/app/_providers/AuthProvider';
import { sessionApi } from '@/entities/session';
import { apiClient } from '@/shared/api';
import { maskPhone } from '@/shared/lib';
import { Button, Checkbox, Input, Modal, Separator } from '@/shared/ui';

import styles from './AccountPage.module.scss';

const accountScheme = yup.object().shape({
    username: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(5, 'Логин должен содержать не менее 5 символов')
        .matches(/^[a-zA-Z0-9]+$/, 'Логин может содержать только латинские буквы и цифры'),
    phoneNumber: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(18, 'Недействительный номер телефона'),
    email: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .email('Недействительный адрес электронной почты')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Недействительный адрес электронной почты'),
});

type TAccountScheme = yup.InferType<typeof accountScheme>;

const passwordScheme = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(6, 'Пароль должен содержать не менее 6 символов')
        .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
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

type TPasswordScheme = yup.InferType<typeof passwordScheme>;

export const AccountPage = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isSure, setIsSure] = useState(false);
    const router = useRouter();

    const { mutateAsync: editEmail } = useMutation({
        mutationFn: async (email: string) => {
            await apiClient.post('/users/edit-email', { email });
            await queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });

    const { mutateAsync: editPhone } = useMutation({
        mutationFn: async (phoneNumber: string) => {
            await apiClient.post('/users/edit-phone', { phoneNumber });
            await queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });

    const { mutateAsync: editUsername } = useMutation({
        mutationFn: async (username: string) => {
            await apiClient.post('/users/edit-username', { username });
            await queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });

    const { mutateAsync: deleteUser } = useMutation({
        mutationFn: async () => {
            await apiClient.delete(`/users/delete`);
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<TAccountScheme>({
        resolver: yupResolver(accountScheme),
        defaultValues: {
            email: user?.email,
            username: user?.username,
            phoneNumber: user?.phoneNumber,
        },
    });

    const onSubmit = async (changedData: TAccountScheme) => {
        if (changedData.email !== user?.email) {
            await editEmail(changedData.email);
        }
        if (changedData.username !== user?.username) {
            await editUsername(changedData.username);
        }
        if (changedData.phoneNumber !== user?.phoneNumber) {
            await editPhone(changedData.phoneNumber);
        }
        await queryClient.invalidateQueries({ queryKey: ['user'] });
    };

    if (!user) {
        return <></>;
    }

    const watchedValues = watch();

    const isFormChanged = Object.keys({
        username: user.username,
        phoneNumber: user.phoneNumber,
        email: user.email,
    }).some((key) => watchedValues[key as keyof TAccountScheme] !== user[key as keyof typeof user]);

    return (
        <div className={styles.account}>
            <div className={styles.formsWrap}>
                <div className={styles.forms}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.title}>Аккаунт</div>
                        <Input
                            label={'Логин'}
                            defaultValue={user.username}
                            {...register('username')}
                            error={errors.username?.message}
                            sizes={'sm'}
                        />
                        <Input
                            label={'Телефон'}
                            defaultValue={user.phoneNumber}
                            {...register('phoneNumber', {
                                onChange: (e) => {
                                    setValue('phoneNumber', maskPhone(e.target.value));
                                    trigger('phoneNumber');
                                },
                            })}
                            error={errors.phoneNumber?.message}
                            sizes={'sm'}
                        />
                        <Input
                            label={'E-mail'}
                            defaultValue={user.email}
                            {...register('email')}
                            error={errors.email?.message}
                            sizes={'sm'}
                        />
                        <Button type={'submit'} disabled={!isFormChanged} className={styles.button}>
                            Сохранить данные
                        </Button>
                    </form>
                    <PasswordForm />
                </div>
                <Separator className={styles.separator} />
                <span className={styles.deleteAccount} onClick={() => setIsOpen(true)}>
                    Удалить аккаунт
                </span>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setIsSure(false);
                }}
                title={'Удаление аккаунта'}
                maxWidth={428}
            >
                <div className={styles.wrap}>
                    <div className={styles.warning}>Вы уверены что хотите удалить свой аккаунт</div>
                    <Checkbox
                        label={'«Я уверен(-а), что хочу удалить аккаунт»'}
                        checked={isSure}
                        onChange={(e) => setIsSure(e.target.checked)}
                    />
                    <Button
                        disabled={!isSure}
                        onClick={async () => {
                            await deleteUser();
                            await sessionApi.logout();
                            window.location.reload();
                            setIsOpen(false);
                            setIsSure(false);
                        }}
                    >
                        Удалить
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export const PasswordForm = () => {
    const queryClient = useQueryClient();

    const defaultValues = {
        oldPassword: '',
        password: '',
        passwordRepeat: '',
    };

    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<TPasswordScheme>({
        resolver: yupResolver(passwordScheme),
        mode: 'all',
        defaultValues,
    });

    const { mutate: changePassword, isError } = useMutation({
        mutationFn: async (data: TPasswordScheme) => {
            await apiClient.post(`/users/edit-password`, data);
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            reset();
        },
    });

    const onSubmit = (data: TPasswordScheme) => {
        changePassword(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>Сменить пароль</div>
            <Input
                label={'Старый пароль'}
                {...register('oldPassword')}
                error={errors.oldPassword?.message}
                sizes={'sm'}
            />
            <Input
                label={'Новый пароль'}
                {...register('password', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.password?.message}
                sizes={'sm'}
            />
            <Input
                label={'Повторите новый пароль'}
                {...register('passwordRepeat', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.passwordRepeat?.message}
                sizes={'sm'}
            />
            <Button type={'submit'} disabled={!isValid} className={styles.button}>
                Сохранить данные
            </Button>
            {isError && <span className={styles.error}>Неверный старый пароль</span>}
        </form>
    );
};
