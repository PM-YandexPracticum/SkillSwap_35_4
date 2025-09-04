import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './ModalUI.module.scss';
import Overlay from '../overlay/overlay';
import type { ModalUIProps } from './types';

export const ModalUI: React.FC<ModalUIProps> = ({
  openModal,
  onClose,
  className,
  children,
}) => {
  useEffect(() => {
    const key = (evt: KeyboardEvent) => evt.key === 'Escape' && onClose();
    document.addEventListener('keydown', key);

    const preview = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = preview;
    };
  }, [openModal, onClose]);

  return (
    openModal && (
      <>
        <div className={clsx(styles.modal, className)}>{children}</div>
        <Overlay onClick={onClose} />
      </>
    )
  );
};
