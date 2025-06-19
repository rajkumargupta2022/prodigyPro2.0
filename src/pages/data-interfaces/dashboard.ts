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
export type allFamilyListKeys = {
  hold_n_code: string;
      jh1_name: string;
      jh2_name: string;
      fullAddress: string;
      ucc: string;
      name: string;
      pan: string;
      email: string;
      mobile: string;
      gPan: string|null;
      profilePic: string;
      relation: string;
      dob: string;
      createdAt: string
};

export interface allFamilyResponseType {
  success: boolean;
  data: allFamilyListKeys[];
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
