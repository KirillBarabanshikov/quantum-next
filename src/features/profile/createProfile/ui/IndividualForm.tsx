'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IProfile, IUser, userApi } from '@/entities/user';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { maskPassportDepartmentCode, maskPhone } from '@/shared/lib';
import { Button, Checkbox, ConfirmModal, Input, Separator } from '@/shared/ui';

import { individualFormScheme, TIndividualFormScheme } from '../model';
import styles from './styles.module.scss';

interface IIndividualFormProps {
    profile?: IProfile;
    variant?: 'order';
}

export const IndividualForm: FC<IIndividualFormProps> = ({ profile, variant }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);
    const { mutateAsync: createProfile } = useMutation({ mutationFn: userApi.createProfile });
    const { mutateAsync: deleteProfile } = useMutation({ mutationFn: userApi.deleteProfile });
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<TIndividualFormScheme>({
        resolver: yupResolver(individualFormScheme),
        defaultValues: {
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            phoneNumber: profile?.phoneNumber,
            email: profile?.email,
            passportSeries: profile?.passportSeries,
            passportNumber: profile?.passportNumber,
            passportIssued: profile?.passportIssued,
            passportDepartmentCode: maskPassportDepartmentCode(profile?.passportDepartmentCode || ''),
            passportDate: profile ? new Date(profile.passportDate).toISOString().split('T')[0] : undefined,
            deliveryAddressCity: profile?.deliveryAddressCity,
            deliveryAddress: profile?.deliveryAddress,
            checked: !!profile,
        },
    });

    const onSubmit = async (data: TIndividualFormScheme) => {
        try {
            await createProfile({
                ...data,
                type: 'individual',
                passportDepartmentCode: data.passportDepartmentCode.replace(/\D/g, ''),
            });
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            window.location.href = '/cabinet/profile';
        } catch (e) {
            console.error(e);
        }
    };

    const onDelete = async () => {
        if (!profile) return;

        try {
            await deleteProfile(profile.id);
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            const user = queryClient.getQueryData<IUser>(['user']);
            if (user && user.payerProfiles.length === 0) window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.individualForm}>
            <div className={clsx(styles.section, styles.contacts)}>
                <div className={styles.sectionTitle}>Контакты</div>
                <div className={styles.inputs}>
                    <Input
                        placeholder={'Имя'}
                        label={'Имя'}
                        sizes={'sm'}
                        {...register('firstName')}
                        error={errors.firstName?.message}
                    />
                    <Input
                        placeholder={'Фамилия'}
                        label={'Фамилия'}
                        sizes={'sm'}
                        {...register('lastName')}
                        error={errors.lastName?.message}
                    />
                </div>
                <Input
                    placeholder={'+7 (495) 000 00 00'}
                    label={'Телефон'}
                    sizes={'sm'}
                    {...register('phoneNumber', {
                        onChange: (e) => {
                            setValue('phoneNumber', maskPhone(e.target.value));
                            trigger('phoneNumber');
                        },
                    })}
                    error={errors.phoneNumber?.message}
                />
                <Input
                    placeholder={'example@email.com'}
                    label={'E-mail'}
                    sizes={'sm'}
                    {...register('email')}
                    error={errors.email?.message}
                />
            </div>
            {isMatch && <Separator margin={'12px 0'} />}
            <div className={clsx(styles.section, styles.passport)}>
                <div className={styles.sectionTitle}>Паспортные данные</div>
                <div className={styles.inputs}>
                    <Input
                        placeholder={'0000'}
                        label={'Серия'}
                        sizes={'sm'}
                        {...register('passportSeries')}
                        error={errors.passportSeries?.message}
                    />
                    <Input
                        placeholder={'000000'}
                        label={'Номер'}
                        sizes={'sm'}
                        {...register('passportNumber')}
                        error={errors.passportNumber?.message}
                    />
                </div>
                <Input
                    placeholder={'ГУ МВД по г. Москва'}
                    label={'Кем выдан'}
                    sizes={'sm'}
                    {...register('passportIssued')}
                    error={errors.passportIssued?.message}
                />
                <div className={styles.inputs}>
                    <Input
                        placeholder={'310-067'}
                        label={'№ подразделения'}
                        sizes={'sm'}
                        {...register('passportDepartmentCode', {
                            onChange: (e) => {
                                setValue('passportDepartmentCode', maskPassportDepartmentCode(e.target.value));
                                trigger('passportDepartmentCode');
                            },
                        })}
                        error={errors.passportDepartmentCode?.message}
                    />
                    <Input
                        placeholder={'01.01.2024'}
                        type={'date'}
                        label={'Дата'}
                        sizes={'sm'}
                        {...register('passportDate')}
                        error={errors.passportDate?.message}
                    />
                </div>
            </div>
            <Separator className={styles.separator} margin={'12px 0'} />
            <div className={clsx(styles.section, styles.delivery)}>
                <div className={styles.sectionTitle}>Адрес доставки</div>
                <Input
                    placeholder={'Москва'}
                    label={'Город'}
                    sizes={'sm'}
                    {...register('deliveryAddressCity')}
                    error={errors.deliveryAddressCity?.message}
                />
                <Input
                    placeholder={'ул. Проспект мира 3, д. 1, к2'}
                    label={'Адрес'}
                    sizes={'sm'}
                    {...register('deliveryAddress')}
                    error={errors.deliveryAddress?.message}
                />
            </div>
            {!variant ? (
                !profile ? (
                    <div className={styles.foot}>
                        <Separator margin={'12px 0 0 0'} />
                        <Checkbox
                            label={'согласие на обработку персональных данных'}
                            {...register('checked')}
                            error={!!errors.checked}
                        />
                        <Button type={'submit'} fullWidth>
                            Создать профиль
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button type={'button'} className={styles.deleteProfile} onClick={() => setIsConfirmOpen(true)}>
                            Удалить профиль
                        </Button>
                        <ConfirmModal
                            isOpen={isConfirmOpen}
                            onClose={() => setIsConfirmOpen(false)}
                            title={'Удалить профиль'}
                            warningText={'Вы уверены что хотите удалить профиль'}
                            confirmText={'«Я уверен(-а), что хочу удалить профиль»'}
                            onConfirm={onDelete}
                        />
                    </>
                )
            ) : (
                <></>
            )}
        </form>
    );
};
