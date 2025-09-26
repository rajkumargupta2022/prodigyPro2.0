export interface sipStpSwpReportType {
  msg: string;
  success: boolean;
  data: sipStpSwpArrayKey[];
}
export type sipStpSwpArrayKey = {};
export interface folioStatementRes {
  success: boolean;
  data: folioStatementKey[];
}
export interface folioStatementKey {
  primary_user: string;
  second_holder: string;
  third_holder: string;
  folio_number: string;
  total_invested: number;
  current_value: number;
  bank_name: string;
  bank_account_number: string;
  bank_ifsc: string;
  nominee_1: string;
  nominee_2: string;
  nominee_3: string;
  schemes_invested: schemesUnderFolioKey[];
}

export interface schemesUnderFolioKey {
  accord_scheme_code: number;
  accord_amc_code: number;
  scheme_name: string;
  invested_value: number;
  current_value: number;
  gain_loss: number;
}

export interface elssStatementRes {
  success: boolean;
  data: elssTotalKey;
}
export interface elssTotalKey {
  total_investment: number;
  holdings: elssSchemeKey[];
}
export interface elssSchemeKey {
  accord_scheme_code: number;
  accord_amc_code: number;
  scheme_name: string;
  folio_number: string;
  transaction_amount: number;
  transaction_date: string;
  transaction_type: string; // Buy/Sell (Only successful orders needs to be listed)
  units_alloted: number;
}

export interface dividendsStatementRes {
  success: boolean;
  data: dividendsTotalKey;
}
export interface dividendsTotalKey {
  total_dividend: number;
  holdings: dividendsSchemeKey[];
}
export interface dividendsSchemeKey {
  accord_scheme_code: number;
  accord_amc_code: number;
  scheme_name: string;
  folio_number: string;
  dividend_amount: number;
  transaction_date: string;
}

export interface capitalGainRes {
  success: boolean;
  msg: string;
}
