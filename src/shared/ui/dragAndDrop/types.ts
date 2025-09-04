export interface FileWithPreview {
  id: string;
  file: File;
  previewUrl: string;
}

export interface UseDropAreaProps {
  onDrop: (files: File[]) => void;
  maxFiles?: number;
}

export interface UseDropAreaReturn {
  isDragging: boolean;
  dragEvents: {
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  };
}

export interface DragDropAreaProps {
  onFilesSelect: (files: File[]) => void;
  maxSize?: number;
  accept?: string;
  maxFiles?: number;
  className?: string;
}
