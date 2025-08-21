export interface NestedCheckboxItem {
  id: string;
  label: string;
  children?: NestedCheckboxItem[];
}

export interface NestedCheckboxProps {
  item: NestedCheckboxItem;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  className?: string;
}
