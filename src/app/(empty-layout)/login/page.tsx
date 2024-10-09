'use client';

import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { apiClient } from '@/shared/api';
import Logo from '@/shared/assets/logos/logo_dark.svg';
import { Button, Input } from '@/shared/ui';

import styles from './page.module.scss';

export default function Page() {
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const { mutateAsync } = useMutation({
        mutationFn: async (email: string) => await apiClient.post('/forms', { email }),
    });

    const onSubmit = () => {
        if (value === 'UAVmarkt24') {
            Cookies.set('quantum', 'quantum', { expires: 1000000 });
            router.push('/');
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
                <Input
                    placeholder={'Email'}
                    type={'email'}
                    extent={'md'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <Button fullWidth onClick={() => onEmailSubmit()}>
                    Отправить
                </Button>
                <br />
                <br />
                <br />
                <Input
                    placeholder={'Пароль'}
                    type={'password'}
                    extent={'md'}
                    onChange={(e) => setValue(e.target.value)}
                />
                <br />
                <Button fullWidth onClick={onSubmit}>
                    Вход
                </Button>
            </div>
        </div>
    );
}
