export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: Option[];
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};
