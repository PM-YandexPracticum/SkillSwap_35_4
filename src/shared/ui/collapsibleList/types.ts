import type { ButtonProps } from '../../../shared/ui/button/types';

export interface CollapsibleListProps extends Omit<ButtonProps, 'children'> {
  text: string;
  icon?: React.ReactNode;
}
