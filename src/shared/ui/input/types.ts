export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  errorMessage?: string;
  icon?: React.ReactNode;
}
