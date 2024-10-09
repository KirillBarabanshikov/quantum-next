'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';

import { categoryApi } from '@/entities/category';
import Icon from '@/shared/assets/icons/telegram.svg';
import Logo from '@/shared/assets/logo_light.svg';

import styles from './Footer.module.scss';

export const FooterClient = () => {
    const { data: categories } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <footer className={styles.footer}>
            <div className={'container'}>
                <Link href={'/'} className={styles.logo}>
                    <Logo />
                </Link>
                <div className={styles.linksWrap}>
                    <Link href={'/catalog'} className={clsx(styles.link, styles.title)}>
                        Каталог
                    </Link>
                    <div className={styles.links}>
                        <div className={styles.wrap}>
                            <div className={styles.column}>
                                {categories?.slice(0, categories?.length / 2 + 1).map((category) => (
                                    <Link key={category.id} href={`/catalog/${category.id}`} className={styles.link}>
                                        {category.title}
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.column}>
                                {categories?.slice(categories?.length / 2 + 1).map((category) => (
                                    <Link key={category.id} href={`/catalog/${category.id}`} className={styles.link}>
                                        {category.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.column}>
                                <Link href={`/`} className={styles.link}>
                                    О компании
                                </Link>
                                <Link href={`/`} className={styles.link}>
                                    Сервисный центр
                                </Link>
                                <Link href={`/`} className={styles.link}>
                                    Доставка и оплата
                                </Link>
                                <Link href={`/`} className={styles.link}>
                                    Гарантии и возврат
                                </Link>
                                <Link href={`/`} className={styles.link}>
                                    Контакты
                                </Link>
                            </div>
                            <div className={styles.column}>
                                <Link href={'/'} className={styles.link}>
                                    Клиентская слуба
                                </Link>
                                <div>
                                    <a href={'tel:+74957301111'} className={styles.link}>
                                        +7 (495) 730-11-11
                                    </a>
                                    <div className={styles.hint}>звонок по России бесплатный</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.contacts}>
                    <div className={styles.links}>
                        <Link href={'/'} className={styles.hint}>
                            Политика конфиденциальности
                        </Link>
                        <Link href={'/'} className={styles.hint}>
                            Публичная оферта
                        </Link>
                    </div>
                    <div className={styles.socials}>
                        <a href='/' target={'_blank'} className={styles.social}>
                            <Icon />
                        </a>
                        <a href='/' target={'_blank'} className={styles.social}>
                            <Icon />
                        </a>
                        <a href='/' target={'_blank'} className={styles.social}>
                            <Icon />
                        </a>
                        <a href='/' target={'_blank'} className={styles.social}>
                            <Icon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
