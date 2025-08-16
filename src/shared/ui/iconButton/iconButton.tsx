import clsx from 'clsx';
import type { IconButtonProps } from './types';
import style from './iconButton.module.scss';

export const IconButton = ({
  onClick,
  children,
  className,
  ...other
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(className, style.icon_button)}
      {...other}
    >
      {children}
    </button>
  );
};
