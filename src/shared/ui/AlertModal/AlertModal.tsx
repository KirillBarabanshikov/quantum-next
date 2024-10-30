import { FC } from 'react';

import ErrorIcon from '@/shared/assets/icons/error.svg';
import SuccessIcon from '@/shared/assets/icons/success.svg';
import { Button, Modal } from '@/shared/ui';

import styles from './AlertModal.module.scss';

interface IAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    isError?: boolean;
    onEnter?: () => void;
}

export const AlertModal: FC<IAlertModalProps> = ({ isOpen, onClose, isError, onEnter }) => {
    const onClick = () => {
        onEnter && onEnter();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth={561}>
            <div className={styles.body}>
                {isError ? <ErrorIcon /> : <SuccessIcon />}
                <h2 className={styles.title}>{isError ? 'Ошибка' : 'Успех'}</h2>
                <p className={styles.subtitle}>
                    {isError
                        ? 'К сожалению, оплата не прошла. Пожалуйста попробуйте еще раз или выберите другой способ оплаты.'
                        : 'Спасибо за покупку! Оплата прошла успешно. Вся информация о заказе и доставке направлена на вашу электронную почту.'}
                </p>
                <Button fullWidth className={styles.bytton} onClick={onClick}>
                    Понятно
                </Button>
            </div>
        </Modal>
    );
};
