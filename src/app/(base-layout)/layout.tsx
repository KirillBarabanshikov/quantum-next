import { PropsWithChildren } from 'react';

import { AppLayout } from '@/shared/ui';
import { Footer, Header } from '@/widgets';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <AppLayout header={<Header />} footer={<Footer />}>
            {children}
        </AppLayout>
    );
}
