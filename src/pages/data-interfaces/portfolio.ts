import { schemeDeatilDataKeys } from "./transact";

export interface detailPortfolioSchemeType {
  folio: string;
  id?: string;
  productcode?: string;
  accordSchemeCode: number;
  gpan?: string | null;
  name?: string;
  pan?: string | null;
  OminusOne?: number;
  absolute?: number;
  assettype?: string;
  cagr?: string;
  cnav?: number;
  currentvalue: string;
  cvpv?: number;
  datediffvalue?: number;
  days?: number;
  days_by_365?: number;
  days_purchase?: number;
  debt?: number;
  equity?: number;
  finalcagr?: string;
  gold?: number;
  navdate?: string;
  one_by_m?: number;
  power?: number;
  prenavdate?: string;
  prevnav?: number;
  purchase: string;
  scheme: string;
  sum1?: number;
  sum2?: number;
  time?: string;
  unit: string;
  userid?: string;
  USER_ID?: number;
  rta?: string;
  currentDate?: string;
  RMID?: string;
  RM?: string;
  previousvalue?: number;
  oldunit?: number;
  oldnav?: number;
  ACCORD_STATUS?: string;
  currentNavDiff?: number;
  updated?: string;
  gain?: string;
  amcCode?: string;
  stpDateList?: number[];
  schemeName?: string;
  accordAMCCode: number;
  amount?: number;
  folioNumber?: string;
  redemption_units?: number;
  all_units?: boolean;
  isRedeemAmount?: boolean;
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

export interface portfolioReviewRes {
  success: boolean;
  data: portfolioReviewKeys[];
}

export interface portfolioReviewKeys extends schemeDeatilDataKeys {
  folio: string;
  accordSchemeCode: number;
  accordAMCCode: number;
  scheme: string;
  nseProductCode: string;
  nseAMCCode: string;
  purchase: number;
  currentvalue: number;
  unit: number;
  target?: targetSchemesKeys;
}

export interface targetSchemesKeys {
  accordProductCode: number;
  accordAmcCode: number;
  scheme: string;
  nseProductCode: string;
  nseAMCCode: string;
}
export interface portfolioSummaryRes {
  success: boolean;
  msg: string;
  data: portfolioSummaryKeys;
}
export interface portfolioSummaryKeys {
  total: number;
  performance_summary: summaryInsideKeys[];
}
export interface summaryInsideKeys {
  name: string;
  currentValue: number;
  scheme_count: number;
}
export interface portfolioExpertRes {
  success: boolean;
  data: portfolioExpertKeys;
}
export interface portfolioExpertKeys {
  email: string;
  name: string;
  phone: string;
  designation:string
  img: string;
  aum: string;
}

export interface schemeSummaryRes {
  success: boolean;
  data: schemeSummaryKeys[];
}
export interface schemeSummaryKeys extends schemeDeatilDataKeys {
  scheme: string;
  accordProductCode: number;
  accordAmcCode: number;
  scheme_category: string;
  scheme_sub_category: string;
  ideal_investment_period: number;
  fund_returns: number;
  benchmark_returns: number;
  category_returns: number;
  negative_observations: number;
  short_note: string;
  long_note: string;
  sip_allowed: boolean;
  purchase_allowed: boolean;
  min_purchase_amount: number;
  sip_dates: number[];
  min_sip_amount: number;
  folio?: string;
}

export interface notesRes {
  success: boolean;
  data: portfolioNoteKeys;
}
export interface portfolioNoteKeys {
  switch: noteTypeKeys;
  redemption: noteTypeKeys;
  undwerwatch: noteTypeKeys;
  satisfactory_performance: noteTypeKeys;
}
export interface noteTypeKeys {
  short_note?: string;
  long_note?: string;
}
