'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { IndividualForm } from '@/features/profile';
import { Accordion, Button, Separator } from '@/shared/ui';

import styles from './CreateProfilePage.module.scss';

export const CreateProfilePage = () => {
    const [selectedProfile, setSelectedProfile] = useState(0);

    return (
        <div className={clsx(styles.createProfilePage, 'page')}>
            <section className={'container'}>
                <h1 className={clsx(styles.title, 'title')}>Новый профиль</h1>
                <div className={styles.profilesWrap}>
                    <div className={styles.profilesTitle}>Выберите ваш юридический статус:</div>
                    <div className={styles.profilesList}>
                        <Accordion
                            title={'Физическое лицо'}
                            isOpen={selectedProfile === 0}
                            onClick={() => setSelectedProfile(0)}
                        >
                            <Separator margin={'0 0 24px 0'} />
                            <div className={styles.hint}>
                                Для синхронизации данных с сервисом госуслуг необходима авторизация на gosuslugi.ru
                            </div>
                            <Button fullWidth>Авторизация через Госуслуги</Button>
                            <Separator />
                            <IndividualForm />
                        </Accordion>
                        {/*<Accordion*/}
                        {/*    title={'Юридическое лицо'}*/}
                        {/*    isOpen={selectedProfile === 1}*/}
                        {/*    onClick={() => setSelectedProfile(1)}*/}
                        {/*>*/}
                        {/*    <Separator margin={'0 0 24px 0'} />*/}
                        {/*    <div className={styles.hint}>*/}
                        {/*        Для синхронизации данных необходима авторизация на gosuslugi.ru или через Электронную*/}
                        {/*        цифровую подпись*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.buttons}>*/}
                        {/*        <Button fullWidth>Авторизация через Госуслуги</Button>*/}
                        {/*        <Button fullWidth>Авторизация через ЭЦП</Button>*/}
                        {/*    </div>*/}
                        {/*    <Separator />*/}
                        {/*    <LegalForm />*/}
                        {/*</Accordion>*/}
                        {/*<Accordion*/}
                        {/*    title={'Индивидуальный предприниматель'}*/}
                        {/*    isOpen={selectedProfile === 2}*/}
                        {/*    onClick={() => setSelectedProfile(2)}*/}
                        {/*>*/}
                        {/*    <Separator margin={'0 0 24px 0'} />*/}
                        {/*    <div className={styles.hint}>*/}
                        {/*        Для синхронизации данных необходима авторизация на gosuslugi.ru или через Электронную*/}
                        {/*        цифровую подпись*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.buttons}>*/}
                        {/*        <Button fullWidth>Авторизация через Госуслуги</Button>*/}
                        {/*        <Button fullWidth>Авторизация через ЭЦП</Button>*/}
                        {/*    </div>*/}
                        {/*    <Separator />*/}
                        {/*    <EntrepreneurForm />*/}
                        {/*</Accordion>*/}
                    </div>
                </div>
            </section>
        </div>
    );
};
