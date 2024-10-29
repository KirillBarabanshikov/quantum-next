import clsx from 'clsx';

import { Button, Checkbox, Input, Separator } from '@/shared/ui';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { individualFormScheme, TIndividualFormScheme } from '../model';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/entities/user';

export const IndividualForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TIndividualFormScheme>({ resolver: yupResolver(individualFormScheme) });

    const { mutateAsync: createProfile } = useMutation({ mutationFn: userApi.createProfile });

    const onSubmit = async (data: TIndividualFormScheme) => {
        try {
            await createProfile({ type: 'individual', ...data });
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.individualForm}>
            <div className={clsx(styles.section, styles.contacts)}>
                <div className={styles.sectionTitle}>Контакты</div>
                <div className={styles.inputs}>
                    <Input
                        placeholder={'Имя'}
                        label={'Имя'}
                        sizes={'sm'}
                        {...register('firstName')}
                        error={errors.firstName?.message}
                    />
                    <Input
                        placeholder={'Фамилия'}
                        label={'Фамилия'}
                        sizes={'sm'}
                        {...register('lastName')}
                        error={errors.lastName?.message}
                    />
                </div>
                <Input
                    placeholder={'+7 (495) 000 00 00'}
                    label={'Телефон'}
                    sizes={'sm'}
                    {...register('phoneNumber')}
                    error={errors.phoneNumber?.message}
                />
                <Input
                    placeholder={'example@email.com'}
                    label={'E-mail'}
                    sizes={'sm'}
                    {...register('email')}
                    error={errors.email?.message}
                />
            </div>
            <div className={clsx(styles.section, styles.passport)}>
                <div className={styles.sectionTitle}>Паспортные данные</div>
                <div className={styles.inputs}>
                    <Input
                        placeholder={'0000'}
                        label={'Серия'}
                        sizes={'sm'}
                        {...register('passportSeries')}
                        error={errors.passportSeries?.message}
                    />
                    <Input
                        placeholder={'000000'}
                        label={'Номер'}
                        sizes={'sm'}
                        {...register('passportNumber')}
                        error={errors.passportNumber?.message}
                    />
                </div>
                <Input
                    placeholder={'ГУ МВД по г. Москва'}
                    label={'Кем выдан'}
                    sizes={'sm'}
                    {...register('passportIssued')}
                    error={errors.passportIssued?.message}
                />
                <div className={styles.inputs}>
                    <Input
                        placeholder={'310-067'}
                        label={'№ подразделения'}
                        sizes={'sm'}
                        {...register('passportDepartmentCode')}
                        error={errors.passportDepartmentCode?.message}
                    />
                    <Input
                        placeholder={'01.01.2024'}
                        type={'date'}
                        label={'Дата'}
                        sizes={'sm'}
                        {...register('passportDate')}
                        error={errors.passportDate?.message}
                    />
                </div>
            </div>
            <Separator className={styles.separator} margin={'12px 0'} />
            <div className={clsx(styles.section, styles.delivery)}>
                <div className={styles.sectionTitle}>Адрес доставки</div>
                <Input
                    placeholder={'Москва'}
                    label={'Город'}
                    sizes={'sm'}
                    {...register('deliveryAddressCity')}
                    error={errors.deliveryAddressCity?.message}
                />
                <Input
                    placeholder={'ул. Проспект мира 3, д. 1, к2'}
                    label={'Адрес'}
                    sizes={'sm'}
                    {...register('deliveryAddress')}
                    error={errors.deliveryAddress?.message}
                />
            </div>
            <div className={styles.foot}>
                <Separator margin={'12px 0 0 0'} />
                <Checkbox
                    label={'согласие на обработку персональных данных'}
                    {...register('checked')}
                    error={!!errors.checked}
                />
                <Button type={'submit'} fullWidth>
                    Создать профиль
                </Button>
            </div>
        </form>
    );
};
