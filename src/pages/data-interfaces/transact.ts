export interface schemeDetailType {
  success: boolean;
  data: schemeDeatilDataKeys[];
}
export interface schemeDeatilDataKeys {
  scheme: string;
  accordSchemeCode: number;
  fundSize:string
  nseProductCode: string;
  nseAmcCode: string;
  nseReinvestTag: string;
  launchDate: string;
  lockInPeriod: number;
  ISIN: string;
  cnav: number;
  expenseRatio: string;
  planType: string;
  planOption: string;
  risk: string;
  minInvestment: string;
  minSIPAmt:number;
  minLumSumAmt:number;
  exitLoad: string;
  sipDateList: string;
  oneYearCAGR: number;
  threeYearCAGR: number;
  fiveYearCAGR: number;
}

export interface navHistoryResponse{
  success: boolean,
  accordSchemeCode: number,
  cagr: number,
  history: navHistoryKeys[]
}

export interface navHistoryKeys {
      date: string,
      nav: number
}
