import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal, Textarea } from '@/shared/ui';

import { leaveQuestionScheme, TLeaveQuestionScheme } from '../../model';
import styles from './LeaveQuestionModal.module.scss';

interface ILeaveQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LeaveQuestionModal: FC<ILeaveQuestionModalProps> = ({ isOpen, onClose }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<TLeaveQuestionScheme>({ resolver: yupResolver(leaveQuestionScheme) });

    const handleClose = () => {
        onClose();
        reset();
    };

    const onSubmit = (data: TLeaveQuestionScheme) => {
        console.log(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={'Остались вопросы?'}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Input label={'Имя'} placeholder={'Имя'} {...register('name')} error={errors.name?.message} />
                <Input
                    label={'E-mail'}
                    placeholder={'example@email.com'}
                    {...register('email')}
                    error={errors.email?.message}
                />
                <Textarea
                    label={'Ваш вопрос'}
                    placeholder={'Введите ваш вопрос'}
                    {...register('question')}
                    error={errors.question?.message}
                />
                <Button type={'submit'}>Ответить</Button>
            </form>
        </Modal>
    );
};
