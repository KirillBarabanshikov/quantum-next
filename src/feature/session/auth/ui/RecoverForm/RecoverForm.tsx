import { Button, Input } from '@/shared/ui';

import styles from './RecoverForm.module.scss';

export const RecoverForm = () => {
    return (
        <div className={styles.recoverForm}>
            <span className={styles.hint}>Введите e-mail или телефон, которые вы указывали при регистрации.</span>
            <Input placeholder={'Е-mail или телефон'} className={styles.input} />
            <span className={styles.hint}>
                Ссылка на восстановление пароля будет отправлена на вашу электронную почту
            </span>
            <Button fullWidth className={styles.button}>
                Восстановить пароль
            </Button>
        </div>
    );
};
