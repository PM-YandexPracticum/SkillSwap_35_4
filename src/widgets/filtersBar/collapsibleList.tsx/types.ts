import type { ButtonProps } from '../../../shared/ui/button/types';

type ButtonMode = 'cities' | 'categories';

export interface CollapsibleListProps extends ButtonProps {
  items: string[];
  mode: ButtonMode;
  dropdownClassName?: string;
}
