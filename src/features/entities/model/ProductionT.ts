export type ParamsT = {
    dateFrom: string;
    dateTo: string;
    page?: number;
    key?: string;
    limit?: number;
}

export type OrdersT = {
    data: Array<OrdersDataT>;
    links: LinksT;
    meta: MetaT;
}

export type OrdersDataT = {
    g_number: string;
    date: string;
    last_change_date: string;
    supplier_article: string;
    tech_size: string;
    barcode: number;
    total_price: string;
    discount_percent: number;
    warehouse_name: string;
    oblast: string;
    income_id: number;
    odid: string;
    nm_id: number;
    subject: string;
    category: string;
    brand: string;
    is_cancel: boolean;
    cancel_dt: null;
}

export type LinksT = {
    first: string;
    last: string;
    prev: null;
    next: string;
}

export type MetaT = {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<LinksMetaT>;
    path: string;
    per_page: string;
    to: number;
    total: number;
}

export type LinksMetaT = {
    url: string | null;
    label: string;
    active: boolean;
}

export type SalesT = {
    data: Array<SalesDataT>;
    links: LinksT
    meta: MetaT;
}

export type SalesDataT = Omit<OrdersDataT, 'oblast' | 'income_id' | 'odid' | 'nm_id' | 'subject' | 'category' | 'brand' | 'is_cancel' | 'cancel_dt'> & {
    is_supply:  boolean;
    is_realization:  boolean;
    promo_code_discount: null;
    country_name: string;
    oblast_okrug_name: string;
    region_name: string;
    income_id: number;
    sale_id: string;
    odid: null;
    spp: string;
    for_pay: string;
    finished_price: string;
    price_with_disc: string;
    nm_id: number;
    subject: string;
    category: string
    brand: string
    is_storno: null;
}

export type IncomesT = {
    data: Array<IncomesDataT>;
    links: LinksT;
    meta: MetaT;
}

export type IncomesDataT = {
    income_id: number;
    number: string;
    date: string;
    last_change_date: string;
    supplier_article: string;
    tech_size: string;
    barcode: number;
    quantity: number;
    total_price: string;
    date_close: string;
    warehouse_name: string;
    nm_id: number;
}

export type StocksT = {
    data: Array<StocksDataT>;
    links: LinksT;
    meta: MetaT;
}

export type StocksDataT = {
    date: string;
    last_change_date: string;
    supplier_article: string;
    tech_size: string;
    barcode: number;
    quantity: number
    is_supply: boolean;
    is_realization: boolean;
    quantity_full: number;
    warehouse_name: string;
    in_way_to_client: number;
    in_way_from_client: number;
    nm_id: number;
    subject: string;
    category: string;
    brand: string
    sc_code: number;
    price: string;
    discount: string;
}

export type ConfigPropsT = {
    config?: Partial<ParamsT>;
}