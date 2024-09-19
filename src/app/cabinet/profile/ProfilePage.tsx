'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CheckCircle from '@/shared/assets/icons/check_circle.svg';
import { Badge, Button, Input } from '@/shared/ui';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
    const [selectedProfile, setSelectedProfile] = useState<number>();
    const router = useRouter();

    return (
        <div className={styles.profileWrap}>
            <h2 className={styles.title}>Профили плательщиков</h2>
            <div className={styles.profilesList}>
                <div
                    className={clsx(styles.profile, selectedProfile === 0 && styles.selected)}
                    onClick={() => setSelectedProfile(0)}
                >
                    <div className={styles.icon}>
                        <CheckCircle />
                    </div>
                    <div className={styles.profileItem}>
                        <div className={styles.profileName}>Иван Андреевич Петров</div>
                        <AnimatePresence>
                            {selectedProfile === 0 && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className={styles.profileBody}
                                >
                                    <div className={styles.profileContent}>
                                        <Badge text={'Профиль верифицирован с помощью Госуслуг'} color={'#058943'} />
                                        <div className={styles.separator} />
                                        <form>
                                            <div className={styles.formBody}>
                                                <h2>Контакты</h2>
                                                <div className={styles.inputs}>
                                                    <Input label={'Имя'} className={styles.input} />
                                                    <Input label={'Фамилия'} className={styles.input} />
                                                </div>
                                                <Input label={'Телефон'} />
                                                <Input label={'E-mail'} />
                                            </div>
                                            <div className={styles.separator} />
                                            <div className={styles.formBody}>
                                                <h2>Паспортные данные</h2>
                                                <div className={styles.inputs}>
                                                    <Input label={'Серия'} className={styles.input} />
                                                    <Input label={'Номер'} className={styles.input} />
                                                </div>
                                                <Input label={'Кем выдан'} />
                                                <div className={styles.inputs}>
                                                    <Input label={'Номер подразделения'} className={styles.input} />
                                                    <Input label={'Дата'} className={styles.input} />
                                                </div>
                                            </div>
                                            <div className={clsx(styles.formBody, styles.contacts)}>
                                                <h2>Адрес доставки</h2>
                                                <Input label={'Город'} />
                                                <Input label={'Адрес'} />
                                            </div>
                                        </form>
                                        <Button className={styles.button}>Удалить профиль</Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <Button className={clsx(styles.button, styles.create)} onClick={() => router.push('/create-profile')}>
                Создать профиль
            </Button>
        </div>
    );
};
