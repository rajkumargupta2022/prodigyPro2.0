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
