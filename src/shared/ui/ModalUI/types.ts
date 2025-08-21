import type { ReactNode } from 'react';

export interface ModalUIProps {
  openModal: boolean;
  onClose: () => void;
  className?: string;
  children?: ReactNode;
}
