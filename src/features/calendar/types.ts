import type { InputProps } from '../../shared/ui/input/types';

export interface BDayInputProps extends Omit<InputProps, 'value'> {
  className?: string;
  placeholder?: string;
  label?: string;
  minYear?: number;
  maxYear?: number;
  value?: Date | null;
  onDateSelect?: (date: Date | null) => void;
}
