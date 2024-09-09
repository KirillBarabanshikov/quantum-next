'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { useBodyScrollLock } from '@/shared/hooks';

import styles from './Modal.module.scss';

interface IModalProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
}

export const Modal: FC<IModalProps> = ({ children, isOpen, onClose, title, className }) => {
    const [mounted, setMounted] = useState(false);
    const { setIsLocked } = useBodyScrollLock();

    useEffect(() => {
        setMounted(true);
    }, [mounted]);

    useEffect(() => {
        setIsLocked(isOpen);
    }, [isOpen]);

    return mounted
        ? createPortal(
              <AnimatePresence>
                  {isOpen && (
                      <>
                          <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={styles.overlay}
                              onClick={onClose}
                          />
                          <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={styles.modalWrap}
                          >
                              <div className={clsx(styles.modal, className)}>
                                  <div className={styles.titleWrap}>
                                      <h2 className={styles.title}>{title}</h2>
                                      <CloseIcon onClick={onClose} />
                                  </div>
                                  {children}
                              </div>
                          </motion.div>
                      </>
                  )}
              </AnimatePresence>,
              document.getElementById('portal') as HTMLDivElement,
          )
        : null;
};
