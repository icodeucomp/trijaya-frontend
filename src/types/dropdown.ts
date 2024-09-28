export interface DropdownProps {
  parentClassName: string;
  className: string;
  dropdownKey: string;
  data: {
    display: string;
    value: string;
  }[];
  setFiltered: (dropdownKey: string, value: string) => void;
}
