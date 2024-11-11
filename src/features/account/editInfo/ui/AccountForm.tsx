import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from '@/app/cabinet/account/AccountPage.module.scss';
import { IUser } from '@/entities/user';
import { apiClient } from '@/shared/api';
import { maskPhone } from '@/shared/lib';
import { Button, Input, Separator } from '@/shared/ui';
import { AlertModal } from '@/shared/ui/AlertModal';

import { accountScheme, TAccountScheme } from '../model';

interface IAccountFormProps {
    user: IUser;
}

export const AccountForm: FC<IAccountFormProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const queryClient = useQueryClient();

    const { mutateAsync: editEmail } = useMutation({
        mutationFn: (email: string) => apiClient.post('/users/edit-email', { email }),
    });

    const { mutateAsync: editPhone } = useMutation({
        mutationFn: (phoneNumber: string) => apiClient.post('/users/edit-phone', { phoneNumber }),
    });

    const { mutateAsync: editUsername } = useMutation({
        mutationFn: (username: string) => apiClient.post('/users/edit-username', { username }),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<TAccountScheme>({
        resolver: yupResolver(accountScheme),
        defaultValues: {
            email: user?.email,
            username: user?.username,
            phoneNumber: user?.phoneNumber,
        },
    });

    const watchedValues = watch();

    const isFormChanged = Object.keys({
        username: user.username,
        phoneNumber: user.phoneNumber,
        email: user.email,
    }).some((key) => watchedValues[key as keyof TAccountScheme] !== user[key as keyof typeof user]);

    const onSubmit = async (changedData: TAccountScheme) => {
        try {
            setIsError(false);
            if (changedData.email !== user?.email) {
                await editEmail(changedData.email);
            }
            if (changedData.username !== user?.username) {
                await editUsername(changedData.username);
            }
            if (changedData.phoneNumber !== user?.phoneNumber) {
                await editPhone(changedData.phoneNumber);
            }
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsOpen(true);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>Аккаунт</div>
            <Input
                label={'Логин'}
                defaultValue={user.username}
                {...register('username')}
                error={errors.username?.message}
                sizes={'sm'}
            />
            <Input
                label={'Телефон'}
                defaultValue={user.phoneNumber}
                {...register('phoneNumber', {
                    onChange: (e) => {
                        setValue('phoneNumber', maskPhone(e.target.value));
                        trigger('phoneNumber');
                    },
                })}
                error={errors.phoneNumber?.message}
                sizes={'sm'}
            />
            <Input
                label={'E-mail'}
                defaultValue={user.email}
                {...register('email')}
                error={errors.email?.message}
                sizes={'sm'}
            />
            <Separator margin={'0'} className={styles.formSeparator} />
            <Button type={'submit'} disabled={!isFormChanged} className={styles.button}>
                Сохранить данные
            </Button>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isError={isError}
                onEnter={() => setIsOpen(false)}
                title={isError ? 'Ошибка' : 'Успех'}
                subtitle={isError ? '' : 'Данные сохранены'}
            />
        </form>
    );
};
