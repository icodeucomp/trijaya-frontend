import { GroupBase, StylesConfig } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

export type StyleTypes = StylesConfig<OptionType, true, GroupBase<OptionType>>;
