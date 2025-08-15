import { useApiQuery } from "./useApiQuery";
import type {ConfigPropsT, StocksT} from "../model/ProductionT.ts";

export const useStocks = ({config}: ConfigPropsT) => {
    return useApiQuery<StocksT>("/stocks", config);
};