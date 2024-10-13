import { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './AppLayout.module.scss';

interface IAppLayoutProps extends PropsWithChildren {
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
    bottomSlot?: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = ({ headerSlot, footerSlot, bottomSlot, children }) => {
    return (
        <div className={styles.layout}>
            {headerSlot}
            <main>{children}</main>
            {footerSlot}
            {bottomSlot}
        </div>
    );
};
