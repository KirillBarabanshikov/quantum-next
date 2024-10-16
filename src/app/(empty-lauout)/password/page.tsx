'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';

import { apiClient } from '@/shared/api';
import Logo from '@/shared/assets/logo_dark.svg';
import { Button, Input } from '@/shared/ui';

import styles from './page.module.scss';

export default function Page() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const { mutateAsync } = useMutation({
        mutationFn: async (email: string) => await apiClient.post('/form_emails', { email }),
    });

    const onSubmit = async () => {
        try {
            await axios.post('/api/password', { password });
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const onEmailSubmit = async () => {
        if (!email) return;

        try {
            await mutateAsync(email);
            setEmail('');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={clsx(styles.container)}>
            <div className={styles.title}>
                <Logo />
                <h1 className={'title'}>Сайт в разработке</h1>
            </div>
            <div style={{ width: '400px' }}>
                <p>Оставьте ваш адрес электронной почты, и мы сообщим вам о запуске маркетплейса Rubot.pro</p>
                <br />
                <Input placeholder={'Email'} type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <Button fullWidth onClick={() => onEmailSubmit()}>
                    Отправить
                </Button>
                <br />
                <br />
                <br />
                <Input placeholder={'Пароль'} type={'password'} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Button fullWidth onClick={onSubmit}>
                    Вход
                </Button>
            </div>
        </div>
    );
}
