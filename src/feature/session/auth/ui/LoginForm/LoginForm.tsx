import { Button, Input } from '@/shared/ui';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
    return (
        <form className={styles.loginForm}>
            <Input placeholder={'Логин'} />
            <Input placeholder={'Пароль'} />
            <Button>Войти</Button>
        </form>
    );
};
