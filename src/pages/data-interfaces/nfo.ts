export interface nfoLiveRes {
  success: true;
  data: nfoLiveKey[];
}
export interface nfoLiveKey {
  scheme: string;
  accordSchemeCode: number;
  accordAMCCode: number;
  cnav: number;
  launchDate: string;
  nfo_close_date: string;
  equityType: string;
  minSIPAmt: number;
  minLumSumAmt: number;
  planOption: string;
  sipAllowed: boolean;
  sipDateList: number[];
  purchaseAllowed: boolean;
  planType: string;
  nfo_allotment_date?: string;
  nseProductCode: string;
  nseAMCCode: string;
   amount?: number;
    totalAmount?:number;
    mandateId?: string;
    start_date?: any;
    from_date?: any;
    to_date?: any;
    firstSIPToday:boolean
}
