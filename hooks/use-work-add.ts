import { workApi } from "@/api-client";
import { QueryKeys } from "@/constants";
import { getErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { Arguments, mutate } from "swr";

export function useAddWork() {
  async function addNewWork(payload: FormData) {
    try {
      const newWork = await workApi.add(payload);
      mutate(
        (key: Arguments) =>
          Array.isArray(key) && key.includes(QueryKeys.GET_WORK_LIST),
        undefined,
        { revalidate: true }
      );
      return newWork;
    } catch (error) {
      const mess = getErrorMessage(error);
      toast.error(mess);
    }
  }
  return addNewWork;
}
