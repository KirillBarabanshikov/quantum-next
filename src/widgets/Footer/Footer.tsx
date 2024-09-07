import clsx from 'clsx';
import Link from 'next/link';

import Icon from '@/shared/assets/icons/telegram.svg';
import Logo from '@/shared/assets/logos/logo_large.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={'container'}>
                <Link href={'/'} className={styles.logo}>
                    <Logo />
                </Link>
                <div className={styles.links}>
                    <div className={styles.catalogLinks}>
                        <div className={styles.linksList}>
                            <Link href={'/'} className={clsx(styles.title, styles.link)}>
                                Каталог
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Приемники
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Пропеллеры
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Моторы
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Рамы
                            </Link>
                        </div>
                        <div className={styles.linksList}>
                            <Link href={'/'} className={styles.link}>
                                Полетные контроллеры
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                FPV-камеры
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Видеопередатчики
                            </Link>
                            <Link href={'/'} className={styles.link}>
                                Стеки
                            </Link>
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
