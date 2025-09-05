export interface sipOrderRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: sipOrderKeys[];
}
export interface sipOrderKeys {
  scheme_name: string;
  accord_product_code: string;
  accord_amc_code: string;
  folio_number: string;
  next_sip_date: string;
  installment_amount: string;
  transaction_id: string;
  status: string;
}

export interface swpOrderRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: swpOrderKeys[];
}
export interface swpOrderKeys {
  scheme_name: string;
  accord_product_code: string;
  accord_amc_code: string;
  folio_number: string;
  next_swp_date: string;
  withdrawl_amount: string;
  transaction_id: string;
  status: string;
}
export interface sipOrderDetailRes {
  success: boolean;
data:sipOrderDetailKey
}
export interface sipOrderDetailKey{
  scheme_name: string,
    accord_product_code: number,
    accord_amc_code: number,
    installment_amount: number,
    total_invested: string,
    total_units: string,
    sip_start_date: string,
    folio_number: string,
    installments:sipOrderSingleTransactionKey[]
}
export interface sipOrderSingleTransactionKey{
     installment: number,
        installment_id: string,
        installment_date: string,
        units_allocated: string,
        installment_amount: string
}

