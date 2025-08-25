import React from 'react';
import { Button } from '../../shared/ui/button';
import styles from './ErrorPageContent.module.scss';
import { Title } from '../../shared/ui/title';
import type { ErrorPageContentProps } from './types';

export const ErrorPageContent: React.FC<ErrorPageContentProps> = ({
  image,
  alt,
  title,
  description,
  onReportClick,
  onMainPageClick,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.image} src={image} alt={alt} />
        <div className={styles.textContainer}>
          <Title as="h2">{title}</Title>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            variant="secondary"
            onClick={onReportClick}
            className={styles.button}
          >
            Сообщить об ошибке
          </Button>
          <Button
            variant="primary"
            onClick={onMainPageClick}
            className={styles.button}
          >
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageContent;
