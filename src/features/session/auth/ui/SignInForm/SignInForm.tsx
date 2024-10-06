import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useSignInMutation } from '@/entities/session/api';
// import { useMeQuery } from '@/entities/user/api';
import { Button, Input } from '@/shared/ui';

import { signInFormScheme, TSignInFormScheme } from '../../model';
import styles from './SignInForm.module.scss';

interface ISignInFormProps {
    onClose: () => void;
}

export const SignInForm: FC<ISignInFormProps> = ({ onClose }) => {
    const { mutateAsync: signIn } = useSignInMutation();
    const searchParams = useSearchParams();
    // const { refetch } = useMeQuery({ enabled: false });
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInFormScheme>({ resolver: yupResolver(signInFormScheme), mode: 'all' });

    const onSubmit = async (data: TSignInFormScheme) => {
        try {
            await signIn(data);
            // refetch().then((data) => {
            //     if (!data?.data?.payerProfiles.length) {
            //         router.push('/create-profile');
            //     } else {
            //         router.push('/cabinet/orders');
            //     }
            //     onClose();
            // });
            const params = new URLSearchParams(searchParams.toString());
            params.delete('authentication');
            router.replace(`?${params}`, { scroll: false });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
            <Input
                label={'Логин'}
                extent={'md'}
                autoComplete={'username'}
                {...register('username', { setValueAs: (value) => value.trim() })}
                error={errors.username?.message}
            />
            <Input
                type={'password'}
                label={'Пароль'}
                extent={'md'}
                autoComplete={'current-password'}
                {...register('password', { setValueAs: (value) => value.trim() })}
                error={errors.password?.message}
            />
            <Button type={'submit'}>ВОЙТИ</Button>
        </form>
    );
};
