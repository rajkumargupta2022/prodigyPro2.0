export interface sifFundsRes {
  success: boolean;
  data: sifFundsKeys[];
}
export interface sifFundsKeys {
  minSIPAmt: string;
  minLumSumAmt: string;
  purchaseAllowed: boolean;
  sipAllowed: boolean;
  scheme: string;
  accordSchemeCode: number;
  accordAMCCode: number;
  sipDateList: number[];
  nseAMCCode: string;
  nseProductCode: string;
  risk: string;
  fundSize: number;
  oneYearCAGR: number | null;
  twoyearret: number | null;
  threeYearCAGR: number | null;
  fouryearret: number | null;
  fiveYearCAGR: number | null;
  sevenyearret: number | null;
  tenyearret: number | null;
  fifteenyearret: number | null;
  equityType: string;
}
