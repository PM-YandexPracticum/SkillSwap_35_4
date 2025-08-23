import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DragDropArea } from './DragDropArea';
import type { FileWithPreview } from './types';

const mockFn = () => {};

const meta = {
  title: 'Shared/UI/DragDropArea/WithPreview',
  component: DragDropArea,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DragDropArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const PreviewWrapper = (props: any) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFilesSelect = (newFiles: File[]) => {
    const filesWithPreview: FileWithPreview[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    
    setFiles(prev => [...prev, ...filesWithPreview]);
    props.onFilesSelect?.(newFiles);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(file => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter(file => file.id !== id);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <DragDropArea {...props} onFilesSelect={handleFilesSelect} />
      
      {files.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Загруженные файлы:</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
            gap: '15px' 
          }}>
            {files.map(file => (
              <div key={file.id} style={{ 
                position: 'relative', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                overflow: 'hidden',
                background: 'white'
              }}>
                <img 
                  src={file.previewUrl} 
                  alt={file.file.name}
                  style={{ 
                    width: '100%', 
                    height: '80px', 
                    objectFit: 'cover' 
                  }} 
                />
                <div style={{ padding: '8px', fontSize: '11px', color: '#4a5568' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {file.file.name}
                  </div>
                  <div>{(file.file.size / 1024).toFixed(1)} KB</div>
                </div>
                <button 
                  onClick={() => removeFile(file.id)}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: 'rgba(255,255,255,0.9)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#e53e3e',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const WithFilePreview: Story = {
  render: (args) => <PreviewWrapper {...args} />,
  args: {
    onFilesSelect: mockFn,
    maxSize: 2 * 1024 * 1024,
    accept: 'image/jpeg, image/png',
    maxFiles: 5,
  },
  name: 'С превью файлов',
};