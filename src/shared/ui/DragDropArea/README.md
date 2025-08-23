Пример использования в фиче
import React, { useState } from 'react';
import { DragDropArea } from '@/shared/ui/DragDropArea';
import type { FileWithPreview } from '@/shared/ui/DragDropArea/types';

export const EditSkillForm: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);

  const handleFilesSelect = (files: File[]) => {
    const filesWithPreview: FileWithPreview[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    
    setUploadedFiles(prev => [...prev, ...filesWithPreview]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(file => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter(file => file.id !== id);
    });
  };

  return (
    <div className="edit-skill-form">
      <h2>Редактирование навыка</h2>
      
      <DragDropArea 
        onFilesSelect={handleFilesSelect}
        maxFiles={3}
        maxSize={2 * 1024 * 1024}
        accept="image/jpeg, image/png"
      />
      
      {/* Остальная часть формы */}
    </div>
  );
};