import clsx from 'clsx';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { Button, Checkbox, Input, Separator } from '@/shared/ui';

import styles from './styles.module.scss';

export const EntrepreneurForm = () => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    return (
        <form className={styles.entrepreneurForm}>
            <div className={clsx(styles.section, styles.details)}>
                <div className={styles.sectionTitle}>Реквизиты компании</div>
                <div className={styles.inputs}>
                    <Input placeholder={'00000000000'} label={'ИНН'} sizes={'sm'} />
                    <Input placeholder={'00000000000'} label={'ОГРН'} sizes={'sm'} />
                </div>
                <Input placeholder={'Выписка № 114658'} label={'Справка из ЕГРЮЛ'} sizes={'sm'} />
                <Input placeholder={'ул. Проспект мира 3, д. 1, к2'} label={'Юридический адрес'} sizes={'sm'} />
                <Input placeholder={'ул. Проспект мира 3, д. 1, к2'} label={'Фактический адрес'} sizes={'sm'} />
            </div>
            {isMatch && <Separator margin={'12px 0'} />}
            <div className={clsx(styles.section, styles.details2)}>
                <Input placeholder={'00000 00000 00000 00000'} label={'Расчетный счет'} sizes={'sm'} />
                <Input placeholder={'00000 00000 00000 00000'} label={'Корреспондентский счет'} sizes={'sm'} />
                <Input placeholder={'000000000'} label={'БИК'} sizes={'sm'} />
                <Input placeholder={'Квантум Банк'} label={'Наименование банка'} sizes={'sm'} />
            </div>
            <Separator margin={'12px 0'} className={styles.separator} />
            <div className={clsx(styles.section, styles.delivery)}>
                <div className={styles.sectionTitle}>Адрес доставки</div>
                <Input placeholder={'Москва'} label={'Город'} sizes={'sm'} />
                <Input placeholder={'ул. Проспект мира 3, д. 1, к2'} label={'Адрес'} sizes={'sm'} />
            </div>
            <div className={clsx(styles.section, styles.contacts)}>
                <div className={styles.sectionTitle}>Контакты</div>
                <Input placeholder={'+7 (495) 000 00 00'} label={'Телефон'} sizes={'sm'} />
                <Input placeholder={'example@email.com'} label={'E-mail'} sizes={'sm'} />
            </div>
            <div className={styles.foot}>
                <Separator margin={'12px 0 0 0'} />
                <Checkbox label={'согласие на обработку персональных данных'} />
                <Button type={'submit'} fullWidth>
                    Создать профиль
                </Button>
            </div>
        </form>
    );
};
