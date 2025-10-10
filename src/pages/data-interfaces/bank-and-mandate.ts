export interface bankListRes {
  success: boolean;
  data: bankListKeys[];
}

export interface bankListKeys {
  primary: boolean;
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_type: string;
  verified:boolean
}

export interface userMandateRes {
  success: boolean;
  data: userBankDetailKeys[];
}

export interface userBankDetailKeys {
  bank_name: string;
  bank_code: string;
  verified: boolean;
  account_number: string;
  account_type: string;
  branch_name: string;
  ifsc_code: string;
  mandates: mandateKeys[];
}

export interface mandateKeys {
  umrn_no: string;
  mandate_limit: string;
  mandate_id: string;
  mandate_start: string;
  mandate_end: string;
}
export interface ifscRes {
  success: boolean;
  bank_name: string;
  branch_name: string;
}
export interface varifyBankRes {
  success: boolean;
  msg: string;
  data: varifyBankKeys;
}
export interface varifyBankKeys {
  active: string;
  reason: string;
  nameMatch: string;
  nameMatchScore: string;
}
