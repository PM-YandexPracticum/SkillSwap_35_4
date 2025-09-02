import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type, ...props }, ref) => {
    const renderInput = () => (
      <div
        className={clsx(styles.inputContainer, {
          [styles.error]: Boolean(error),
        })}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          ref={ref}
          type={type}
          className={clsx(styles.input, className)}
          {...props}
        />
      </div>
    );

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        {renderInput()}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    );
  },
);

export const InputEmail = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input ref={ref} type="email" autoComplete="email" {...props} />
  ),
);

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input
      ref={ref}
      type="password"
      autoComplete="current-password"
      {...props}
    />
  ),
);

export const InputDate = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input ref={ref} type="date" autoComplete="bday" {...props} />
  ),
);

export const InputName = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input ref={ref} type="text" autoComplete="name" {...props} />
  ),
);

export const InputSearch = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input ref={ref} type="search" autoComplete="off" {...props} />
  ),
);
