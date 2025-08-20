export interface AutocompleteOption {
  value: string;
  label: string;
  [key: string]: any;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  placeholder?: string;
  className?: string;
  debounceDelay?: number;
  minChars?: number;
  filterFn?: (option: AutocompleteOption, inputValue: string) => boolean;
  renderOption?: (option: AutocompleteOption) => React.ReactNode;
  noOptionsMessage?: string;
  icon?: React.ReactNode;
  maxHeight?: number;
}

export interface AutocompleteRef {
  clear: () => void;
}
