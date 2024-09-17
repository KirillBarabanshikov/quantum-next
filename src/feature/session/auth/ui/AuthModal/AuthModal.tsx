import { FC, useState } from 'react';

import { RecoverForm } from '@/feature/session/auth/ui/RecoverForm';
import { Button, Modal } from '@/shared/ui';

import { SignInForm } from '../SignInForm';
import { SignUpForm } from '../SignUpForm';
import styles from './AuthModal.module.scss';

interface IAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const titles: Record<string, string> = {
    signIn: 'Авторизация',
    signUp: 'Регистрация',
    recover: 'Восстановить пароль',
};

export const AuthModal: FC<IAuthModalProps> = ({ isOpen, onClose }) => {
    const [currentForm, setCurrentForm] = useState('signIn');

    const handleClose = () => {
        onClose();
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
