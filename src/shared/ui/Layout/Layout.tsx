import { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './Layout.module.scss';

interface ILayoutProps extends PropsWithChildren {
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
    bottomSlot?: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ headerSlot, footerSlot, bottomSlot, children }) => {
    return (
        <div className={styles.layout}>
            {headerSlot}
            <main>
                {children}
                {bottomSlot}
            </main>
            {footerSlot}
        </div>
    );
};
