import { Button, Input } from '@/shared/ui';

import styles from './CallForm.module.scss';

export const CallForm = () => {
    return (
        <form className={styles.form}>
            <Input theme={'blue'} placeholder={'Ваше имя'} extent={'md'} />
            <Input theme={'blue'} placeholder={'Ваш телефон'} extent={'md'} />
            <Button type={'submit'} theme={'white'} fullWidth>
                Заказать звонок
            </Button>
            <p className={styles.policy}>
                Нажимая кнопку «Заказать консультацию», я подтверждаю, что я ознакомлен и согласен с условиями политики
                обработки персональных данных.
            </p>
        </form>
    );
};
