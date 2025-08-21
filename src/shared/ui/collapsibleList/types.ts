import type { ButtonProps } from '../../../shared/ui/button/types';

type ButtonMode = 'cities' | 'categories';

export interface CollapsibleListProps extends Omit<ButtonProps, 'children'> {
  items: string[];
  mode: ButtonMode;
  dropdownClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
