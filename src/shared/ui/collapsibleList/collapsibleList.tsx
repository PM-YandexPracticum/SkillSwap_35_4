import React, { useState } from 'react';
import type { CollapsibleListProps } from './types';
import clsx from 'clsx';
import styles from './CollapsibleList.module.scss';
import { Button } from '../button/Button';
import chevronDown from '../../assets/icons/chevronDown.svg?url';

export const CollapsibleList = React.forwardRef<
  HTMLButtonElement,
  CollapsibleListProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      startIcon,
      endIcon,
      className,
      disabled,
      mode,
      items = [],
      dropdownClassName,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsExpanded(!isExpanded);
      onClick?.(e);
    };

    const buttonText = mode === 'cities' ? 'Все города' : 'Все категории';

    return (
      <div
        className={clsx(styles.collapsibleContainer, {
          [styles.fullWidth]: fullWidth,
        })}
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          loading={loading}
          fullWidth={fullWidth}
          startIcon={startIcon}
          endIcon={
            <>
              {endIcon}
              {items.length > 0 && (
                <span
                  className={clsx(styles.arrow, {
                    [styles.arrowUp]: isExpanded,
                  })}
                >
                  <img src={chevronDown} alt="Стрелочка вниз" />
                </span>
              )}
            </>
          }
          className={clsx(styles.collapsibleButton, className)}
          disabled={disabled || items.length === 0}
          onClick={handleClick}
          aria-expanded={isExpanded}
          {...props}
        >
          {buttonText}
        </Button>

        {isExpanded && items.length > 0 && (
          <div className={clsx(styles.dropdown, dropdownClassName)}>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

CollapsibleList.displayName = 'CollapsibleList';
