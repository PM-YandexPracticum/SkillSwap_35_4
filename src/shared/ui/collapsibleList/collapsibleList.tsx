import React from 'react';
import type { CollapsibleListProps } from './types';
import clsx from 'clsx';
import styles from './collapsibleList.module.scss';

export const CollapsibleList = React.forwardRef<
  HTMLButtonElement,
  CollapsibleListProps
>(({ className, text, icon, ...props }, ref) => {
  return (
    <div className={clsx(styles.container)}>
      <button ref={ref} className={clsx(styles.collapsibleButton)} {...props}>
        <span className={styles.text}>{text}</span>
        {icon && <div className={styles.icon}>{icon}</div>}
      </button>
    </div>
  );
});
