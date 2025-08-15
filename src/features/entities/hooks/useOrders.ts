import { useApiQuery } from "./useApiQuery";
import type {ConfigPropsT, OrdersT} from "../model/ProductionT.ts";

export const useOrders = ({config}: ConfigPropsT) => {
    return useApiQuery<OrdersT>("/orders", config);
};