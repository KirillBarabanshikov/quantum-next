'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { RecoverForm } from '@/features/session/auth/ui/RecoverForm';
import { MAX_WIDTH_LG } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
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

interface IAuthModalProps {
    isAuthenticated: boolean;
}

export const AuthModal: FC<IAuthModalProps> = ({ isAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState<TFormName>('signin');
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isMatch } = useMediaQuery(MAX_WIDTH_LG);

    useEffect(() => {
        if (isAuthenticated) {
            handleClose();
            return;
        }

        if (!searchParams.get('auth') || !((searchParams.get('auth') || '') in formNames)) return;
        setCurrentForm(searchParams.get('auth') as TFormName);
        setIsOpen(true);
    }, [searchParams, isAuthenticated]);

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
        <Modal isOpen={isOpen} onClose={handleClose} maxWidth={470} fullScreen={isMatch}>
            {currentForm === 'signin' ? (
                <div className={styles.signinWrap}>
                    <div className={styles.title}>Авторизация</div>
                    <SignInForm />
                    <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signup')}>
                        РЕГИСТРАЦИЯ
                    </Button>
                    <span className={styles.recovery} onClick={() => handleChangeForm('recovery')}>
                        Восстановить пароль
                    </span>
                </div>
            ) : currentForm === 'signup' ? (
                <div className={styles.signupWrap}>
                    <div className={styles.title}>Регистрация</div>
                    <SignUpForm setIsSuccess={() => setCurrentForm('signin')} />
                    <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signin')}>
                        ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                    </Button>
                </div>
            ) : isSuccess ? (
                <div className={styles.mailWrap}>
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
                </div>
            ) : (
                <div className={styles.recoveryWrap}>
                    <div className={styles.title}>Восстановить пароль</div>
                    <RecoverForm setIsSuccess={setIsSuccess} />
                    <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signin')}>
                        ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                    </Button>
                </div>
            )}
        </Modal>
    );
};
