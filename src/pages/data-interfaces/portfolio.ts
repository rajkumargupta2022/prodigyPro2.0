export interface detailPortfolioSchemeType {
  folio: string;
  productcode: string;
  ACCORD_SCHEMECODE: number;
  gpan: string | null;
  name: string;
  pan: string | null;
  OminusOne: number;
  absolute: number;
  assettype: string;
  cagr: string;
  cnav: number;
  currentvalue: string;
  cvpv: number;
  datediffvalue: number;
  days: number;
  days_by_365: number;
  days_purchase: number;
  debt: number;
  equity: number;
  finalcagr: string;
  gold: number;
  navdate: string;
  one_by_m: number;
  power: number;
  prenavdate: string;
  prevnav: number;
  purchase: string;
  scheme: string;
  sum1: number;
  sum2: number;
  time: string;
  unit: string;
  userid: string;
  USER_ID: number;
  rta: string;
  currentDate: string;
  RMID: string;
  RM: string;
  previousvalue: number;
  oldunit: number;
  oldnav: number;
  ACCORD_STATUS: string;
  currentNavDiff: number;
  updated: string;
  gain: string;
}
export interface detailPortfolioTotalTransactionType {
  TotalMarketValue: number;
  Totalpurchase: number;
  finalcagr: string;
  Gainloss: number;
  TotalEquity: number;
  TotalDebt: number;
  TotalGOld: number;
  length: number;
  data: detailPortfolioSchemeType[];
}
export interface detailPortfolioType {
  status: number;
  success: boolean;
  msg: string;
  dataSent: detailPortfolioTotalTransactionType;
}