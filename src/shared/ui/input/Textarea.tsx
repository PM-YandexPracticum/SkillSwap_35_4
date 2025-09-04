import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <div
          className={clsx(styles.inputContainer, {
            [styles.error]: Boolean(error),
          })}
        >
          <textarea
            ref={ref}
            className={clsx(styles.input, styles.textarea, className)}
            {...props}
          />
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    );
  },
);
