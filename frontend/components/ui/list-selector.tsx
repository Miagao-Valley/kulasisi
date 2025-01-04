'use client';

import { forwardRef } from 'react';
import MultipleSelector, { MultipleSelectorProps, MultipleSelectorRef, Option } from './multiple-selector';

type ListSelectorProps = Omit<MultipleSelectorProps, 'defaultOptions' | 'value' | 'onChange' | 'onSearch'> & {
  defaultOptions: string[];
  value: string[];
  onChange: (options: string[]) => void;
  onSearch?: (value: string) => Promise<string[]>
};

const ListSelector = forwardRef<MultipleSelectorRef, ListSelectorProps>((props, ref) => {
  const { defaultOptions, value, onChange, onSearch, ...restProps } = props;

  const transformedOptions: Option[] = defaultOptions?.map((option) => ({
    value: option,
    label: option,
  }));

  const transformedValue: Option[] = value?.map((option) => ({
    value: option,
    label: option,
  }));

  const handleChange = (newValue: Option[]) => {
    const newStringValue = newValue.map((option) => option.value);
    onChange(newStringValue);
  };

  const handleSearch = async (q: string) => {
    if (onSearch) {
      const result = await onSearch(q);
      return result.map((option) => ({
        value: option,
        label: option,
      }));
    }
    return [];
  };

  return (
    <MultipleSelector
      ref={ref}
      {...restProps}
      defaultOptions={transformedOptions}
      value={transformedValue}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  );
});

ListSelector.displayName = 'ListSelector';

export default ListSelector;
