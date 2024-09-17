'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { RecoverForm } from '@/feature/session/auth/ui/RecoverForm';
import { Button, Modal } from '@/shared/ui';

import { SignInForm } from '../SignInForm';
import { SignUpForm } from '../SignUpForm';
import styles from './AuthModal.module.scss';

const titles: Record<string, string> = {
    signIn: 'Авторизация',
    signUp: 'Регистрация',
    recover: 'Восстановить пароль',
};

export const AuthModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState('signIn');
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setIsOpen(searchParams.has('authentication'));
    }, [searchParams]);

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('authentication');
        router.replace(`?${params}`, { scroll: false });
        setCurrentForm('signIn');
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={titles[currentForm]}>
            {currentForm === 'signIn' ? (
                <>
                    <SignInForm />
                    <span className={styles.recovery} onClick={() => setCurrentForm('recover')}>
                        Восстановить пароль
                    </span>
                    <Button fullWidth variant={'outline'} onClick={() => setCurrentForm('signUp')}>
                        РЕГИСТРАЦИЯ
                    </Button>
                </>
            ) : currentForm === 'signUp' ? (
                <>
                    <SignUpForm />
                    <Button fullWidth variant={'outline'} onClick={() => setCurrentForm('signIn')}>
                        ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                    </Button>
                </>
            ) : (
                <>
                    <RecoverForm />
                    <Button fullWidth variant={'outline'} onClick={() => setCurrentForm('signIn')}>
                        ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                    </Button>
                </>
            )}
        </Modal>
    );
};
