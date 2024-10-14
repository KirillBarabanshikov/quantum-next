import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, Fragment } from 'react';

import styles from './Breadcrumbs.module.scss';

interface IBreadcrumbsLink {
    text: string;
    href?: string;
}

interface IBreadcrumbsProps {
    breadcrumbs: IBreadcrumbsLink[];
    className?: string;
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({ breadcrumbs, className }) => {
    return (
        <nav className={clsx(styles.breadcrumbs, className)}>
            {breadcrumbs.map((link, index) => {
                return (
                    <Fragment key={link.text}>
                        {index > 0 && <span>/</span>}
                        {link.href ? <Link href={link.href}>{link.text}</Link> : <span>{link.text}</span>}
                    </Fragment>
                );
            })}
        </nav>
    );
};
