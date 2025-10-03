import React from "react";
import { OptionList } from "@/shared/optionList";

type Props<T extends string> = {
  options?: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
};

export default function CategoryFilter<T extends string>({
  options,
  selected,
  onSelect,
}: Props<T>) {
  if (!options || options.length === 0) return null;
  return (
    <OptionList
      options={options}
      selected={selected}
      onSelect={onSelect}
      horizontal
    />
  );
}
