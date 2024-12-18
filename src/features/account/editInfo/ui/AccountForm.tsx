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
    const [error, setError] = useState('');
    const queryClient = useQueryClient();

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

    const { mutateAsync: editAccount } = useMutation({
        mutationFn: (data: Partial<TAccountScheme>) =>
            apiClient.patch(
                '/users/edit-user',
                { username: data.username, phone: data.phoneNumber, email: data.email },
                { headers: { 'content-type': 'application/vnd.api+json' } },
            ),
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
            const updatedFields: Partial<TAccountScheme> = {};

            if (changedData.username !== user.username) {
                updatedFields.username = changedData.username;
            }

            if (changedData.phoneNumber !== user.phoneNumber) {
                updatedFields.phoneNumber = changedData.phoneNumber;
            }

            if (changedData.email !== user.email) {
                updatedFields.email = changedData.email;
            }
            await editAccount(updatedFields);
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (error: any) {
            console.error(error);
            if (error.response.data.details === 'User with that email already exists.') {
                setError('Пользователь с таким адресом электронной почты уже существует');
            } else if (error.response.data.details === 'User with that phone already exists.') {
                setError('Пользователь с таким телефоном уже существует');
            } else if (error.response.data.details === 'User with that username already exists.') {
                setError('Пользователь с таким логином уже существует');
            } else {
                setError('Что-то пошло не так');
            }
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
                subtitle={isError ? error : 'Данные сохранены'}
            />
        </form>
    );
};
