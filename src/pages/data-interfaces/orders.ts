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
  installment_amount?: string;
  order_amount?: string;
  all_units?: boolean;
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
  order_amount: string;
  units?: string;
  all_units?: boolean;
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
  order_amount: string;
  units?: string | number;
  all_units?: boolean;
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

export interface installmentDetailRes {
  success: boolean;
  data: installmentDetailKeys;
}
export interface installmentDetailKeys {
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
  folio_number: string;
  transaction_type: string;
  installment_id: string;
  installment_no: string;
  installment_amount: number;
  installment_units: number;
  installment_date: string;
  bank_name: string;
  bank_acc_no: string;
  transaction_nav_price: number;
  transaction_nav_date: string;
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
  redemption_amount?: number;
  transaction_id: string;
  investment_type: string;
  bank_name: string;
  bank_account_number: string;
  nav_date: string;
  nav_price: number;
  all_units?: boolean;
  redemption_units?: number;
}
export interface swpOrderDetailsRes {
  success: boolean;
  data: swpOrderDetailsKeys;
}
export interface swpOrderDetailsKeys {
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
  installment_amount: number;
  total_invested: string;
  total_units: string;
  status: string;
  swp_start_date: string;
  folio_number: string;
  installments: swpInstallmentKeys[];
  transaction_id?: string;
}
export interface swpInstallmentKeys {
  installment: number;
  installment_id: string;
  installment_date: string;
  units_withdrawn: number;
  nav: number;
  installment_amount: string;
}
export interface swpInstallmentDetailsRes {
  success: boolean;
  data: swpInstallmetDetailKeys;
}
export interface swpInstallmetDetailKeys {
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
export interface cancelSIPRes {
  success: boolean;
  status: string;
  message: string;
}


//transaction parts=====================
export interface transactionHistoryRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: transactionHistoryKeys[];
}

export interface transactionHistoryKeys {
  scheme_name: string,
  accord_product_code: number,
  accord_amc_code: number,
  folio_number: string,
  transaction_id: string,
  transaction_amount: number,
  transaction_units: number | null,
  transaction_type: string,
  transaction_date?: string,
  last_transaction_date?: string,
  next_installment_date: string | null,
  NATURE: string,
  DESC: string
}

export interface transactionDetailsRes {
  success: boolean;
  data: transactionDetailsKeys;
}
export interface transactionDetailsKeys {
 scheme_name: string ,
    accord_product_code: number,
    accord_amc_code: number,
    folio_number: string,
    transaction_id: string,
    transaction_amount: number,
    transaction_units: number|null, // if we get units from RTA, otherwise null
    transaction_type: string,
    last_transaction_date: string,
    next_installment_date: string|null, // only in case of SIP/STP/SWP transactions
    bank_name: string,
    bank_acc_no: string,
    transaction_nav_price: number,
    transaction_nav_date: string,
    start_date: string|null, // only in case of SIP/STP/SWP transactions
    end_date: string|null, // only in case of SIP/STP/SWP transactions
    has_installment: boolean, // true for only SIP transactions 
    NATURE:string,
    DESC:string
}

export interface installmentHistoryRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: installmentHistoryKeys[];
}
export interface installmentHistoryKeys {
 scheme_name: string,
      accord_product_code: number,
      accord_amc_code: number,
      folio_number: string,
      installment_id: string,
      installment_no: string,
      installment_amount: number,
      installment_units: number,
      installment_date: string,
      installment_unique_no: string,
}

export interface installmentDetailsRes{
  success: boolean;
  data: installmentDetailsKeys;
}
export interface installmentDetailsKeys{
   scheme_name:string,
    accord_product_code:number,
    accord_amc_code:number,
    folio_number:string,
    transaction_type:string,
    installment_id:string,
    installment_no:string,
    installment_amount:number,
    installment_units:number,
    installment_date:string,
    bank_name:string,
    bank_acc_no: string,
    transaction_nav_price: number,
    transaction_nav_date: string
}
export interface switchOrderRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: switchOrderKeys[];
}
export interface switchOrderDetailsRes {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: switchOrderKeys;
}
export interface switchOrderKeys {
  source_scheme: schemeKeys;
  target_scheme: schemeKeys;
  folio_number: string;
  order_date: string;
  order_amount: number;
  transaction_id: string;
  status: string;
  investment_type?: string;
  units?: number;
  all_units?: boolean;
  bank_name?: string;
  bank_account_number?: string;
  nav_date?: string;
  nav_price?: number;
  installment_amount?: number;
}
export interface schemeKeys {
  scheme_name: string;
  accord_product_code: number;
  accord_amc_code: number;
}

export interface orderDetailsKeys {
  source_scheme?: schemeKeys;
  target_scheme?: schemeKeys;
  folio_number: string;
  order_date: string;
  order_amount: string;
  transaction_id: string;
  status: string;
  investment_type?: string;
  bank_name?: string;
  bank_account_number?: string;
  nav_date?: string;
  nav_price?: number;
  installment_amount?: number;
}