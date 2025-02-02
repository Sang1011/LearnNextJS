import { workApi } from "@/api-client";
import { QueryKeys } from "@/constants";
import useSWR, { SWRConfiguration } from "swr";

export interface UseWorkDetailProps {
    workId: string
    options?: SWRConfiguration
    enabled?: boolean
}

export function useWorkDetail({workId, options, enabled = true}: UseWorkDetailProps){
    const swrResponse = useSWR(enabled ? [QueryKeys.GET_WORK_DETAILS,workId] : null, () => workApi.get(workId), {
        dedupingInterval: 30 * 1000,
        keepPreviousData: true,
        fallbackData:{
            data: [],
            pagination: {
                _page: 1,
                _limit: 10,
                _totalRows: 0
            }
        },
        ...options
    })

    async function updateWork(payload: FormData) {
        const newWork = await workApi.update(payload);
        swrResponse.mutate(newWork);
        return newWork
    }
    
    return {... swrResponse, updateWork}
}