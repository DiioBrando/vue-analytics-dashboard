import { useApiQuery } from "./useApiQuery";
import type {ConfigPropsT, SalesT} from "../model/ProductionT.ts";

export const useSales = ({config}: ConfigPropsT) => {
    return useApiQuery<SalesT>("/sales", config);
};