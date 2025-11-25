export interface schemeDetailType {
  success: boolean;
  data: schemeDeatilDataKeys[];
}
export interface schemeDeatilDataKeys {
  scheme: string;
  accordSchemeCode: number;
  accordAMCCode: number;
  cnav: number;
  launchDate: string;
  nfo_close_date?:string
  equityType: string;
  minSIPAmt: number;
  minLumSumAmt: number; 
  planOption: string;
  sipAllowed: boolean;
  sipDateList: number[];
  purchaseAllowed: boolean;
  planType: string;
  nfo_allotment_date?:string|null
  nseProductCode: string;
  nseAMCCode: string;
  stpAllowed?: boolean;
  swpAllowed?: boolean;
  redemptionAllowed?: boolean;
  switchAllowed?: boolean;
  // amcCode: string;
  nseReinvestTag?: string;
  lockInPeriod?: number;
  ISIN?: string;
  expenseRatio?: number;
  fundSize?: number;
  risk?: string;
  exitLoadPeriod?: number;
  exitLoad?: string;
  stpDateList?: number[];
  swpDateList?: number[];
  swpFrequency?: string[];
  stpFrequency?: string[];
  oneYearCAGR?: number;
  threeYearCAGR?: number;
  fiveYearCAGR?: number;
  amount?: number;
  totalAmount?:number;
  folioList?: foliosKeys[];
  selectedFolio?: foliosKeys;
  mandateId?: string;
  start_date?: any;
  from_date?: any;
  to_date?: any;
  firstSIPToday?:boolean
}

export interface navHistoryResponse {
  success: boolean;
  accordSchemeCode: number;
  cagr: number;
  history: navHistoryKeys[];
}

export interface navHistoryKeys {
  date: string;
  nav: number;
}
export interface bankMandateResponse {
  success: boolean;
  mandates: bankMandateKeys[];
}
export interface bankMandateKeys {
  bank_name: string;
  umrn_no: string;
  acc_type: string;
  bank_code: string;
  account_no: string;
  mandate_date: string;
  amount: number;
  from_date: string;
  to_date: string;
}

export interface foliosResponse {
  success: boolean;
  data: foliosKeys[];
  msg: string;
}
export interface foliosKeys {
  folio_number: string;
  scheme_code: number;
  invested_amt: number;
  current_value: number;
  is_recommended: boolean;
}

export interface sipPurchaseRedemptionKey {
  folio_no: string;
  amount: number;
  reg_status: boolean;
  reg_id: string;
  reg_remark: string;
  schemeName: string;
}
export interface sipPurchaseRedemptionResponse {
  success: boolean;
  data: sipPurchaseRedemptionKey[];
}
export interface redeemBody {
  ucc: string;
  transactionType: string;
  cartItems: redeemBodyKeys[];
}
export interface redeemBodyKeys {
  schemeName: string;
  accordProductCode: number;
  amount: number;
  folioNumber: string;
  redemption_units: number;
  all_units: boolean;
}
export interface swpKey {
  folio_no: string;
  amount: number;
  reg_status: boolean;
  reg_id: string;
  reg_remark: string;
  schemeName: string;
}

export interface swpResponse {
  success: boolean;
  data: swpKey[];
}
export interface cartItemKey {
  fromAccordProductCode: string|number;
  toAccordProductCode: string | number;
  amount: number;
  stpDateList?: number[];
  folioNumber: string;
  installment_units: number;
  stpFrequency?: any;
  isSwitchAmount?:boolean;
  all_units: boolean;
  unit?: number;
  redemption_units?:number;
  toScheme?: string;
  fromScheme?: string;
  fromValue?: number,
  fromUnit?: number,
  fromAccordAMCCode?: number,
  toAccordAMCCode?: number
  id?:any
}
export interface switchResponse {
  success: boolean,
  data: switchKeys[]
}
export interface switchKeys {
  folio_no: string,
  units?: string | number,
  amount?: string | number
  reg_status: boolean,
  reg_id: string,
  reg_remark: string,
  schemeName: string
}
export interface swpResponse {
  success: boolean,
  data: swpKey[]
}

export interface HelpandSupport {
  phoneSupport: string;
  emailSupport: string;
  whatsappSupport: string;
  rmSupport: string;
}

export interface goalSchemeRes {
  success: boolean,
  msg: string,
  length: number,
  data: goalSchmes[]
}
export interface goalSchmes {
  accordAMCCode: number,
  accordSchemeCode: number,
  equityType: string,
  scheme: string,
  nseAMCCode: string,
  nseProductCode: string,
  sipDateList: number[],
  minSIPAmt: string,
  minLumSumAmt: string,
  sipAllowed: boolean,
  purchaseAllowed: boolean
}
