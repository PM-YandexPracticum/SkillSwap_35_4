import React, { useRef, useState } from 'react';
import GalleryIcon from '../../../assets/icons/GalleryIcon/gallery-add.svg'
import styles from './index.module.scss'

interface FileInputProps {
  onFilesSelected?: (files: FileList) => void;
}

export const FilePicker: React.FC<FileInputProps> = ({ onFilesSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      if (onFilesSelected) {
        onFilesSelected(e.target.files);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles(e.dataTransfer.files);
      if (onFilesSelected) {
        onFilesSelected(e.dataTransfer.files);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderFileNames = () => {
    if (!selectedFiles) return null;

    const filesArray = Array.from(selectedFiles);
    const displayedFiles = filesArray.slice(0, 3).map((file) => file.name);
    const moreCount = filesArray.length - displayedFiles.length;

    return (
      <div style={{ marginTop: '6px', fontSize: '12px', color: '#555', textAlign: 'center' }}>
        {displayedFiles.join(', ')}
        {moreCount > 0 && ` и ещё ${moreCount} файл${moreCount > 1 ? 'ов' : ''}`}
      </div>
    );
  };

  return (
    <div
      className={styles.input__file}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept=".jpg, .jpeg, .png, .webp"
      />
      <div className={styles.text}>
        {selectedFiles ? 'Изображения готовы к загрузке' : 'Перетащите или выберите изображения навыка'}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
       className={styles.btn}
      >
        <GalleryIcon/>
        Выбрать изображения
      </div>
      {renderFileNames()}
    </div>
  );
};
