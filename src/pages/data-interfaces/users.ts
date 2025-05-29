export interface userStatusResponse {
  msg: string;
  success: boolean;
  data: userDataKeys;
}

export type userDataKeys = {
  showProfile: boolean;
  userEmail: boolean;
  password: boolean;
  loggedInAt: string | null;
  name: boolean;
  mobileNo: boolean;
  userID: boolean;
  PAN: boolean;
  guard_pan: string | null;
  createdAt: boolean;
  lastUpdated: boolean;
  resetmpinotp: boolean;
  doneKYC: boolean;
  uploadMandateProof: boolean;
  resetpwotp: string;
  displayName: string;
  mpin: boolean;
  email: string;
  mobile: string;
  pan: string;
  dob: string;
  gender: string | null;
  iin: string;
  email_rel: string | null;
  mobile_rel: string | null;
  IINName: string;
};
