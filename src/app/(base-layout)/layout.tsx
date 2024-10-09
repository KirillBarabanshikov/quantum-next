import { PropsWithChildren } from 'react';

import { AppLayout } from '@/shared/ui';
import { Footer } from '@/widgets';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <AppLayout header={<div>header</div>} footer={<Footer />}>
            {children}
        </AppLayout>
    );
}
