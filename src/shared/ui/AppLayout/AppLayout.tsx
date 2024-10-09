import { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './AppLayout.module.scss';

interface IAppLayoutProps extends PropsWithChildren {
    header?: ReactNode;
    footer?: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = ({ header, footer, children }) => {
    return (
        <div className={styles.layout}>
            {header}
            <main>{children}</main>
            {footer}
        </div>
    );
};
