'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useMeQuery } from '@/entities/user/api';
import { instance } from '@/shared/api';
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

type TAccountSheme = yup.InferType<typeof accountScheme>;

export const AccountPage = () => {
    const { data } = useMeQuery();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isSure, setIsSure] = useState(false);
    const router = useRouter();

    const { mutate: editEmail } = useMutation({
        mutationFn: async (email: string) => {
            await instance.post('/users/edit-email', { email });
            await queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });

    const { mutate: editPhone } = useMutation({
        mutationFn: async (phoneNumber: string) => {
            await instance.post('/users/edit-phone', { phoneNumber });
            await queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });

    const { mutate: editUsername } = useMutation({
        mutationFn: async (username: string) => {
            await instance.post('/users/edit-username', { username });
            await queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });

    const { mutate: deleteUser } = useMutation({
        mutationFn: async () => {
            await instance.delete(`/users/delete`);
            router.push('/');
            Cookies.remove('token');
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<TAccountSheme>({
        resolver: yupResolver(accountScheme),
        defaultValues: {
            email: data?.email,
            username: data?.username,
            phoneNumber: data?.phoneNumber,
        },
    });

    const onSubmit = (changedData: TAccountSheme) => {
        if (changedData.email !== data?.email) {
            editEmail(changedData.email);
        }
        if (changedData.username !== data?.username) {
            editUsername(changedData.username);
        }
        if (changedData.phoneNumber !== data?.phoneNumber) {
            editPhone(changedData.phoneNumber);
        }
    };

    if (!data) {
        return <></>;
    }

    const watchedValues = watch();

    const isFormChanged = Object.keys({
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
    }).some((key) => watchedValues[key as keyof TAccountSheme] !== data[key as keyof typeof data]);

    return (
        <div className={styles.account}>
            <div className={styles.formsWrap}>
                <div className={styles.forms}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.title}>Аккаунт</div>
                        <Input
                            label={'Логин'}
                            defaultValue={data.username}
                            {...register('username')}
                            error={errors.username?.message}
                        />
                        <Input
                            label={'Телефон'}
                            defaultValue={data.phoneNumber}
                            {...register('phoneNumber', {
                                onChange: (e) => {
                                    setValue('phoneNumber', maskPhone(e.target.value));
                                    trigger('phoneNumber');
                                },
                            })}
                            error={errors.phoneNumber?.message}
                        />
                        <Input
                            label={'E-mail'}
                            defaultValue={data.email}
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Button type={'submit'} disabled={!isFormChanged} className={styles.button}>
                            Сохранить данные
                        </Button>
                    </form>
                    <form className={styles.form}>
                        <div className={styles.title}>Сменить пароль</div>
                        <Input label={'Старый пароль'} />
                        <Input label={'Новый пароль'} />
                        <Input label={'Повторите новый пароль'} />
                        <Button type={'submit'} disabled className={styles.button}>
                            Сохранить данные
                        </Button>
                    </form>
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
                    <Button disabled={!isSure} onClick={() => deleteUser()}>
                        Удалить
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
