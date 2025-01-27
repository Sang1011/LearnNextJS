/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTagList } from "@/hooks";
import { WorkFiltersPayload } from "@/models";
import { Search } from "@mui/icons-material";
import { debounce, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AutoCompleteField, InputField } from "../form";
export interface WorkFilterProps {
  initialValues?: WorkFiltersPayload;
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

export function WorkFilters({ initialValues, onSubmit }: WorkFilterProps) {

  const { data } = useTagList({});
  const tagList = data?.data || [];
  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: "",
      selectedTagList: [],
      ...initialValues,
    },
  });

  async function handleLoginSubmit(payload: WorkFiltersPayload) {
    if (!payload) return;
    payload.tagList_like = payload.selectedTagList?.join("|") || "";
    delete payload.selectedTagList;
    await onSubmit?.(payload);
  }

  const debounceSearchchange = debounce(handleSubmit(handleLoginSubmit), 350);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleLoginSubmit)(e);
      }}
    >
      <InputField
        placeholder="Search word by title"
        name="search"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          console.log("Change", event.target.value);
          debounceSearchchange();
        }}
      />

      <AutoCompleteField
        name="selectedTagList"
        label="Filter by category"
        placeholder="Category"
        control={control}
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={() => debounceSearchchange()}
      />
    </Box>
  );
}
