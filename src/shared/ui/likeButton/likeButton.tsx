import React from 'react';
import styles from './likeButton.module.scss';

type LikeButtonProps = {
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export const LikeButton: React.FC<LikeButtonProps> = ({
  active = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles['like-button']} ${
        active ? styles['like-button--active'] : ''
      } ${className}`}
      aria-pressed={active}
      aria-label="Добавить в избранное"
    />
  );
};
