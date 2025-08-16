import React from 'react';
import clsx from 'clsx';
import styles from './Title.module.scss';
import type { TitleProps } from './types';

export const Title: React.FC<TitleProps> = ({
  as = 'h1',
  color = 'primary',
  className,
  children,
  align = 'left',
  weight = 'medium',
  ...props
}) => {
  const Component = as;

  return (
    <Component
      className={clsx(
        styles.title,
        styles[`variant-${as}`],
        styles[`color-${color}`],
        styles[`align-${align}`],
        styles[`weight-${weight}`],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
