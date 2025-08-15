import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import type { ParamsT } from "../model/ProductionT.ts";
import { $wb_api } from "../../../lib/api/api.ts";

// Базовые параметры
const DEFAULT_PARAMS: ParamsT = {
    dateFrom: "",
    dateTo: "",
    page: 1,
    key: import.meta.env.VITE_KEY,
    limit: 50,
};

export const useApiQuery = <T>(
    endpoint: string,
    initialParams: Partial<ParamsT> = {}
) => {
    const params = ref<ParamsT>({
        ...DEFAULT_PARAMS,
        ...initialParams,
    });

    const query = useQuery({
        queryKey: [endpoint, params.value.page, params.value.dateFrom, params.value.dateTo, params.value.limit],
        queryFn: () =>
            $wb_api.get<T>(endpoint, {
                params: { ...params.value },
            }).then((res) => res.data),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const setPage = (newPage: number) => {
        params.value.page = newPage;
    };

    const setLimit = (newLimit: number) => {
        params.value.limit = newLimit;
    };

    const setDateRange = (from: string, to: string) => {
        params.value.dateFrom = from;
        params.value.dateTo = to;
    };

    return {
        ...query,
        params,
        setPage,
        setLimit,
        setDateRange,
    };
};