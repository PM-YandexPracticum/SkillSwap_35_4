export type InputVariant = 'default' | 'social';
export type InputSize = 'medium' | 'large';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}
