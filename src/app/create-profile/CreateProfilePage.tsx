'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMeQuery } from '@/entities/user/api';
import { individualProfileScheme, TIndividualProfileScheme } from '@/feature/profile/createProfile';
import { instance } from '@/shared/api';
import CheckCircle from '@/shared/assets/icons/check_circle.svg';
import { maskPhone } from '@/shared/lib';
import { Button, Checkbox, Input } from '@/shared/ui';

import styles from './CreateProfilePage.module.scss';

export const CreateProfilePage = () => {
    const [selectedProfile, setSelectedProfile] = useState<number>();
    const router = useRouter();

    const { refetch } = useMeQuery({ enabled: false });

    const { mutateAsync: createProfile } = useMutation({
        mutationFn: async (body: TIndividualProfileScheme & { type: string }) => {
            await instance.post('/payer_profiles/create', body, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` },
            });
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<TIndividualProfileScheme>({
        resolver: yupResolver(individualProfileScheme),
    });

    const onSubmit = async (data: TIndividualProfileScheme) => {
        const [day, month, year] = data.passportDate.split('.');

        const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

        await createProfile({ ...data, type: 'individual', passportDate: date.toISOString() });
        refetch().then(() => router.push('/cabinet/orders'));
    };

    return (
        <section className={styles.createProfilePage}>
            <div className={'container'}>
                <h1 className={clsx(styles.title, 'title')}>Новый профиль</h1>
                <div className={styles.profilesList}>
                    <div className={styles.profileTitle}>Выберите ваш юридический статус:</div>

                    <div
                        className={clsx(styles.profile, selectedProfile === 0 && styles.selected)}
                        onClick={() => setSelectedProfile(0)}
                    >
                        <div className={styles.icon}>
                            <CheckCircle />
                        </div>
                        <div className={styles.profileItem}>
                            <div className={styles.profileName}>Физическое лицо</div>
                            <AnimatePresence>
                                {selectedProfile === 0 && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className={styles.profileBody}
                                    >
                                        <div className={styles.profileContent}>
                                            <div className={styles.separator} />
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className={styles.wrap}>
                                                    <div className={styles.formBody}>
                                                        <h2>Контакты</h2>
                                                        <div className={styles.inputs}>
                                                            <Input
                                                                label={'Имя'}
                                                                placeholder={'Иван'}
                                                                className={styles.input}
                                                                {...register('firstName')}
                                                                error={errors.firstName?.message}
                                                            />
                                                            <Input
                                                                label={'Фамилия'}
                                                                placeholder={'Иванов'}
                                                                className={styles.input}
                                                                {...register('lastName')}
                                                                error={errors.lastName?.message}
                                                            />
                                                        </div>
                                                        <Input
                                                            label={'Телефон'}
                                                            placeholder={'+7 (495) 000 00 00'}
                                                            {...register('phoneNumber', {
                                                                onChange: (e) => {
                                                                    setValue('phoneNumber', maskPhone(e.target.value));
                                                                    trigger('phoneNumber');
                                                                },
                                                            })}
                                                            error={errors.phoneNumber?.message}
                                                        />
                                                        <Input
                                                            label={'E-mail'}
                                                            placeholder={'example@email.com'}
                                                            {...register('email')}
                                                            error={errors.email?.message}
                                                        />
                                                    </div>
                                                    <div className={styles.formBody}>
                                                        <h2>Паспортные данные</h2>
                                                        <div className={styles.inputs}>
                                                            <Input
                                                                label={'Серия'}
                                                                placeholder={'0000'}
                                                                className={styles.input}
                                                                {...register('passportSeries')}
                                                                error={errors.passportSeries?.message}
                                                            />
                                                            <Input
                                                                label={'Номер'}
                                                                placeholder={'000000'}
                                                                className={styles.input}
                                                                {...register('passportNumber')}
                                                                error={errors.passportNumber?.message}
                                                            />
                                                        </div>
                                                        <Input
                                                            label={'Кем выдан'}
                                                            placeholder={'ГУ МВД по г. Москва'}
                                                            {...register('passportIssued')}
                                                            error={errors.passportIssued?.message}
                                                        />
                                                        <div className={styles.inputs}>
                                                            <Input
                                                                label={'Номер подразделения'}
                                                                placeholder={'310-067'}
                                                                className={styles.input}
                                                                {...register('passportDepartmentCode')}
                                                                error={errors.passportDepartmentCode?.message}
                                                            />
                                                            <Input
                                                                label={'Дата'}
                                                                placeholder={'01.01.2024'}
                                                                className={styles.input}
                                                                {...register('passportDate')}
                                                                error={errors.passportDate?.message}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.separator} />
                                                <div className={clsx(styles.formBody, styles.contacts)}>
                                                    <h2>Адрес доставки</h2>
                                                    <Input
                                                        label={'Город'}
                                                        placeholder={'Москва'}
                                                        {...register('deliveryAddressCity')}
                                                        error={errors.deliveryAddressCity?.message}
                                                    />
                                                    <Input
                                                        label={'Адрес'}
                                                        placeholder={'ул. Проспект мира 3, д. 1, к2'}
                                                        {...register('deliveryAddress')}
                                                        error={errors.deliveryAddress?.message}
                                                    />
                                                </div>
                                                <div className={styles.separator} />
                                                <Checkbox label={'согласие на обработку персональных данных'} />
                                                <Button className={styles.button} type={'submit'}>
                                                    Создать профиль
                                                </Button>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
