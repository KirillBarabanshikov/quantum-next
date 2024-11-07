'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { apiClient } from '@/shared/api';
import Logo from '@/shared/assets/logo_dark.svg';
import { maskPhone } from '@/shared/lib';
import { Button, Input, Radio } from '@/shared/ui';
import { AlertModal } from '@/shared/ui/AlertModal';

import styles from './page.module.scss';

const supplierFormScheme = yup.object().shape({
    email: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .email('Недействительный адрес электронной почты')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Недействительный адрес электронной почты'),
    phone: yup.string().required('Пожалуйста, заполните обязательное поле').min(18, 'Недействительный номер телефона'),
    fio: yup.string().required('Пожалуйста, заполните обязательное поле'),
    inn: yup.string().required('Пожалуйста, заполните обязательное поле'),
    organizationName: yup.string().required('Пожалуйста, заполните обязательное поле'),
});

const buyerFormScheme = yup.object().shape({
    email: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .email('Недействительный адрес электронной почты')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Недействительный адрес электронной почты'),
    phone: yup.string().required('Пожалуйста, заполните обязательное поле').min(18, 'Недействительный номер телефона'),
    fio: yup.string().required('Пожалуйста, заполните обязательное поле'),
});

type TSupplierFormScheme = yup.InferType<typeof supplierFormScheme>;

type TBuyerFormScheme = yup.InferType<typeof buyerFormScheme>;

export const PasswordPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('поставщик');
    const [password, setPassword] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
        reset,
    } = useForm<TSupplierFormScheme>({
        resolver: yupResolver(supplierFormScheme),
    });

    const {
        register: registerBuyer,
        handleSubmit: handleSubmitBuyer,
        setValue: setValueBuyer,
        trigger: triggerBuyer,
        formState: { errors: errorsBuyer },
        reset: resetBuyer,
    } = useForm<TBuyerFormScheme>({
        resolver: yupResolver(buyerFormScheme),
    });

    const {
        mutateAsync: submitForm,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (data: any) => apiClient.post('/form_emails', data),
    });

    const onSubmitPassword = async () => {
        try {
            await axios.post('/api/password', { password });
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            await submitForm({ ...data, type: selectedType });
            reset();
            resetBuyer();
        } catch (e) {
            console.error(e);
        } finally {
            setIsOpen(true);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Logo />
                <h1 className={'title'} style={{ textAlign: 'center' }}>
                    Рады приветствовать на RUBOT!
                </h1>
            </div>
            <p className={styles.subtitle}>
                Первом специализированном маркетплейсе, агрегирующем широкий спектр решений российских производителей
                робототехники, систем интеллектуального управления, в&nbsp;том числе беспилотных систем, модулей,
                микросхем и иных составных микроэлектронных элементов и&nbsp;различного программного обеспечения.
            </p>
            <p className={styles.subtitle}>
                Оставьте ваш адрес электронной почты, и мы сообщим вам о запуске маркетплейса Rubot.pro
            </p>
            <div className={styles.radioWrap}>
                <Radio
                    label={'Поставщик'}
                    variant={'filters'}
                    value={'поставщик'}
                    checked={selectedType === 'поставщик'}
                    onChange={(e) => setSelectedType(e.target.value)}
                />
                <Radio
                    label={'Покупатель'}
                    variant={'filters'}
                    value={'покупатель'}
                    checked={selectedType === 'покупатель'}
                    onChange={(e) => setSelectedType(e.target.value)}
                />
            </div>
            {selectedType === 'поставщик' ? (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Input
                        label={'ФИО'}
                        placeholder={'Иванов Иван Сергеевич'}
                        {...register('fio')}
                        error={errors.fio?.message}
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
                    <Input label={'Email'} placeholder={'Email'} {...register('email')} error={errors.email?.message} />
                    <Input
                        label={'Название организации'}
                        placeholder={'ООО “Бекер”'}
                        {...register('organizationName')}
                        error={errors.organizationName?.message}
                    />
                    <Input label={'ИНН'} placeholder={'00000000000'} {...register('inn')} error={errors.inn?.message} />
                    <Button type={'submit'} disabled={isPending}>
                        Отправить
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleSubmitBuyer(onSubmit)} className={styles.form}>
                    <Input
                        label={'ФИО'}
                        placeholder={'Иванов Иван Сергеевич'}
                        {...registerBuyer('fio')}
                        error={errorsBuyer.fio?.message}
                    />
                    <Input
                        label={'Телефон'}
                        placeholder={'+7 (495) 000 00 00'}
                        {...registerBuyer('phone', {
                            onChange: (e) => {
                                setValueBuyer('phone', maskPhone(e.target.value));
                                triggerBuyer('phone');
                            },
                        })}
                        error={errorsBuyer.phone?.message}
                    />
                    <Input
                        label={'Email'}
                        placeholder={'Email'}
                        {...registerBuyer('email')}
                        error={errorsBuyer.email?.message}
                    />
                    <Button type={'submit'} disabled={isPending}>
                        Отправить
                    </Button>
                </form>
            )}
            <div className={styles.passwordWrap}>
                <Input
                    label={'Пароль'}
                    placeholder={'Пароль'}
                    type={'password'}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Button fullWidth onClick={onSubmitPassword}>
                    Вход
                </Button>
            </div>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isError={isError}
                onEnter={() => setIsOpen(false)}
                title={isError ? 'Ошибка' : 'Успех'}
                subtitle={isError ? 'Ошибка' : 'Наши специалисты свяжутся с вами в ближайшее время'}
            />
        </div>
    );
};
