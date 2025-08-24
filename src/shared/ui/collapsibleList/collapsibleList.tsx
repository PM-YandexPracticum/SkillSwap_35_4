import React from 'react';
import type { CollapsibleListProps } from './types';
import clsx from 'clsx';
import styles from './CollapsibleList.module.scss';

export const CollapsibleList = React.forwardRef<
  HTMLButtonElement,
  CollapsibleListProps
>(
  (
    { variant = 'primary', size = 'md', className, text, icon, ...props },
    ref,
  ) => {
    return (
      <div className="container">
        <button ref={ref} className={clsx(styles.collapsibleButton)} {...props}>
          {text}
        </button>
        <div className="icon">{icon}</div>
      </div>
    );
  },
);
