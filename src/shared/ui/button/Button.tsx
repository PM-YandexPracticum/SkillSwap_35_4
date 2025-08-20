import React from 'react';
import styles from './Button.module.scss';
import { clsx } from 'clsx';
import type { ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      startIcon,
      endIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          {
            [styles.loading]: loading,
            [styles.fullWidth]: fullWidth,
          },
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
        {loading && (
          <span className={styles.loader} aria-hidden="true">
            <span className={styles.loaderDot} />
            <span className={styles.loaderDot} />
            <span className={styles.loaderDot} />
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
