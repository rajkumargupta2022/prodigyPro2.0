export interface NewMfUserRes {
  success: boolean;
  data: boolean;
}

export interface getAllBankAccRes {
  success: boolean;
  data: getAllBankAccKeys[];
}

export interface getAllBankAccKeys {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_type: string;
  primary: boolean;
  savings_plus_linked: boolean;
}
export interface getConsentLinkRes {
  success: boolean;
  data: getConsentLinkKeys;
}
export interface getConsentLinkKeys {
  consentUrl?: string;
}

export interface calculateManualInsightsKeys {
  current_balance: number;
  surplus_balance: number;
  avg_balance?: number;
  savings_plus_returns?: number;
  bank_returns: number;
  last_refreshed_data?: number;
}
export interface calculateManualInsightsRes {
  success: boolean;
  data: calculateManualInsightsKeys;
}

export interface getAllInsightsRes {
  success: boolean;
  data: getAllInsightsKeys;
}

export interface getAllInsightsKeys {
  current_balance: number;
  surplus_balance: number;
  avg_balance: number;
  savings_plus_returns: number;
  bank_returns: number;
  last_refreshed_data: string;
}

export interface getBankInsightsRes {
  success: boolean;
  data: getBankInsightsKeys[];
}

export interface getBankInsightsKeys {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_type: string;
  holder_name: string;
  primary: boolean;
  current_balance: number;
  surplus_balance: number;
  avg_balance: number;
  last_refreshed_data: string;
}

export interface revokeBankConsentRes {
  success: boolean;
  data: string;
}
