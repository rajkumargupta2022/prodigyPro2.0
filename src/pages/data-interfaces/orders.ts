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
  sip_start_date: string;
  installment_amount: string;
  transaction_id: string;
  status: string;
  order_date: string;
  sip_registration_no: string;
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
  accord_product_code: number;
  accord_amc_code: number;
  folio_number: string;
  swp_start_date: string;
  next_swp_date: string;
  installment_amount: string;
  transaction_id: string;
  status: string;
  order_date: string;
}
export interface sipOrderDetailRes {
  success: boolean;
  data: sipOrderDetailKey;
}
export interface sipOrderDetailKey {
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
  installment_amount: number;
  total_invested: string;
  total_units: string;
  sip_start_date: string;
  folio_number: string;
  installments: sipOrderSingleTransactionKey[];
}
export interface sipOrderSingleTransactionKey {
  installment: number;
  installment_id: string;
  installment_date: string;
  units_allocated: string;
  installment_amount: string;
}

export interface OneTimeRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: oneTimeKeys[];
}
export interface oneTimeKeys {
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
  folio_number: string;
  order_date: string;
  investment_type: string;
  order_amount: string;
  transaction_id: string;
  status: string;
  nav_date: string;
  nav_price: number;
}

export interface RedemptionRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: RedemptionKeys[];
}
export interface RedemptionKeys {
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
  folio_number: string;
  order_date: string;
  redemption_amount: string;
  transaction_id: string;
  status: string;
}
export interface installmentRes {
  success: boolean;
  data: installmentKeys;
}
export interface installmentKeys {
  status: string;
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
  folio_number: string;
  order_date: string;
  installment_amount: number;
  transaction_id: string;
  investment_type: string;
  bank_name: string;
  bank_account_number: string;
  nav_date: string;
  nav_price: number;
}

export interface purchaseDetailsRes {
  success: boolean;
  data: purchaseDetailsKeys;
}
export interface purchaseDetailsKeys {
  status: string;
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
  folio_number: string;
  order_date: string;
  order_amount?: number;
  redemption_amount?:number
  transaction_id: string;
  investment_type: string;
  bank_name: string;
  bank_account_number: string;
  nav_date: string;
  nav_price: number;
}
