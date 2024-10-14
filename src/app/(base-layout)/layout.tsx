import { PropsWithChildren } from 'react';

import { AppLayout } from '@/shared/ui';
import { Footer, Header, MobileNavbar } from '@/widgets';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <AppLayout headerSlot={<Header />} footerSlot={<Footer />} bottomSlot={<MobileNavbar />}>
            {children}
        </AppLayout>
    );
}
