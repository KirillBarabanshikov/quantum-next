import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { recoverScheme, TRecoverScheme } from '@/features/session/auth/model';
import { apiClient } from '@/shared/api';
import { Button, Input } from '@/shared/ui';

import styles from './RecoverForm.module.scss';

interface IRecoverFormProps {
    setIsSuccess: (value: boolean) => void;
}

export const RecoverForm: FC<IRecoverFormProps> = ({ setIsSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<TRecoverScheme>({ resolver: yupResolver(recoverScheme) });

    const { mutateAsync: recoverPassword } = useMutation({
        mutationFn: async (body: { email?: string; phone?: string }) => {
            await apiClient.post('/users/remember', body);
        },
    });

    const onSubmit = async (data: TRecoverScheme) => {
        try {
            await recoverPassword(data.contact.includes('@') ? { email: data.contact } : { phone: data.contact });
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setError('contact', { message: 'Пользователь не найден' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.recoverForm}>
            <span className={styles.hint}>Введите e-mail или телефон, которые вы указывали при регистрации.</span>
            <Input
                placeholder={'Е-mail или телефон'}
                {...register('contact')}
                error={errors.contact?.message}
                className={styles.input}
            />
            <span className={styles.hint}>
                Ссылка на восстановление пароля будет отправлена на вашу электронную почту
            </span>
            <Button type={'submit'} fullWidth className={styles.button}>
                ВОССТАНОВИТЬ ПАРОЛЬ
            </Button>
        </form>
    );
};
