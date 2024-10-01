import { PropsWithChildren } from 'react';

import { Layout } from '@/shared/ui';
import { BottomNavbar, Footer, Header } from '@/widgets';

export default function BaseLayout({ children }: PropsWithChildren) {
    return (
        <Layout headerSlot={<Header />} footerSlot={<Footer />} bottomSlot={<BottomNavbar />}>
            {children}
        </Layout>
    );
}
