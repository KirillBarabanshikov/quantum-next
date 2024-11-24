'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { RecoverForm } from '@/features/session/auth/ui/RecoverForm';
import ArrowBack from '@/shared/assets/icons/arrow_left.svg';
import Logo from '@/shared/assets/logo_dark.svg';
import { MAX_WIDTH_LG, MAX_WIDTH_MD } from '@/shared/consts';
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
    const { isMatch: isMatchMd } = useMediaQuery(MAX_WIDTH_MD);

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
            {isMatchMd && <Logo className={styles.logo} />}
            {currentForm === 'signin' ? (
                <div className={styles.signinWrap}>
                    <div className={styles.title}>Авторизация</div>
                    <SignInForm />
                    {isMatchMd && (
                        <div className={styles.separator}>
                            <span />
                            или
                            <span />
                        </div>
                    )}
                    <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signup')}>
                        РЕГИСТРАЦИЯ
                    </Button>
                    <span className={styles.recovery} onClick={() => handleChangeForm('recovery')}>
                        Восстановить пароль
                    </span>
                </div>
            ) : currentForm === 'signup' ? (
                <div className={styles.signupWrap}>
                    {isMatchMd && <ArrowBack onClick={() => handleChangeForm('signin')} className={styles.back} />}
                    <div className={styles.title}>Регистрация</div>
                    <SignUpForm setIsSuccess={() => setCurrentForm('signin')} />
                    {!isMatchMd && (
                        <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signin')}>
                            ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                        </Button>
                    )}
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
                    {isMatchMd && <ArrowBack onClick={() => handleChangeForm('signin')} className={styles.back} />}
                    <div className={styles.title}>Восстановить пароль</div>
                    <RecoverForm setIsSuccess={setIsSuccess} />
                    {!isMatchMd && (
                        <Button fullWidth variant={'outline'} onClick={() => handleChangeForm('signin')}>
                            ВЕРНУТЬСЯ К АВТОРИЗАЦИИ
                        </Button>
                    )}
                </div>
            )}
        </Modal>
    );
};
