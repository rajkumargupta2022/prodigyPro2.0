import { detailPortfolioSchemeType } from "./portfolio";

export interface isAvailbleEmergencyPortfolioRes {
  success: boolean;
  data: boolean;
  msg: string;
}

export interface emergencySnapshortRes {
  success: boolean;
  data: emergencySnapshortKeys[];
  msg: string;
}
export interface emergencySnapshortKeys {
  Totalpurchase: number;
  Totalmarketvalue: number;
  Gainloss: number;
  absolute_return: number;
}
export interface emergencyPortfolioListRes {
  success: boolean;
  data: detailPortfolioSchemeType[];
  msg: string;
}
export interface bajanjInstaRedeemRes {
  success: boolean;
  transaction_reference_no: string;
}
