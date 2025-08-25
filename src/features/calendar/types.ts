import type { InputProps } from '../../shared/ui/input/types';

export interface BDayInputProps extends InputProps {
  className?: string;
  placeholder?: string;
  label?: string;
  minYear?: number;
  maxYear?: number;
  onDateSelect?: (date: Date | null) => void;
}
