export const baseUrl:string = "https://prodigypro-new.bfcsofttech.in/api/v2/"
// export const baseUrl:string = "https://uat.bfccapital.com/prodigypro/api/"

export enum endPoints{
   registerUser="register/register-user",
   varifyOtp="register/verify-otp",
   requestKycLink="register/request-kyc-link",
   requestKycData="register/request-kyc-data",
   getFamilywisePortfolio="portfolio/get-familywise-portfolio",
   getFamilySnapshot="portfolio/get-family-snapshot",
   userStatus="user/user-status",
   swpCalculator="/calculators/swp"
}