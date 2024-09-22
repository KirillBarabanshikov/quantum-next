'use client';

import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button, Input } from '@/shared/ui';

import styles from './page.module.scss';

export default function Page() {
    const [value, setValue] = useState('');
    const router = useRouter();

    const onSubmit = () => {
        if (value === 'UAVmarkt24') {
            Cookies.set('test', 'test');
            router.push('/');
        }
    };

    return (
        <div className={clsx(styles.container)}>
            <h1 className={'title'}>Сайт в разработке</h1>
            <br />
            <br />
            <div style={{ width: '400px' }}>
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
