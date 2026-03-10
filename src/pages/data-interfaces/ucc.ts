export interface personalDetailForm {
  full_name?: string;
  email?: string;
  email_verified?: boolean;
  email_relation?: string;
  mobile?: string;
  mobile_verified?: boolean;
  mobile_relation?: string;
  dob?: string;
  gender?: string;
  pan?: string;
  guardian_name?: string;
  guardian_relation?: string;
  guardian_pan?: string;
}

export interface addressDetailForm {
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface fatchDeclarationsForm {
  wealth_source?: number;
  occupation?: number;
  resident_status?: number;
  income_range?: number;
  place_of_birth?: string;
  no_politically_exposed?: boolean;
  confirm_resident_indian?: boolean;
}

export interface bankDetailForm {
  bank_name?: string;
  bank_ifsc?: string;
  bank_branch?: string;
  bank_account_type?: string;
  bank_account_number?: string;
  is_bank_verified?: boolean;
}

export interface nomineeDetailForm {
  nominee_name?: string;
  nominee_relation?: string;
  nominee_allocation?: number;
  nominee_pan?: string;
  nominee_email?: string;
  nominee_mobile?: string;
  nominee_dob?: string;
  is_nominee_minor?: boolean;
  nominee_guardian_name?: string; // String
  nominee_guardian_pan?: string; // String
  nominee_address?: addressDetailForm;
}

export interface uccDataRes {
  success?: boolean;
  data: uccDataResKeys;
}
export interface uccDataResKeys {
  reference_id?: string;
  tax_status?: number;
  holding_nature?: string;
  primary_user?: userDataObj;
  secondary_user?: userDataObj;
  third_user?: userDataObj;
  bank_details?: bankDetailForm;
  mandate_amount?: number;
  nominees?: nomineeDetailForm[];
}
export interface userDataObj {
 personal_details?: personalDetailForm;
 address_details?: addressDetailForm;
 fatca_declarations?: fatchDeclarationsForm;
}

export interface pincodeDetailsRes {
  success: boolean;
  msg: string
  data: pincodeDetailsKeys
}
export interface pincodeDetailsKeys{
  pincode: string;
  district: string;
  state: string;
  country: string;
}
export interface bankNameRes{
    success: boolean,
  bank_name: string,
  branch_name: string
}
