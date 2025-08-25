export const baseUrl:string = "https://prodigypro-new.bfcsofttech.in/api/v2/"
// export const baseUrl:string = "https://uat.bfccapital.com/prodigypro/api/"
export const imageUrl:string ="https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/"

export enum endPoints{
   registerUser="register/register-user",
   varifyOtp="register/verify-otp",
   requestKycLink="register/request-kyc-link",
   requestKycData="register/request-kyc-data",
   getFamilySnapshot="portfolio/get-family-snapshot",
   getAllFamily="user/get-all-family",
   userStatus="user/user-status",
   swpCalculator="calculators/swp",
   getDetailedPortfolio="portfolio/get-detailed-portfolio",
   getPortfolioTransactionDetail="portfolio/get-portfolio-transaction-detail",
   sipStpSwpReport="reports/sip-stp-swp-report",
   getSchemeDetails="product/get-scheme-details",
   getNavHistory="product/get-nav-history",
   getSchemeFolios = "transact/get-scheme-folios",
   getMandateList="transact/get-mandate-list",
   sipPurchaseRedemption="transact/sip-purchase-redemption",
   getFilteredScheme="product/get-filtered-scheme",
   getAmcList="product/get-amc-list",
   getAssetTypesList="product/get-assetTypes-list",
   getCategoryTypesList="product/get-categoryTypes-list",
   swp="transact/swp",
   switch="transact/switch",
   stp="transact/stp",
   getHelpandSupport ="content/get-help-support",
   getAboutUs = "content/get-about-us",
   getPrivacyPolicy = "content/get-privacy-policy",
   goalPlanningSchemes="goal-planning/get-goal-planning-schemes",
   rateRm="content/rate-rm"
}