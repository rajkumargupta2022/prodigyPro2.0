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
  // s_name: string;
  accordAMCCode:number;
  // ISIN: string;
  equityType:string,
  fundSize:number;
  accordSchemeCode?: number;
  PURCHASE_ALLOWED: string;
  SIP_ALLOWED: string;
  AMC_CODE: string;
  PRODUCT_CODE: string;
  PRODUCT_LONG_NAME: string;
  SIP_DATES: any;
  STP_DATES: any;
  SWP_DATES: any;
  REINVEST_TAG: string;
  oneyrret: number;
  twoyearret: number;
  minSIPAmt:string;
  threeYearCAGR:number;
  threeyearret: number|null;
  fouryearret: number|null;
  fiveyearret: number|null;
  sevenyearret: number|null;
  tenyearret: number|null;
  fifteenyearret: number|null;
 

}
