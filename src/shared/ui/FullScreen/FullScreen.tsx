'use client';

import clsx from 'clsx';
import { FC, PropsWithChildren, useEffect } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { useBodyScrollLock } from '@/shared/hooks';
import { Portal } from '@/shared/ui';

import styles from './FullScreen.module.scss';

interface IFullScreenProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export const FullScreen: FC<IFullScreenProps> = ({ isOpen, onClose, title, children }) => {
    const { setIsLocked } = useBodyScrollLock();

    useEffect(() => {
        setIsLocked(isOpen);
    }, [isOpen, setIsLocked]);

    if (!isOpen) return <></>;

    return (
        <Portal>
            <div className={clsx(styles.fullScreen)}>
                <div className={styles.container}>
                    {title && <div className={styles.title}>{title}</div>}
                    <CloseIcon onClick={onClose} className={styles.close} />
                    <div>{children}</div>
                </div>
            </div>
        </Portal>
    );
};
