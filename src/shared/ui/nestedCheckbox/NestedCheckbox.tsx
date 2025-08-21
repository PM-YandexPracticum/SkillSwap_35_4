import React, { useState } from 'react';
import clsx from 'clsx';
import type { NestedCheckboxProps } from './types';
import styles from './NestedCheckbox.module.scss';

export const NestedCheckbox: React.FC<NestedCheckboxProps> = ({
  item,
  selectedIds,
  onSelectionChange,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const children = item.children || [];
  const hasChildren = children.length > 0;
  const isItemSelected = selectedIds.includes(item.id);

  let allChildrenSelected = false;
  let someChildrenSelected = false;

  if (hasChildren) {
    const selectedChildrenCount = children.filter((child) =>
      selectedIds.includes(child.id),
    ).length;
    allChildrenSelected = selectedChildrenCount === children.length;
    someChildrenSelected =
      selectedChildrenCount > 0 && selectedChildrenCount < children.length;
  }

  const isChecked = isItemSelected || allChildrenSelected;
  const isIndeterminate =
    someChildrenSelected || (isItemSelected && !allChildrenSelected);

  const handleToggle = () => {
    let newSelectedIds = [...selectedIds];
    const shouldSelect = !isChecked && !isIndeterminate;

    if (shouldSelect) {
      if (!newSelectedIds.includes(item.id)) {
        newSelectedIds.push(item.id);
      }
      if (hasChildren) {
        children.forEach((child) => {
          if (!newSelectedIds.includes(child.id)) {
            newSelectedIds.push(child.id);
          }
        });
      }
    } else {
      newSelectedIds = newSelectedIds.filter(
        (id) => id !== item.id && !children.some((child) => child.id === id),
      );
    }

    onSelectionChange(newSelectedIds);
  };

  const handleChildToggle = (childId: string, checked: boolean) => {
    let newSelectedIds = [...selectedIds];

    if (checked) {
      newSelectedIds.push(childId);
    } else {
      newSelectedIds = newSelectedIds.filter((id) => id !== childId);
    }

    onSelectionChange(newSelectedIds);
  };

  return (
    <div className={clsx(styles.nestedCheckbox, className)}>
      <div className={styles.parentRow}>
        <div
          className={clsx(styles.parentCheckbox, {
            [styles.checked]: isChecked,
            [styles.indeterminate]: isIndeterminate,
          })}
          onClick={handleToggle}
        >
          {isChecked && !isIndeterminate && (
            <div className={styles.checkmark}>✓</div>
          )}
          {isIndeterminate && <div className={styles.minus}>-</div>}
        </div>

        <span
          className={clsx(styles.parentLabel, {
            [styles.checked]: isChecked,
            [styles.indeterminate]: isIndeterminate,
          })}
          onClick={handleToggle}
        >
          {item.label}
        </span>

        {hasChildren && (
          <button
            className={clsx(styles.expandButton, {
              [styles.expanded]: isExpanded,
            })}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={styles.expandIcon}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className={styles.childrenContainer}>
          {children.map((child) => (
            <div key={child.id} className={styles.childItem}>
              <label className={styles.childLabel}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(child.id)}
                  onChange={(e) =>
                    handleChildToggle(child.id, e.target.checked)
                  }
                  className={styles.childInput}
                />
                <span className={styles.childCustomCheckbox} />
                {child.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
