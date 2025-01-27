/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, TextFieldProps } from "@mui/material";
import React, { ChangeEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  label?: string;
  control: Control<any>;
};

export function InputField<T extends FieldValues>({
  name,
  label,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalOnRef,
  value: externalValue,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      label={label}
      name={name}
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event)
        externalOnChange?.(event)
      }}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
