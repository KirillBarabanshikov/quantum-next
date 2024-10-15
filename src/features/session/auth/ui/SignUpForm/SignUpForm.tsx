import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

// import { useSignUpMutation } from '@/entities/session';
import { maskPhone } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { signUpFormScheme, TSignUpFormScheme } from '../../model';
import styles from './SignUpForm.module.scss';

interface ISignUpForm {
    setIsSuccess: (value: boolean) => void;
}

export const SignUpForm: FC<ISignUpForm> = ({ setIsSuccess }) => {
    // const { mutateAsync: signUp } = useSignUpMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
    } = useForm<TSignUpFormScheme>({ resolver: yupResolver(signUpFormScheme), mode: 'all' });

    const onSubmit = async (data: TSignUpFormScheme) => {
        try {
            console.log(data);
            // await signUp(data);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
            <Input
                label={'Логин'}
                // hint={'допускаются только латинские буквы и цифры'}
                // extent={'md'}
                autoComplete={'username'}
                {...register('username')}
                error={errors.username?.message}
            />
            <Input
                label={'Телефон'}
                placeholder={'+7 (495) 000 00 00'}
                // extent={'md'}
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
                // extent={'md'}
                autoComplete={'email'}
                {...register('email')}
                error={errors.email?.message}
            />
            <Input
                type={'password'}
                label={'Пароль'}
                // hint={'пароль должен быть не менее 6 символов и содержать цифры'}
                // extent={'md'}
                autoComplete={'current-password'}
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
                // extent={'md'}
                autoComplete={'current-password'}
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
            <Button type={'submit'}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        </form>
    );
};
