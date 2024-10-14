'use client';

import clsx from 'clsx';
import { FC, useState } from 'react';

import { LeaveQuestionModal } from '@/features/question';
import { Button } from '@/shared/ui';

import styles from './QuestionBanner.module.scss';

interface IQuestionBannerProps {
    className?: string;
}

export const QuestionBanner: FC<IQuestionBannerProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                    <Button
                        variant={'outline'}
                        theme={'white'}
                        fullWidth
                        onClick={() => setIsOpen(true)}
                        className={styles.button}
                    >
                        Написать
                    </Button>
                </div>
            </div>
            <LeaveQuestionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </section>
    );
};
