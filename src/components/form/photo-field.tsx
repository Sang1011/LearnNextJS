/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormHelperText, Typography } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { DEFAULT_THUMBNAIL_URL } from "@/constants";

export type PhotoFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<any>;
};

export function PhotoField<T extends FieldValues>({
  name,
  label,
  control,
}: PhotoFieldProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const imageRef = useRef<HTMLImageElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function handleFilechange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onChange({
      file,
      previewUrl: url,
    });
  }

  const handleClickBox = () => {
    inputFileRef.current?.click();
  };

  const previewUrl = value?.["previewUrl"] || DEFAULT_THUMBNAIL_URL;
  const inputId = `photo-field-${name}`;

  return (
    <Box sx={{ my: 1.5 }} position="relative">
      <Typography variant="body2">{label}</Typography>

      <Box component="label" htmlFor={inputId} sx={{ cursor: "pointer" }}>
        <Image
          id="imaage"
          ref={imageRef}
          src={previewUrl}
          width={246}
          height={180}
          alt="work thumbnail"
          sizes="(max-width: 768px) 100vw, 246px"
        />
      </Box>

      <Box
  onClick={handleClickBox}
  sx={{
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    width: 246,
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    visibility:
      value?.file || (imageRef?.current && imageRef?.current?.src !== DEFAULT_THUMBNAIL_URL)
        ? "visible"
        : "hidden",
    opacity: 0,
    transition: "opacity 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      opacity: value?.file || (imageRef?.current && imageRef?.current?.src !== DEFAULT_THUMBNAIL_URL) ? 1 : 0,
      cursor: "pointer",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
    },
    zIndex: 1,
    pointerEvents: "auto",
  }}
>
  <Typography variant="body2" fontWeight="bold">
    Click to change another Image
  </Typography>
</Box>

      <FormHelperText error={!!error}>{error?.message}</FormHelperText>

      <Box
        id={inputId}
        component="input"
        type="file"
        accept="image/*"
        onChange={handleFilechange}
        hidden
        ref={inputFileRef}
      />
    </Box>
  );
}
