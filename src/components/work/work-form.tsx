/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTagList } from "@/hooks";
import { WorkPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm, Resolver } from "react-hook-form";
import * as yup from "yup";
import {
  AutoCompleteField,
  EditorField,
  InputField,
  PhotoField,
} from "../form";
export interface WorkFilterProps {
  initialValues?: Partial<WorkPayload>;
  onSubmit?: (payload: FormData) => void;
}

export function WorkForm({ initialValues, onSubmit }: WorkFilterProps) {
  const schema = yup.object().shape({
    title: yup.string().required("Please enter work title"),
    shortDescription: yup.string().required("Please enter work description"),
    tagList: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least 1 category"),
    thumbnail: yup
      .object()
      .nullable()
      .test(
        "test-required",
        "Please select an image",
        (value: Partial<WorkPayload["thumbnail"]>, context) => {
          // required when add
          // optional when edit
          if (Boolean(initialValues?.id) || Boolean(value?.file)) return true;
          // return context.createError({message: "Please select an image"})
          return false;
        }
      )
      .test(
        "test-size",
        "Maximum size exceeded. Please select another file",
        (value: Partial<WorkPayload["thumbnail"]>) => {
          const fileSize = value?.file?.["size"] || 0;
          const MB_TO_BYTES = 1024 * 1024;
          const MAX_SIZE = 3 * MB_TO_BYTES;
          return fileSize <= MAX_SIZE;
        }
      ),
  });

  const { data } = useTagList({});
  const tagList = data?.data || [];
  const { control, handleSubmit } = useForm<Partial<WorkPayload>>({
    defaultValues: {
      title: "",
      shortDescription: "",
      tagList: [],
      thumbnail: initialValues?.id
        ? {
            file: null,
            previewUrl: initialValues?.thumbnailUrl,
          }
        : null,
      fullDescription: initialValues?.fullDescription || "",
      ...initialValues,
    },
    resolver: yupResolver(schema) as Resolver<Partial<WorkPayload>>,
  });

  async function handleSubmitForm(formValues: Partial<WorkPayload>) {
    console.log("Gia tri ban dau" ,initialValues);
    if (!formValues) return;

    const payload = new FormData();

    if (formValues.id) {
      payload.set("id", formValues.id);
    }
    if (formValues.thumbnail?.file) {
      payload.set("thumbnail", formValues.thumbnail.file);
    }
    if (formValues.tagList) {
      formValues.tagList.forEach((tag) => {
        payload.append("tagList", tag);
      });
    }

    const keyList: Array<keyof Partial<WorkPayload>> = [
      "title",
      "fullDescription",
      "shortDescription",
    ];

    keyList.forEach((name) => {
      const value = formValues[name];
      if (initialValues?.[name] !== value && value !== undefined) {
        if (typeof value === "string") {
          payload.set(name, value);
        }
      }
    });

    await onSubmit?.(payload);
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleSubmitForm)(e);
      }}
    >
      <InputField
        placeholder="Your work title"
        name="title"
        control={control}
        label="Title"
      />

      <InputField
        placeholder="Your work description"
        name="shortDescription"
        label="Short description"
        control={control}
        InputProps={{
          multiline: true,
          rows: 3,
        }}
      />

      <AutoCompleteField
        name="tagList"
        label="Categories"
        placeholder="Category"
        control={control}
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
      />

      <PhotoField name="thumbnail" control={control} label="Thumbnail" />
      <EditorField
        name="fullDescription"
        control={control}
        label="Full Description"
      />

      <Button variant="contained" type="submit">
        {initialValues?.id ? "Save" : "Submit"}
      </Button>
    </Box>
  );
}
