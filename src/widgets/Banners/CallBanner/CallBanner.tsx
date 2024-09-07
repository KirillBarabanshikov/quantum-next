import { CallForm } from '@/feature/call/ui';

import styles from './CallBanner.module.scss';

export const CallBanner = () => {
    return (
        <section className={styles.callBanner}>
            <div className={'container'}>
                <div className={styles.callBannerContainer}>
                    <h2 className={styles.title}>
                        Интересует устройство, но есть вопросы? Перезвоним в течение 5 минут!
                    </h2>
                    <div className={styles.callBannerBody}>
                        <p className={styles.description}>
                            Закажите бесплатный звонок, и наши специалисты ответят на все ваши вопросы, а также помогут
                            подобрать <br />
                            оптимальный вариант комплектации и кредитования
                        </p>
                        <CallForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
