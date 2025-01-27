import axiosClient from "@/api-client/axios-client";
import { ListParams, ListResponse, Work } from "@/models";
import qs from "qs";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
export interface UseWorkListInfinityProps {
  params: Partial<ListParams>;
  options?: SWRInfiniteConfiguration;
  enabled?: boolean; 
}

export function useWorkListInfinity({
  params,
  options,
}: UseWorkListInfinityProps) {
  const swrResponse = useSWRInfinite<ListResponse<Work>>(
    (index: number, prevPageData: ListResponse<Work>) => {
      const page = index + 1
      const query: Partial<ListParams> = {
        _page: page,
        _limit: 5,
        ...params
      }

      if(prevPageData){
        const {_limit, _totalRows} = prevPageData.pagination || {_limit: 5, _totalRows: 0}
        const totalPages = Math.ceil(_totalRows / _limit)
        if(page > totalPages) return null
    }
      return `/works?${qs.stringify(query)}`
    },
    (url: string) => axiosClient.get(url),
    {
      revalidateFirstPage: false,
      ...options,
    }
  );

  return swrResponse;
}
