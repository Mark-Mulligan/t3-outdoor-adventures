// React
import { FC } from 'react';

// React Select
import Select, { MultiValue, StylesConfig } from 'react-select';

interface SelectOption {
  value: string;
  label: string;
}

const customStyles: StylesConfig<SelectOption> = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    background: 'background-color: rgb(249 250 251);',
    border: '1px solid rgb(209 213 219);',
  }),
  multiValue: (provided) => {
    return {
      ...provided,
      margin: 0,
      marginRight: 5,
      marginBottom: 5,
      padding: 0,
    };
  },
  multiValueLabel: (provided) => ({
    ...provided,
    padding: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    marginBottom: 5,
    color: '#a0aec0',
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    marginBottom: 5,
    padding: 0,
    color: 'white',
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingTop: '0.63rem',
    paddingLeft: '0.625rem',
    paddingRight: '0.625rem',
    paddingBottom: 'calc(0.63rem - 5px)',
  }),
};

interface IProps {
  id: string;
  value: MultiValue<SelectOption> | null;
  onChange: (newValue: MultiValue<SelectOption>) => void;
  options: SelectOption[];
}

const MultiSelect: FC<IProps> = ({ id, value, options, onChange }) => {
  return (
    <Select id={id} styles={customStyles} value={value} options={options} onChange={onChange} isMulti isSearchable />
  );
};

export default MultiSelect;
