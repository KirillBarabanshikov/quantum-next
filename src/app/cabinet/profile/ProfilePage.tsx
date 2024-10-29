'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/_providers/AuthProvider';
import { IndividualForm } from '@/features/profile';
import { Accordion, Button } from '@/shared/ui';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user) return <></>;

    return (
        <div className={styles.profilesWrap}>
            <div className={styles.title}>Профили плательщиков</div>
            <div className={styles.profilesList}>
                {user.payerProfiles.map((profile) => {
                    return (
                        <Accordion key={profile.id} title={`${profile.firstName} ${profile.lastName}`} isOpen={true}>
                            <IndividualForm profile={profile} />
                        </Accordion>
                    );
                })}
            </div>
            <div className={styles.buttonWrap}>
                <Button onClick={() => router.push('/create-profile')}>Создать профиль</Button>
            </div>
        </div>
    );
};
