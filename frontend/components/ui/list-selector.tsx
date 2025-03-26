'use client';

import {
  MultipleSelector,
  MultipleSelectorProps,
  Option,
} from './multiple-selector';

type ListSelectorProps = Omit<
  MultipleSelectorProps,
  'defaultOptions' | 'value' | 'onChange' | 'onSearch'
> & {
  defaultOptions: string[];
  value: string[];
  onChange: (options: string[]) => void;
  onSearch?: (value: string) => Promise<string[]>;
};

const ListSelector = ({ ...props }: ListSelectorProps) => {
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
      {...restProps}
      defaultOptions={transformedOptions}
      value={transformedValue}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  );
};

ListSelector.displayName = 'ListSelector';

export { ListSelector };
