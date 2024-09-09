import { Button, Input } from '@/shared/ui';

import styles from './RegForm.module.scss';

export const RegForm = () => {
    return (
        <form className={styles.regForm}>
            <Input label={'Логин'} hint={'допускаются только латинские буквы и цифры'} />
            <Input label={'Телефон'} placeholder={'+7 (495) 000 00 00'} />
            <Input label={'E-mail'} placeholder={'example@email.com'} />
            <Input label={'Пароль'} hint={'пароль должен быть не менее 6 символов и содержать цифры'} />
            <Input label={'Подтверждение пароля'} />
            <div className={styles.hint}>
                Ссылка для входа в личный кабинет будет отправлена на вашу электронную почту.
            </div>
            <Button>Зарегистрироваться</Button>
        </form>
    );
};
