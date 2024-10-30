'use client';

import { FC, useState } from 'react';

import { Button, Checkbox, Modal } from '@/shared/ui';

import styles from './ConfirmModal.module.scss';

interface IConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    warningText: string;
    confirmText: string;
    onConfirm: () => void;
}

export const ConfirmModal: FC<IConfirmModalProps> = ({
    isOpen,
    onClose,
    title,
    warningText,
    confirmText,
    onConfirm,
}) => {
    const [isConfirm, setIsConfirm] = useState(false);

    const handleOnConfirm = () => {
        if (!isConfirm) return;
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth={393}>
            <div className={styles.warningText}>{warningText}</div>
            <Checkbox
                label={confirmText}
                className={styles.checkbox}
                onChange={(e) => setIsConfirm(e.target.checked)}
            />
            <Button fullWidth onClick={handleOnConfirm} disabled={!isConfirm}>
                Удалить
            </Button>
        </Modal>
    );
};
