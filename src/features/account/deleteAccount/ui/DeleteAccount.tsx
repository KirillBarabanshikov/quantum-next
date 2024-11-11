import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { sessionApi } from '@/entities/session';
import { apiClient } from '@/shared/api';
import { Button, Checkbox, Modal } from '@/shared/ui';

import styles from './DeleteAccount.module.scss';

export const DeleteAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSure, setIsSure] = useState(false);

    const { mutateAsync: deleteUser } = useMutation({
        mutationFn: async () => {
            await apiClient.delete(`/users/delete`);
        },
    });

    const handleDeleteAccount = async () => {
        await deleteUser();
        await sessionApi.logout();
        window.location.reload();
    };

    return (
        <>
            <span className={styles.deleteAccount} onClick={() => setIsOpen(true)}>
                Удалить аккаунт
            </span>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setIsSure(false);
                }}
                title={'Удаление аккаунта'}
                maxWidth={428}
            >
                <div className={styles.wrap}>
                    <div className={styles.warning}>Вы уверены что хотите удалить свой аккаунт</div>
                    <Checkbox
                        label={'«Я уверен(-а), что хочу удалить аккаунт»'}
                        checked={isSure}
                        onChange={(e) => setIsSure(e.target.checked)}
                    />
                    <Button disabled={!isSure} onClick={handleDeleteAccount}>
                        Удалить
                    </Button>
                </div>
            </Modal>
        </>
    );
};
