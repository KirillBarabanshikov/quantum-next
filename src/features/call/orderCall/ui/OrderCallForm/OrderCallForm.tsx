import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { maskPhone } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { orderCallScheme, TOrderCallScheme } from '../../model';
import styles from './OrderCallForm.module.scss';

export const OrderCallForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        setValue,
    } = useForm<TOrderCallScheme>({ resolver: yupResolver(orderCallScheme) });

    const onSubmit = (data: TOrderCallScheme) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input placeholder={'Ваше имя'} {...register('name')} error={errors.name?.message} variant={'dark'} />
            <Input
                placeholder={'Ваш телефон'}
                {...register('phone', {
                    onChange: (e) => {
                        setValue('phone', maskPhone(e.target.value));
                        trigger('phone');
                    },
                })}
                error={errors.phone?.message}
                variant={'dark'}
            />
            <Button type={'submit'} theme={'white'}>
                Заказать звонок
            </Button>
            <p className={styles.hint}>
                Нажимая кнопку «Заказать консультацию», я подтверждаю, что я ознакомлен и согласен с условиями политики
                обработки персональных данных.
            </p>
        </form>
    );
};
