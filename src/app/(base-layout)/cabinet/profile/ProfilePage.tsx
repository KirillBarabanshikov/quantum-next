'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMeQuery } from '@/entities/user/api';
import { apiClient } from '@/shared/api';
import CheckCircle from '@/shared/assets/icons/check_circle.svg';
import { Button, Checkbox, Input, Modal } from '@/shared/ui';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
    const [selectedProfile, setSelectedProfile] = useState<number>();
    const router = useRouter();
    const { data } = useMeQuery();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isSure, setIsSure] = useState(false);

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            await apiClient.delete(`/payer_profiles/delete/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` },
            });
            await queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });

    return (
        <div className={styles.profileWrap}>
            <h2 className={styles.title}>Профили плательщиков</h2>
            <div className={styles.profilesList}>
                {data &&
                    data.payerProfiles.map((item, index) => {
                        const date = new Date(item.passportDate);
                        const formattedDate = date.toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        });

                        return (
                            <div
                                key={item.id}
                                className={clsx(styles.profile, selectedProfile === index && styles.selected)}
                                onClick={() => setSelectedProfile(index)}
                            >
                                <div className={styles.icon}>
                                    <CheckCircle />
                                </div>
                                <div className={styles.profileItem}>
                                    <div className={styles.profileName}>
                                        {item.firstName} {item.lastName}
                                    </div>
                                    <AnimatePresence>
                                        {selectedProfile === index && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className={styles.profileBody}
                                            >
                                                <div className={styles.profileContent}>
                                                    {/*<Badge*/}
                                                    {/*    text={'Профиль верифицирован с помощью Госуслуг'}*/}
                                                    {/*    color={'#058943'}*/}
                                                    {/*/>*/}
                                                    <div className={styles.separator} />
                                                    <form>
                                                        <div className={styles.formBody}>
                                                            <h2>Контакты</h2>
                                                            <div className={styles.inputs}>
                                                                <Input
                                                                    label={'Имя'}
                                                                    className={styles.input}
                                                                    defaultValue={item.firstName}
                                                                    disabled
                                                                />
                                                                <Input
                                                                    label={'Фамилия'}
                                                                    className={styles.input}
                                                                    defaultValue={item.lastName}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <Input
                                                                label={'Телефон'}
                                                                defaultValue={item.phoneNumber}
                                                                disabled
                                                            />
                                                            <Input
                                                                label={'E-mail'}
                                                                defaultValue={item.email}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className={styles.separator} />
                                                        <div className={styles.formBody}>
                                                            <h2>Паспортные данные</h2>
                                                            <div className={styles.inputs}>
                                                                <Input
                                                                    label={'Серия'}
                                                                    className={styles.input}
                                                                    defaultValue={item.passportSeries}
                                                                    disabled
                                                                />
                                                                <Input
                                                                    label={'Номер'}
                                                                    className={styles.input}
                                                                    defaultValue={item.passportNumber}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <Input
                                                                label={'Кем выдан'}
                                                                defaultValue={item.passportIssued}
                                                                disabled
                                                            />
                                                            <div className={styles.inputs}>
                                                                <Input
                                                                    label={'Номер подразделения'}
                                                                    defaultValue={item.passportDepartmentCode}
                                                                    disabled
                                                                    className={styles.input}
                                                                />
                                                                <Input
                                                                    label={'Дата'}
                                                                    className={styles.input}
                                                                    defaultValue={formattedDate}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={clsx(styles.formBody, styles.contacts)}>
                                                            <h2>Адрес доставки</h2>
                                                            <Input
                                                                label={'Город'}
                                                                defaultValue={item.deliveryAddressCity}
                                                                disabled
                                                            />
                                                            <Input
                                                                label={'Адрес'}
                                                                defaultValue={item.deliveryAddress}
                                                                disabled
                                                            />
                                                        </div>
                                                    </form>
                                                    <Button className={styles.button} onClick={() => setIsOpen(true)}>
                                                        Удалить профиль
                                                    </Button>
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
                                                            <div className={styles.warning}>
                                                                Вы уверены что хотите удалить свой аккаунт
                                                            </div>
                                                            <Checkbox
                                                                label={'«Я уверен(-а), что хочу удалить аккаунт»'}
                                                                checked={isSure}
                                                                onChange={(e) => setIsSure(e.target.checked)}
                                                            />
                                                            <Button
                                                                disabled={!isSure}
                                                                onClick={() => {
                                                                    mutate(item.id);
                                                                    setIsOpen(false);
                                                                    setIsSure(false);
                                                                }}
                                                            >
                                                                Удалить
                                                            </Button>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Button className={clsx(styles.button, styles.create)} onClick={() => router.push('/create-profile')}>
                Создать профиль
            </Button>
        </div>
    );
};
