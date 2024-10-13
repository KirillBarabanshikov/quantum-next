'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { Button } from '@/shared/ui';

import styles from './QuestionBanner.module.scss';

interface IQuestionBannerProps {
    className?: string;
}

export const QuestionBanner: FC<IQuestionBannerProps> = ({ className }) => {
    return (
        <section className={clsx(styles.questionBanner, className)}>
            <div className={'container'}>
                <div className={styles.questionBannerContainer}>
                    <h2 className={styles.title}>Возникли вопросы?</h2>
                    <p className={styles.description}>
                        Обратитесь в нашу службу поддержки, <br />
                        наши специалисты обязательно помогут вам.
                        <br /> Операторы работают круглосуточно.
                    </p>
                    <Button variant={'outline'} theme={'white'} fullWidth className={styles.button}>
                        Написать
                    </Button>
                </div>
            </div>
        </section>
    );
};
