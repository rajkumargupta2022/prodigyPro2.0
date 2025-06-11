export type familyDataType = {
  Totalpurchase: number;
  Totalmarketvalue: number;
  Finaldays: number;
  Finalcagr: string;
  Totaldayschange: number;
  Gainloss: number;
  Dividend: number;
  debtPercentFinal: string;
  goldPercentFinal: string;
  equityPercentFinal: string;
  myPortfolio?: boolean;
};
export interface familySnapshotResponseType {
  msg: string;
  success: boolean;
  status: number;
  finalArray: familyDataType[];
}
export interface ProfileModelProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
export type familyWiseType = {
  Gpan: string;
  Pan: string;
  Name: string;
  Totalpurchase: number;
  TotalMarketValue: number;
  Cagr: number;
  Gainloss: number;
  userid: string;
  days: number;
};

export interface familyResponseType {
  msg: string;
  success: boolean;
  status: number;
  finalArray: familyWiseType[];
}

export interface commonFamilyPortfolioType {
  Gpan: string;
  Pan: string;
  Name: string;
  Totalpurchase: number;
  TotalMarketValue: number;
  Cagr: number;
  Gainloss: number;
  days: number;
}
