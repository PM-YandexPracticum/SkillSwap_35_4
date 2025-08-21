import React, { useState } from 'react';
import styles from './NotificationPopup.module.scss';
import { IconButton } from '../iconButton/iconButton';
import CloseIcon from '../../../assets/icons/common/x.svg?url';
import IdeaIcon from '../../../assets/icons/notification/idea.svg?url';

export type NotificationPopupProps = {
  message: string;
  onClose: () => void;
  onNavigate?: () => void;
};

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  onClose,
  onNavigate,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.popup}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.content}>
        <img src={IdeaIcon} className={styles.ideaIcon} alt="Лампочка" />
        <span className={styles.text}>{message}</span>
      </div>

      {onNavigate && (
        <button
          className={`${styles.navigateBtn} ${hovered ? styles.visible : ''}`}
          onClick={onNavigate}
        >
          Перейти
        </button>
      )}

      <IconButton onClick={onClose} className={styles.closeBtn}>
        <img src={CloseIcon} className={styles.cross} alt="Закрыть" />
      </IconButton>
    </div>
  );
};

export default NotificationPopup;
