import { Button, Input, Separator } from '@/shared/ui';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
    return (
        <div className={styles.account}>
            <div className={styles.formsWrap}>
                <div className={styles.forms}>
                    <form className={styles.form}>
                        <div className={styles.title}>Аккаунт</div>
                        <Input label={'Логин'} />
                        <Input label={'Телефон'} />
                        <Input label={'E-mail'} />
                        <Button type={'submit'} disabled className={styles.button}>
                            Сохранить данные
                        </Button>
                    </form>
                    <form className={styles.form}>
                        <div className={styles.title}>Сменить пароль</div>
                        <Input label={'Старый пароль'} />
                        <Input label={'Новый пароль'} />
                        <Input label={'Повторите новый пароль'} />
                        <Button type={'submit'} disabled className={styles.button}>
                            Сохранить данные
                        </Button>
                    </form>
                </div>
                <Separator className={styles.separator} />
                <span className={styles.deleteAccount}>Удалить аккаунт</span>
            </div>
        </div>
    );
};
