export interface sipWithAnnualIncreaseRes {
  success: boolean;
  msg: string;
  data: sipWithAnnualIncreaseKeys;
}
export interface sipWithAnnualIncreaseKeys {
  status: number;
  status_msg: string;
  msg: string;
  sip_amount: number;
  interest_rate: number;
  period: number;
  sip_stepup_value: number;
  invested_amount: number;
  growth_value: number;
  maturity_amount: number;
  stepup_invested_amount: number;
  stepup_growth_value: number;
  stepup_maturity_amount: number;
}
