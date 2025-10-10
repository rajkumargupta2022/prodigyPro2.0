export interface amcListResponse {
  success: boolean;
  msg: string;
  length: number;
  data: amcListKeys[];
}
export interface amcListKeys {
  amc_code: number;
  AMC_Name: string;
}

export interface categoryListResponse {
  success: boolean;
  msg: string;
  length: number;
  data: categoryListKeys[];
}

export interface categoryListKeys {
  asset_code: number;
  category: string;
  sub_category: string;
  classcode: number;
}

export interface assetTypeListResponse {
  success: boolean;
  msg: string;
  length: number;
  data: assetTypeListKeys[];
}

export interface assetTypeListKeys {
  asset_code: number;
  asset_type: string;
}

export interface filteredSchemeResponse {
  success: boolean;
  msg: string;
  length: number;
  data: filteredSchemesKeys[];
}
export interface filteredSchemesKeys {
  // accordAMCCode: number;
  // scheme: string;
  // nseAMCCode:string;
  // nseProductCode:string;
  // minLumSumAmt:string;
  // equityType: string;
  // fundSize: number;
  // accordSchemeCode?: number;
  // PURCHASE_ALLOWED: string;
  // SIP_ALLOWED: string;
  // AMC_CODE: string;
  // PRODUCT_CODE: string;
  // SIP_DATES: any;
  // STP_DATES: any;
  // SWP_DATES: any;
  // REINVEST_TAG: string;
  // oneyrret: number;
  // twoyearret: number;
  // minSIPAmt: string;
  // threeYearCAGR: number;
  // threeyearret: number | null;
  // fouryearret: number | null;
  // fiveyearret: number | null;
  // sevenyearret: number | null;
  // tenyearret: number | null;
  // fifteenyearret: number | null;

  accordSchemeCode: number;
  scheme: string;
  accordAMCCode: number;
  nseAMCCode: string;
  nseProductCode: string;
  minSIPAmt: string;
  minLumSumAmt: string;
  oneYearCAGR: number;
  threeYearCAGR: number;
  fiveYearCAGR: number;
  equityType: string;
  sipAllowed: boolean;
  stpAllowed: boolean;
  swpAllowed: boolean;
  purchaseAllowed: boolean;
  redemptionAllowed: boolean;
  switchAllowed?: boolean;
  stpDateList?: number[];
  sipDateList: number[];
  swpDateList?: number[];
  swpFrequency?: string[];
  stpFrequency?: string[];
  fundSize: number;
}
export interface riskDurationRes {
  success: boolean;
  msg: string;
  length: number;
  dataDuration: durationKeys[];
  dataRisk: riskKeys[];
}
export interface durationKeys {
  duration: string;
  durationValues: number;
}
export interface riskKeys {
  risk: number;
  Constellation: string;
}

export interface riskListRes {
  success: boolean;
  data: riskListKey[];
}
export interface riskListKey {
  risk: string;
  risk_code: number;
}
export interface searchRes {
  success: boolean;
  data: searchKeys[];
}

export interface searchKeys {
  scheme_name: string;
  accord_scheme_code: number;
}

export interface shortRes {
  success: boolean;
  data: shortKeys[];
}
export interface shortKeys {
  sort_mode: string;
  sort_code: number;
}
