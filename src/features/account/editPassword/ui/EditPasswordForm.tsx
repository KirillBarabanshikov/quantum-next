import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from '@/app/cabinet/account/AccountPage.module.scss';
import { apiClient } from '@/shared/api';
import { Button, Input, Separator } from '@/shared/ui';
import { AlertModal } from '@/shared/ui/AlertModal';

import { editPasswordFormScheme,TEditPasswordFormScheme } from '../model';

export const EditPasswordForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const defaultValues = {
        oldPassword: '',
        password: '',
        passwordRepeat: '',
    };

    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<TEditPasswordFormScheme>({
        resolver: yupResolver(editPasswordFormScheme),
        mode: 'all',
        defaultValues,
    });

    const { mutateAsync: changePassword, isError } = useMutation({
        mutationFn: (data: TEditPasswordFormScheme) => apiClient.post(`/users/edit-password`, data),
    });

    const onSubmit = async (data: TEditPasswordFormScheme) => {
        try {
            await changePassword(data);
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            reset();
        } catch (error) {
            console.error(error);
        } finally {
            setIsOpen(true);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>Сменить пароль</div>
            <Input
                label={'Старый пароль'}
                {...register('oldPassword')}
                error={errors.oldPassword?.message}
                sizes={'sm'}
            />
            <Input
                label={'Новый пароль'}
                {...register('password', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.password?.message}
                sizes={'sm'}
            />
            <Input
                label={'Повторите новый пароль'}
                {...register('passwordRepeat', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.passwordRepeat?.message}
                sizes={'sm'}
            />
            <Separator margin={'0'} className={styles.formSeparator} />
            <Button type={'submit'} disabled={!isValid} className={styles.button}>
                Сохранить данные
            </Button>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isError={isError}
                onEnter={() => setIsOpen(false)}
                title={isError ? 'Ошибка' : 'Успех'}
                subtitle={isError ? 'Неверный старый пароль' : 'Пароль изменён'}
            />
        </form>
    );
};
