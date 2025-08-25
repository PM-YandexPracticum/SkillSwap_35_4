import React, { useCallback, useRef, useState } from 'react';
import { useDropArea } from './hooks/useDropArea';
import type { DragDropAreaProps } from './types';
import styles from './DragDropArea.module.scss';
import GalleryAddIcon from '../../assets/icons/gallery-add.svg';
('src/shared/assets/icons/gallery-add.svg');

export const DragDropArea: React.FC<DragDropAreaProps> = ({
  onFilesSelect,
  maxSize = 2 * 1024 * 1024,
  accept = 'image/jpeg, image/png',
  maxFiles = 5,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(
    (files: File[]) => {
      const validFiles = files.filter(validateFile);
      if (validFiles.length > 0) {
        onFilesSelect(validFiles);
        setError(null);
      }
    },
    [onFilesSelect],
  );

  const { isDragging, dragEvents } = useDropArea({
    onDrop: handleDrop,
    maxFiles,
  });

  const validateFile = useCallback(
    (file: File): boolean => {
      const acceptedTypes = accept.split(',').map((type) => type.trim());

      if (!acceptedTypes.includes(file.type)) {
        setError('Допустимы только файлы JPEG и PNG');
        return false;
      }

      if (file.size > maxSize) {
        setError(
          `Размер файла не должен превышать ${maxSize / 1024 / 1024} MB`,
        );
        return false;
      }

      setError(null);
      return true;
    },
    [accept, maxSize],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        handleDrop(files);
        e.target.value = '';
      }
    },
    [handleDrop],
  );

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        {...dragEvents}
        className={`${styles.dropArea} ${isDragging ? styles.dragging : ''}`}
        onClick={handleClick}
      >
        <p className={styles.text}>
          Перетащите или выберите изображения навыка
        </p>
        <p className={styles.hint}>
          <GalleryAddIcon />
          Выбрать изображения
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept={accept}
        onChange={handleFileInputChange}
        className={styles.hiddenInput}
      />

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
