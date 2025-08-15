import { useApiQuery } from "./useApiQuery";
import type {ConfigPropsT, IncomesT} from "../model/ProductionT.ts";

export const useIncomes = ({config}: ConfigPropsT) => {
    return useApiQuery<IncomesT>("/incomes", config);
};