import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, errorMessage, icon, type, ...props }, ref) => {
    const renderInput = () => (
      <div
        className={clsx(styles.inputContainer, {
          [styles.error]: error,
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
        {error && errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  },
);

// готовый инпут для текста
export const InputText = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} type="text" {...props} />,
);

// готовый инпут для пароля
export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} type="password" {...props} />,
);

// готовый инпут для даты
export const InputDate = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} type="date" {...props} />,
);

// готовый инпут для email
export const InputEmail = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} type="email" {...props} />,
);
