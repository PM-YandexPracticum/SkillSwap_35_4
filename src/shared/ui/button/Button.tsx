import React from 'react';
import styles from './Button.module.scss';
import { clsx } from 'clsx';
import type { ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', text, className, disabled }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          {
            [styles.disabled]: disabled,
          },
          className,
        )}
        disabled={disabled}
      >
        {text}
      </button>
    );
  },
);

Button.displayName = 'Button';
