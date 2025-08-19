import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      inputSize = 'medium',
      label,
      error,
      errorMessage,
      icon,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const renderInput = () => (
      <div
        className={clsx(
          styles.inputContainer,
          styles[`variant-${variant}`],
          styles[`size-${inputSize}`],
          {
            [styles.focused]: isFocused,
            [styles.error]: error,
          },
        )}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          ref={ref}
          type={type}
          className={clsx(styles.input, className)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
    );
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        {renderInput()}
        {error && errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  },
);

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} type="text" {...props} />,
);

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} type="password" {...props} />,
);
