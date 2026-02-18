export interface kycStatusResponse {
  data: kycStatusKeys;
}
export interface kycStatusKeys {
  name: string;
  pan_number: boolean;
  kyc_status: boolean;
}

export interface initiateKycResponse {
  data: initiateKycKeys;
  success: boolean;
}
export interface initiateKycKeys {
  success: boolean;
  access_token: string;
  workflow_id: string;
  unique_id: string;
  transactionId: string;
  app_id: string;
}
