'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { RecoverForm } from '@/features/session/auth/ui/RecoverForm';
import { Button, Modal } from '@/shared/ui';

import { SignInForm } from '../SignInForm';
import { SignUpForm } from '../SignUpForm';
import styles from './AuthModal.module.scss';

type TFormName = 'signin' | 'signup' | 'recovery';

const formNames: Record<TFormName, string> = {
    signin: 'Авторизация',
    signup: 'Регистрация',
    recovery: 'Восстановить пароль',
};

export const AuthModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState<TFormName>('signin');
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (!searchParams.get('auth') || !((searchParams.get('auth') || '') in formNames)) return;
        setCurrentForm(searchParams.get('auth') as TFormName);
        setIsOpen(true);
    }, [searchParams]);

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('auth');
        router.replace(`?${params}`, { scroll: false });
        setIsOpen(false);
        setIsSuccess(false);
    };

    const handleChangeForm = (name: TFormName) => {
        setCurrentForm(name);
        router.push(`?auth=${name}`, { scroll: false });
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} maxWidth={470}>
            {currentForm === 'signin' ? (
                <>
                    <div className={styles.title}>Авторизация</div>
                    <SignInForm />
                    <span className={styles.recovery} onClick={() => handleChangeForm('recovery')}>
                        Восстановить пароль
                    </span>
                    <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signup')}>
                        РЕГИСТРАЦИЯ
                    </Button>
                </>
            ) : currentForm === 'signup' ? (
                <>
                    <div className={styles.title}>Регистрация</div>
                    <SignUpForm setIsSuccess={() => setCurrentForm('signin')} />
                    <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signin')}>
                        ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                    </Button>
                </>
            ) : isSuccess ? (
                <>
                    <div className={styles.title}>Проверьте вашу почту</div>
                    <div className={styles.hint}>
                        Направили письмо с ссылкой для входа в личный кабинет на вашу электронную почту.
                    </div>
                    <Button
                        fullWidth
                        onClick={() => {
                            handleChangeForm('signin');
                            setIsSuccess(false);
                        }}
                    >
                        ВОЙТИ
                    </Button>
                </>
            ) : (
                <>
                    <div className={styles.title}>Восстановить пароль</div>
                    <RecoverForm setIsSuccess={setIsSuccess} />
                    <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signin')}>
                        ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                    </Button>
                </>
            )}
        </Modal>
    );
};
