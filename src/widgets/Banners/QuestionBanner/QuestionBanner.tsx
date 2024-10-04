'use client';

import clsx from 'clsx';
import { FC, useState } from 'react';

import { Button, Input, Modal, Textarea } from '@/shared/ui';

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
                        onClick={() => setIsOpen(true)}
                        className={styles.button}
                    >
                        Написать
                    </Button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth={450} title={'Остались вопросы?'}>
                <form className={styles.form}>
                    <Input label={'Имя'} placeholder={'Иван'} extent={'md'} />
                    <Input label={'E-mail'} placeholder={'example@email.com'} extent={'md'} />
                    <Textarea label={'Ваш вопрос'} placeholder={'Введите ваш вопрос'} />
                    <Button>Ответить</Button>
                </form>
            </Modal>
        </section>
    );
};
