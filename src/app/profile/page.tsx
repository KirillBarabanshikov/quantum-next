'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Button, Checkbox, Input, Radio, Separator } from '@/shared/ui';

import styles from './page.module.scss';

const statuses = ['Физическое лицо', 'Юридическое лицо', 'Индивидуальный предприниматель'];

export default function Profile() {
    const [currentStatus, setCurrentStatus] = useState<number>();

    return (
        <div className={styles.profilePage}>
            <section>
                <div className={styles.container}>
                    <h1 className={clsx(styles.title, 'title')}>Новый профиль</h1>
                    <div className={styles.label}>Выберите ваш юридический статус:</div>
                    <div className={styles.statusesList}>
                        {statuses.map((status, index) => (
                            <Radio
                                key={status}
                                label={status}
                                name={'status'}
                                defaultValue={status}
                                onChange={() => setCurrentStatus(index)}
                            />
                        ))}
                    </div>
                    <AnimatePresence mode='wait'>
                        {currentStatus !== undefined && (
                            <motion.div
                                key={currentStatus}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {
                                    [
                                        <PhysicalForm key={'PhysicalForm'} />,
                                        <LegalForm key={'LegalForm'} />,
                                        <IndividualEntrepreneurForm key={'IndividualEntrepreneurForm'} />,
                                    ][currentStatus]
                                }
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}

const PhysicalForm = () => {
    return (
        <div>
            <Separator />
            <div className={styles.hint}>
                Для синхронизации данных с сервисом госуслуг необходима авторизация на gosuslugi.ru
            </div>
            <div className={styles.buttons}>
                <Button className={styles.button}>Авторизация через Госуслуги</Button>
            </div>
            <Separator />
            <form>
                <div className={styles.wrap}>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Контакты</h2>
                        <div className={styles.inputsColumn}>
                            <div className={styles.inputsRow}>
                                <Input label={'Имя'} placeholder={'Иван'} className={styles.input} />
                                <Input label={'Фамилия'} placeholder={'Иванов'} className={styles.input} />
                            </div>
                            <Input label={'Телефон'} placeholder={'+7 (495) 000 00 00'} />
                            <Input label={'E-mail'} placeholder={'example@email.com'} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Паспортные данные</h2>
                        <div className={styles.inputsColumn}>
                            <div className={styles.inputsRow}>
                                <Input label={'Серия'} placeholder={'0000'} className={styles.input} />
                                <Input label={'Номер'} placeholder={'000000'} className={styles.input} />
                            </div>
                            <Input label={'Кем выдан'} placeholder={'ГУ МВД по г. Москва '} />
                            <div className={styles.inputsRow}>
                                <Input label={'Номер подразделения'} placeholder={'310-097'} className={styles.input} />
                                <Input label={'Дата'} placeholder={'01.01.2024'} className={styles.input} />
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className={styles.formItem}>
                    <h2 className={styles.formTitle}>Адрес доставки</h2>
                    <div className={styles.inputsColumn}>
                        <Input label={'Город'} placeholder={'Москва'} />
                        <Input label={'Адрес'} placeholder={'ул. Проспект мира 3, д. 1, к2'} />
                    </div>
                </div>
                <Separator />
                <Checkbox label={'согласие на обработку персональных данных'} />
                <Button className={styles.createButton} fullWidth>
                    Создать профиль
                </Button>
            </form>
        </div>
    );
};

const LegalForm = () => {
    return (
        <div>
            <Separator />
            <div className={styles.hint}>
                Для синхронизации данных необходима авторизация на gosuslugi.ru или через Электронную цифровую подпись
            </div>
            <div className={styles.buttons}>
                <Button className={styles.button}>Авторизация через Госуслуги</Button>
                <Button className={styles.button}>Авторизация через ЭЦП</Button>
            </div>
            <Separator />
            <form>
                <div className={styles.wrap}>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Реквизиты компании</h2>
                        <div className={styles.inputsColumn}>
                            <div className={styles.inputsRow}>
                                <Input label={'ИНН'} placeholder={'000000000000'} className={styles.input} />
                                <Input label={'ОГРН'} placeholder={'0000000000000'} className={styles.input} />
                            </div>
                            <Input label={'Справка из ЕГРЮЛ'} placeholder={'+7 (495) 000 00 00'} />
                            <Input label={'Юридический адрес'} placeholder={'example@email.com'} />
                            <Input label={'Фактический адрес'} placeholder={'example@email.com'} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <div className={styles.inputsColumn}>
                            <Input label={'Расчетный счет'} placeholder={'00000 00000 00000 00000'} />
                            <Input label={'Корреспондентский счет'} placeholder={'00000 00000 00000 00000'} />
                            <Input label={'БИК'} placeholder={'00000 00000 00000 00000'} />
                            <Input label={'Наименование банка'} placeholder={'Квантум Банк'} />
                        </div>
                    </div>
                </div>
                <Separator />
                <div className={styles.wrap}>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Адрес доставки</h2>
                        <div className={styles.inputsColumn}>
                            <Input label={'Город'} placeholder={'Москва'} />
                            <Input label={'Адрес'} placeholder={'ул. Проспект мира 3, д. 1, к2'} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Контакты</h2>
                        <div className={styles.inputsColumn}>
                            <Input label={'Телефон'} placeholder={'+7 (495) 000 00 00'} />
                            <Input label={'E-mail'} placeholder={'example@email.com'} />
                        </div>
                    </div>
                </div>
                <Separator />
                <Checkbox label={'согласие на обработку персональных данных'} />
                <Button className={styles.createButton} fullWidth>
                    Создать профиль
                </Button>
            </form>
        </div>
    );
};

const IndividualEntrepreneurForm = () => {
    return (
        <div>
            <Separator />
            <div className={styles.hint}>
                Для синхронизации данных необходима авторизация на gosuslugi.ru или через Электронную цифровую подпись
            </div>
            <div className={styles.buttons}>
                <Button className={styles.button}>Авторизация через Госуслуги</Button>
                <Button className={styles.button}>Авторизация через ЭЦП</Button>
            </div>
            <Separator />
            <form>
                <div className={styles.wrap}>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Реквизиты компании</h2>
                        <div className={styles.inputsColumn}>
                            <div className={styles.inputsRow}>
                                <Input label={'ИНН'} placeholder={'000000000000'} className={styles.input} />
                                <Input label={'ОГРН'} placeholder={'0000000000000'} className={styles.input} />
                            </div>
                            <Input label={'Справка из ЕГРЮЛ'} placeholder={'+7 (495) 000 00 00'} />
                            <Input label={'Юридический адрес'} placeholder={'example@email.com'} />
                            <Input label={'Фактический адрес'} placeholder={'example@email.com'} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <div className={styles.inputsColumn}>
                            <Input label={'Расчетный счет'} placeholder={'00000 00000 00000 00000'} />
                            <Input label={'Корреспондентский счет'} placeholder={'00000 00000 00000 00000'} />
                            <Input label={'БИК'} placeholder={'00000 00000 00000 00000'} />
                            <Input label={'Наименование банка'} placeholder={'Квантум Банк'} />
                        </div>
                    </div>
                </div>
                <Separator />
                <div className={styles.wrap}>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Адрес доставки</h2>
                        <div className={styles.inputsColumn}>
                            <Input label={'Город'} placeholder={'Москва'} />
                            <Input label={'Адрес'} placeholder={'ул. Проспект мира 3, д. 1, к2'} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <h2 className={styles.formTitle}>Контакты</h2>
                        <div className={styles.inputsColumn}>
                            <Input label={'Телефон'} placeholder={'+7 (495) 000 00 00'} />
                            <Input label={'E-mail'} placeholder={'example@email.com'} />
                        </div>
                    </div>
                </div>
                <Separator />
                <Checkbox label={'согласие на обработку персональных данных'} />
                <Button className={styles.createButton} fullWidth>
                    Создать профиль
                </Button>
            </form>
        </div>
    );
};
