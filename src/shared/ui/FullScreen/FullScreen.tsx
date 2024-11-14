'use client';

import clsx from 'clsx';
import { FC, PropsWithChildren, useEffect } from 'react';

import BackIcon from '@/shared/assets/icons/arrow_left.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { useBodyScrollLock } from '@/shared/hooks';
import { Portal } from '@/shared/ui';

import styles from './FullScreen.module.scss';

interface IFullScreenProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    withCloseIcon?: boolean;
    withBackIcon?: boolean;
}

export const FullScreen: FC<IFullScreenProps> = ({
    isOpen,
    onClose,
    title,
    children,
    withCloseIcon = true,
    withBackIcon = false,
}) => {
    const { setIsLocked } = useBodyScrollLock();

    useEffect(() => {
        setIsLocked(isOpen);
    }, [isOpen, setIsLocked]);

    if (!isOpen) return <></>;

    return (
        <Portal>
            <div className={clsx(styles.fullScreen)}>
                <div className={clsx(styles.container, 'scrollbar-hide')}>
                    {title && <div className={styles.title}>{title}</div>}
                    {withCloseIcon && <CloseIcon className={styles.close} onClick={onClose} />}
                    {withBackIcon && <BackIcon className={styles.back} onClick={onClose} />}
                    <div>{children}</div>
                </div>
            </div>
        </Portal>
    );
};
