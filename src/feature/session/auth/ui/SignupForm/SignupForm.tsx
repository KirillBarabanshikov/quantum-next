import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { maskPhone } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { signupFormScheme, TSignupFormScheme } from '../../model';
import styles from './SignupForm.module.scss';

export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
    } = useForm<TSignupFormScheme>({ resolver: yupResolver(signupFormScheme), mode: 'all' });

    const onSubmit = (data: TSignupFormScheme) => {
        console.log(data);
    };

    return (
        <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
            <Input
                label={'Логин'}
                hint={'допускаются только латинские буквы и цифры'}
                {...register('username')}
                error={errors.username?.message}
            />
            <Input
                label={'Телефон'}
                placeholder={'+7 (495) 000 00 00'}
                {...register('phone', {
                    onChange: (e) => {
                        setValue('phone', maskPhone(e.target.value));
                        trigger('phone');
                    },
                })}
                error={errors.phone?.message}
            />
            <Input
                type={'email'}
                label={'E-mail'}
                placeholder={'example@email.com'}
                {...register('email')}
                error={errors.email?.message}
            />
            <Input
                type={'password'}
                label={'Пароль'}
                hint={'пароль должен быть не менее 6 символов и содержать цифры'}
                {...register('password', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.password?.message}
            />
            <Input
                type={'password'}
                label={'Подтверждение пароля'}
                {...register('passwordRepeat', {
                    onChange: () => {
                        trigger('passwordRepeat');
                        trigger('password');
                    },
                })}
                error={errors.passwordRepeat?.message}
            />
            <div className={styles.hint}>
                Ссылка для входа в личный кабинет будет отправлена на вашу электронную почту.
            </div>
            <Button type={'submit'}>Зарегистрироваться</Button>
        </form>
    );
};
