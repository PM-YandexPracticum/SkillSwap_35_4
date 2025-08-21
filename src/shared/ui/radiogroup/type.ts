export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
  disabled?: boolean;
}
