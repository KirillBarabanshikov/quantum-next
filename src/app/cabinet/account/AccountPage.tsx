'use client';

import { useAuth } from '@/app/_providers/AuthProvider';
import { AccountForm, DeleteAccount, EditPasswordForm } from '@/features/account';
import { Separator } from '@/shared/ui';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
    const { user } = useAuth();

    if (!user) return <></>;

    return (
        <div className={styles.account}>
            <div className={styles.formsWrap}>
                <div className={styles.forms}>
                    <AccountForm user={user} />
                    <EditPasswordForm />
                </div>
                <Separator className={styles.separator} />
                <DeleteAccount />
            </div>
        </div>
    );
};
