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
