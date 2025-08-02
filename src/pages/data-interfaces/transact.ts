export interface schemeDetailType {
  success: boolean;
  data: schemeDeatilDataKeys[];
}
export interface schemeDeatilDataKeys {
   scheme: string,
      accordSchemeCode: number,
      nseProductCode: string,
      amcCode: string,
      nseReinvestTag: string,
      launchDate: string,
      lockInPeriod: number,
      ISIN: string,
      cnav: number,
      expenseRatio: number,
      planType: string,
      planOption: string,
      equityType: string,
      fundSize: number,
      risk: string,
      minSIPAmt: number,
      minLumSumAmt: number,
      exitLoadPeriod: number,
      exitLoad: string,
      sipDateList: string[],
      oneYearCAGR: number,
      threeYearCAGR: number,
      fiveYearCAGR: number,
      amount?:number,
      folioList?:foliosKeys[],
      selectedFolio?:foliosKeys,
      umrn_no?:string
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


