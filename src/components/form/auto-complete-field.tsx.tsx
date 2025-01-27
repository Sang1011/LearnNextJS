/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, AutocompleteProps, Checkbox, TextField } from "@mui/material";
import { Control, FieldValues, useController } from "react-hook-form";
export type AutoCompleteFieldProps<T, K extends FieldValues> = Partial<AutocompleteProps<T, boolean, boolean, boolean>> & {
  name: string;
  control: Control<any>;
  label?: string
  placeholder: string;
  options: T[],
  getOptionLabel: (option: T) => string
  onChange?: (selectedOptions: T[]) => void
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function AutoCompleteField<T, K extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalOnRef,
  value: externalValue,
  ...rest
}: AutoCompleteFieldProps<T, K>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Autocomplete
      fullWidth
      size="small"
      multiple
      options={options}
      isOptionEqualToValue={isOptionEqualToValue}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {getOptionLabel(option) || "-"}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField 
        margin="normal"
        name={name}
        {...params} 
        label={label}
        error={!!error}
        helperText={error?.message}
        placeholder={placeholder} />
      )}
      onChange={(event, value) => {
        onChange(value)
        externalOnChange?.(value as T[])
      }}
      onBlur={onBlur}
      ref={ref}
      value={Array.isArray(value) ? value : []}
    />
  );
}
