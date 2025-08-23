export type SearchBarProps = {
  placeholder?: string;
  className?: string;
  onSearch: (query: string) => void;
  defaultValue?: string;
};
