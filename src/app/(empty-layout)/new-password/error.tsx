'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui';

export default function Error() {
    const router = useRouter();

    return (
        <div>
            <h2>Недействительный токен</h2>
            <Button onClick={() => router.push('/')}>На главную</Button>
        </div>
    );
}
