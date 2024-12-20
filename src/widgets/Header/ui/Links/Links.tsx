import clsx from 'clsx';
import Link from 'next/link';

import styles from './Links.module.scss';

export const Links = () => {
    return (
        <div className={styles.headerLinksContainer}>
            <div className={'container'}>
                <div className={styles.headerLinksWrap}>
                    <nav>
                        <ul className={styles.headerLinks}>
                            <li>
                                <Link href={'/service-center'} className={styles.link}>
                                    Сервисный центр
                                </Link>
                            </li>
                            <li>
                                <Link href={'/delivery-payment'} className={styles.link}>
                                    Доставка и оплата
                                </Link>
                            </li>
                            <li>
                                <Link href={'/warranty-return'} className={styles.link}>
                                    Гарантии и возврат
                                </Link>
                            </li>
                            <li>
                                <Link href={'/contacts'} className={styles.link}>
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <a href='tel:+74957402530' className={clsx(styles.link, styles.tel)}>
                        +7 (495) 740-25-30
                    </a>
                </div>
            </div>
        </div>
    );
};
