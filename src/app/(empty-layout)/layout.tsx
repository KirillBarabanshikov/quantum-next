import { PropsWithChildren } from 'react';

import { Layout } from '@/shared/ui';

export default function EmptyLayout({ children }: PropsWithChildren) {
    return <Layout>{children}</Layout>;
}
