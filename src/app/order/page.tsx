'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import BackIcon from '@/shared/assets/icons/arrow_right_alt.svg';
import CheckCircle from '@/shared/assets/icons/check_circle.svg';
import CheckIcon from '@/shared/assets/icons/priority.svg';
import { Badge, Button, Input, Radio } from '@/shared/ui';

import styles from './page.module.scss';

export default function Order() {
    const [selectedProfile, setSelectedProfile] = useState<number>();

    return (
        <div className={styles.orderPage}>
            <section>
                <div className={'container'}>
                    <Link href={'/cart'} className={styles.back}>
                        <BackIcon />
                        Назад в корзину
                    </Link>
                    <h1 className={clsx(styles.title, 'title')}>Оформление заказа</h1>
                    <div className={styles.order}>
                        <div className={styles.info}>
                            <div className={clsx(styles.content, styles.profiles)}>
                                <h2>Выберите профиль плательщика</h2>
                                <div className={styles.profilesList}>
                                    <div
                                        className={clsx(styles.profile, selectedProfile === 0 && styles.selected)}
                                        onClick={() => setSelectedProfile(0)}
                                    >
                                        <div className={styles.icon}>
                                            <CheckCircle />
                                        </div>
                                        <div className={styles.profileItem}>
                                            <div className={styles.profileName}>ООО «Цифродинамика»</div>
                                            <AnimatePresence>
                                                {selectedProfile === 0 && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: 'auto' }}
                                                        exit={{ height: 0 }}
                                                        className={styles.profileBody}
                                                    >
                                                        <div className={styles.profileContent}>
                                                            <Badge
                                                                text={'Профиль верифицирован с помощью Госуслуг'}
                                                                color={'#058943'}
                                                            />
                                                            <div className={styles.separator} />
                                                            <form>
                                                                <div className={styles.formBody}>
                                                                    <h2>Реквизиты компании</h2>
                                                                    <div className={styles.inputs}>
                                                                        <Input
                                                                            label={'ИНН'}
                                                                            placeholder={'00000000000'}
                                                                            className={styles.input}
                                                                        />
                                                                        <Input
                                                                            label={'ОГРН'}
                                                                            placeholder={'000000000000'}
                                                                            className={styles.input}
                                                                        />
                                                                    </div>
                                                                    <Input
                                                                        label={'Справка из ЕГРЮЛ'}
                                                                        placeholder={'Выписка № 114658'}
                                                                    />
                                                                    <Input
                                                                        label={'Юридический адрес'}
                                                                        placeholder={'ул. Проспект мира 3, д. 1, к2'}
                                                                    />
                                                                    <Input
                                                                        label={'Фактический адрес'}
                                                                        placeholder={'ул. Проспект мира 3, д. 1, к2'}
                                                                    />
                                                                    <Input
                                                                        label={'Расчетный счет'}
                                                                        placeholder={'00000 00000 00000 00000'}
                                                                    />
                                                                    <Input
                                                                        label={'Корреспондентский счет'}
                                                                        placeholder={'00000 00000 00000 00000'}
                                                                    />
                                                                    <Input label={'БИК'} placeholder={'000000000'} />
                                                                    <Input
                                                                        label={'Наименование банка'}
                                                                        placeholder={'Квантум Банк'}
                                                                    />
                                                                </div>
                                                                <div className={styles.separator} />
                                                                <div className={styles.formBody}>
                                                                    <h2>Адрес доставки</h2>
                                                                    <Input label={'Город'} placeholder={'Москва'} />
                                                                    <Input
                                                                        label={'Адрес'}
                                                                        placeholder={'ул. Проспект мира 3, д. 1, к2'}
                                                                    />
                                                                </div>
                                                                <div className={clsx(styles.formBody, styles.contacts)}>
                                                                    <h2>Контакты</h2>
                                                                    <Input
                                                                        label={'Телефон'}
                                                                        placeholder={'+7 (495) 000 00 00'}
                                                                    />
                                                                    <Input
                                                                        label={'E-mail'}
                                                                        placeholder={'example@email.com'}
                                                                    />
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttonWrap}>
                                    <Link href={'/profile'}>
                                        <Button className={styles.button}>Создать профиль</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className={clsx(styles.content, styles.delivery)}>
                                <div>
                                    <h2>Доставка</h2>
                                    <div className={styles.label}>Способ доставки</div>
                                    <div className={styles.deliveriesList}>
                                        <div className={styles.deliveryItem}>
                                            <Radio label={'Курьер по Москве в пределах МКАДа — 290 ₽'} />
                                            <span className={styles.term}>завтра</span>
                                        </div>
                                        <div className={styles.deliveryItem}>
                                            <Radio label={'Срочная доставка в пределах МКАДа ⚡️ — 1000 ₽'} />
                                            <span className={styles.term}>сегодня</span>
                                        </div>
                                        <div className={styles.deliveryItem}>
                                            <Radio label={'Курьер по Москве в пределах МКАДа — 290 ₽'} />
                                            <span className={styles.term}>завтра</span>
                                        </div>
                                        <div className={styles.deliveryItem}>
                                            <Radio label={'Курьер по Москве в пределах МКАДа — 290 ₽'} />
                                            <span className={styles.term}>завтра</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2>Адрес доставки</h2>
                                    <div className={styles.formBody}>
                                        <Input label={'Город'} placeholder={'Москва'} theme={'white'} />
                                        <Input label={'Улица'} placeholder={'ул. Проспект мира 3'} theme={'white'} />
                                        <div className={styles.inputs}>
                                            <Input
                                                label={'Дом'}
                                                placeholder={'ул. Проспект мира 3, д. 1, к2'}
                                                theme={'white'}
                                                className={styles.input}
                                            />
                                            <Input
                                                label={'Подъезд'}
                                                placeholder={'1'}
                                                theme={'white'}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputs}>
                                            <Input
                                                label={'Этаж'}
                                                placeholder={'4'}
                                                theme={'white'}
                                                className={styles.input}
                                            />
                                            <Input
                                                label={'Квартира/офис'}
                                                placeholder={'6'}
                                                theme={'white'}
                                                className={styles.input}
                                            />
                                        </div>
                                        <Input
                                            label={'Комментарий'}
                                            placeholder={'Комментарий к заказу'}
                                            theme={'white'}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2>Контакты</h2>
                                    <div className={styles.formBody}>
                                        <Input label={'Телефон'} placeholder={'+7 (495) 000 00 00'} theme={'white'} />
                                        <Input label={'E-mail'} placeholder={'example@email.com'} theme={'white'} />
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.content, styles.products)}>
                                <h2>Состав заказа</h2>
                                <div className={styles.productsList}>
                                    <div className={styles.product}>
                                        <Image
                                            src={
                                                'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                                            }
                                            width={130}
                                            height={114}
                                            alt={'product'}
                                            className={styles.image}
                                        />
                                        <div className={styles.productInfo}>
                                            <div className={styles.productNameWrap}>
                                                <div className={styles.productName}>
                                                    Набор BETAFPV Cetus Pro FPV Kit (RTF)
                                                </div>
                                                <div className={styles.productPrice}>29 990 ₽</div>
                                            </div>
                                            <div className={styles.productCharacteristics}>
                                                <div>Комплект</div>
                                                <div>Артикул: 274916</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.content, styles.check)}>
                            <div className={styles.checkInfo}>
                                <div className={styles.checkWrap}>
                                    <div>Всего: 3 товара</div>
                                    <div className={styles.ellipse} />
                                    <div>2 489 г</div>
                                </div>
                                <div>190 770 ₽</div>
                            </div>
                            <div className={styles.separator} />
                            <div className={styles.checkDelivery}>
                                <div>Доставка</div>
                                <div>Бесплатно</div>
                            </div>
                            <Input placeholder={'Промокод'} theme={'white'} className={styles.input} />
                            <div className={styles.cost}>
                                <div>Общая стоимость</div>
                                <div className={styles.price}>190 770 ₽</div>
                            </div>
                            <div className={styles.checkDocument}>
                                <CheckIcon />
                                <div>использовать электронный документооборот</div>
                            </div>
                            <Button fullWidth>Выставить счет</Button>
                            <div className={styles.hint}>
                                Нажимая на кнопку, вы соглашаетесь с Условиями обработки персональных данных, а также с
                                Условиями продажи
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
