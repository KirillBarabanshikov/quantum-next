import { FC, useState } from 'react';

import { RecoverForm } from '@/feature/session/auth/ui/RecoverForm';
import { Button, Modal } from '@/shared/ui';

import { LoginForm } from '../LoginForm';
import { RegForm } from '../RegForm';
import styles from './AuthModal.module.scss';

interface IAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const titles: Record<string, string> = {
    login: 'Авторизация',
    reg: 'Регистрация',
    recover: 'Восстановить пароль',
};

export const AuthModal: FC<IAuthModalProps> = ({ isOpen, onClose }) => {
    const [currentForm, setCurrentForm] = useState('login');

    const handleClose = () => {
        onClose();
        setCurrentForm('login');
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={titles[currentForm]}>
            {currentForm === 'login' ? (
                <div>
                    <LoginForm />
                    <span className={styles.recovery} onClick={() => setCurrentForm('recover')}>
                        Восстановить пароль
                    </span>
                    <Button fullWidth variant={'outline'} onClick={() => setCurrentForm('reg')}>
                        Регистрация
                    </Button>
                </div>
            ) : currentForm === 'reg' ? (
                <div>
                    <RegForm />
                    <Button fullWidth variant={'outline'} onClick={() => setCurrentForm('login')}>
                        Вернуться к авторизации
                    </Button>
                </div>
            ) : (
                <div>
                    <RecoverForm />
                    <Button fullWidth variant={'outline'} onClick={() => setCurrentForm('login')}>
                        Вернуться к авторизации
                    </Button>
                </div>
            )}
        </Modal>
    );
};
