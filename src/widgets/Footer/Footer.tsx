'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';

import { categoryApi } from '@/entities/category';
import Icon from '@/shared/assets/icons/telegram.svg';
import Logo from '@/shared/assets/logos/logo.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
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
                <div className={styles.links}>
                    <div className={styles.catalogLinksWrap}>
                        <Link href={'/catalog'} className={clsx(styles.title, styles.link)}>
                            Каталог
                        </Link>
                        <div className={styles.catalogLinks}>
                            {categories?.map((category) => (
                                <Link key={category.id} href={`/catalog/${category.id}`} className={styles.link}>
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={styles.navLinks}>
                        <div className={styles.linksList}>
                            <Link href={'/'} className={styles.link}>
                                О компании
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Сервисный центр
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Доставка и оплата
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Гарантии и возврат
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Контакты
                            </Link>
                        </div>
                    </div>
                    <div className={styles.contacts}>
                        <div className={styles.linksList}>
                            <Link href={'/'} className={styles.link}>
                                Клиентская слуба
                            </Link>
                            <div className={styles.telWrap}>
                                <a href='tel:+749573011110' className={styles.link}>
                                    +7 (495) 730-11-110
                                </a>
                                <span>звонок по России бесплатный</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.foot}>
                    <div className={styles.footLinks}>
                        <a className={styles.policy}>Политика конфиденциальности</a>
                        <a>Публичная оферта</a>
                    </div>
                    <div className={styles.socials}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <a key={index} href={'/'} target={'_blank'}>
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
