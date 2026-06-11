export const baseUrl: string =
  "https://prodigypro-new.bfcsofttech.in/api/v2/";
//   export const baseUrl: string = "https://mnslgxd7-8080.inc1.devtunnels.ms/api/v2/";

export const imageUrl: string =
  "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/";
export enum endPoints {
  /* =========================
     AUTH / REGISTER
  ========================== */
  registerUser = "register/register-user",
  varifyOtp = "register/verify-otp",
  requestKycLink = "register/request-kyc-link",
  requestKycData = "register/request-kyc-data",
  getFamilyRelations = "register/get-family-relations",
  addFamilyMember = "register/add-family-member",
  resendFamilyMemberOtp = "register/resend-family-member-otp",
  verifyFamilyMemberOtp = "register/verify-family-member-otp",
  checkNewPan = "register/check-new-pan",

  /* =========================
     USER / PROFILE
  ========================== */
  userStatus = "user/user-status",
  getAllFamily = "user/get-all-family",
  saveRiskProfile = "user/save-risk-profile",
  getRiskProfile = "user/get-risk-profile",
  getUserBanks = "user/get-user-banks",
  getUserMandates = "user/get-user-mandates",

  /* =========================
     PORTFOLIO
  ========================== */
  getFamilySnapshot = "portfolio/get-family-snapshot",
  getDetailedPortfolio = "portfolio/get-detailed-portfolio",
  getPortfolioTransactionDetail = "portfolio/get-portfolio-transaction-detail",

  /* =========================
     MF SAVINGS
  ========================== */
  checkNewUser = "mf-savings/check-new-user",
  getAllBanksAcc = "mf-savings/get-all-banks-acc",
  getConsentLink = "mf-savings/get-consent-link",
  calculateManualInsights = "mf-savings/calculate-manual-insights",
  getAllInsights = "mf-savings/get-all-insights",
  getBankInsights = "mf-savings/get-bank-insights",
  revokeBankConsent = "mf-savings/revoke-bank-consent",


  /* =========================
     Loan Against MF
  ========================== */
   loanAgainstMfEligibility = "lamf/get-url",







  /* =========================
     BAJAJ INSTA REDEEM
  ========================== */
  hasEmergencyPortfolio = "bajaj-insta-redeem/has-emergency-portfolio",
  getEmergencyPortfolioSnapshot = "bajaj-insta-redeem/get-emergency-portfolio-snapshot",
  getDetailedEmergencyPortfolio = "bajaj-insta-redeem/get-detailed-emergency-portfolio",
  initiateInstaRedeem = "bajaj-insta-redeem/initiate-insta-redeem",
  confirmInstaRedeemOtp = "bajaj-insta-redeem/confirm-insta-redeem-otp",

  /* =========================
     CALCULATORS
  ========================== */
  swpCalculator = "calculators/swp",
  sipWithAnnualIncrease = "calculators/sip-with-annual-increase",
  goalPlanningSchemes = "goal-planning/get-goal-planning-schemes",
  /* =========================
     PRODUCT
  ========================== */
  getSchemeDetails = "product/get-scheme-details",
  getNavHistory = "product/get-nav-history",
  getFilteredScheme = "product/get-filtered-scheme",
  getAmcList = "product/get-amc-list",
  getAssetTypesList = "product/get-assetTypes-list",
  getCategoryTypesList = "product/get-categoryTypes-list",
  getRecommendedSchemes = "product/get-recommended-schemes",
  getRightSchemeDurationRisk = "product/get-right-scheme-duration-risk",
  getEmergencyFunds = "product/get-emergency-funds",
  getTaxPlanningScheme = "product/get-tax-planning-scheme",
  getRiskFilters = "product/get-risk-filters",
  getSortFilters = "product/get-sort-filters",
  searchScheme = "product/search-scheme",
  getActiveSif = "product/get-active-sif",
  startWith100Schemes = "product/get-100-rs-schemes",
  getTopPerformers = "product/get-top-performers",

  /* =========================
     TRANSACTIONS
  ========================== */
  getSchemeFolios = "transact/get-scheme-folios",
  getMandateList = "transact/get-mandate-list",
  sipPurchaseRedemption = "transact/sip-purchase-redemption",
  swp = "transact/swp",
  switch = "transact/switch",
  stp = "transact/stp",

  /* =========================
     BANKS / MANDATES
  ========================== */
  fetchBankByIfsc = "banks/fetch-bank-via-ifsc",
  addBank = "banks/add-bank",
  verifyBank = "banks/verify-bank",
  uploadProof = "banks/upload-proof",
  createMandate = "mandates/create-mandate",
  fetchBankViaIfsc = "banks/fetch-bank-via-ifsc",

  /* =========================
     ORDERS
  ========================== */
  getSipOrders = "orders/get-sip-orders",
  getSwpOrders = "orders/get-swp-orders",
  getSipOrdersDetails = "orders/get-sip-orders-details",
  getSwpOrdersDetails = "orders/get-swp-orders-details",
  getSipInstallmentDetails = "orders/get-sip-installment-details",
  getSwpInstallmentDetails = "orders/get-swp-installment-details",
  getPurchaseOrdersDetails = "orders/get-purchase-orders-details",
  getAllRedemptionOrders = "orders/get-all-redemption-orders",
  getRedemptionOrderDetails = "orders/get-redemption-order-details",
  cancelXsipOrder = "orders/cancel-xsip-order",
  cancelSwpOrder = "orders/cancel-swp-order",
  getTransactionHistory = "orders/get-transaction-history",
  getPurchaseOrders = "orders/get-purchase-orders",

  /* =========================
     REPORTS
  ========================== */
  sipStpSwpReport = "reports/sip-stp-swp-report",
  getFolioStatements = "reports/get-folio-statements",
  getElssStatements = "reports/get-elss-statements",
  getDividendStatement = "reports/get-dividend-statement",
  requestPortfolioStatement = "reports/request-portfolio-statement",
  requestCapitalGainsStatement = "reports/request-capital-gains-statement",

  /* =========================
     PORTFOLIO REVIEW
  ========================== */
  getUnderwatchSchemes = "portfolio-review/get-underwatch-schemes",
  getRedemptionRecommendedSchemes = "portfolio-review/get-redemption-recommended-schemes",
  getSatisfactoryPerformanceSchemes = "portfolio-review/get-satisfactory-performance-schemes",
  getSwitchSchemes = "portfolio-review/get-switch-schemes",
  getSchemePerformanceSummary = "portfolio-review/get-scheme-performance-summary",
  getPortfolioExpert = "portfolio-review/get-portfolio-expert",
  getSchemesPerformance = "portfolio-review/get-schemes-performance",
  getNotes = "portfolio-review/get-notes",

  /* =========================
     CONTENT
  ========================== */
  getHelpandSupport = "content/get-help-support",
  getAboutUs = "content/get-about-us",
  getPrivacyPolicy = "content/get-privacy-policy",
  getTermsAndConditions = "content/get-terms-condition",
  tempOnboarding = "content/temp-onboarding",
  rateRm = "content/rate-rm",

  /* =========================
     NFO
  ========================== */
  liveNfo = "nfo/live-nfo",

    /* =========================
     KYC
  ========================== */
  checkKycStatus = "kyc/status",
  initiateKyc = "kyc/initiate",
  fetchData = "kyc/fetch-data",


   /* =========================
     UCC
   ========================== */
   initiateUcc = "ucc/initiate",
   tempSaveUcc = "ucc/temp-save",
   getPincodeDetails = "ucc/get-pincode-details",
   getKycData="ucc/get-kyc-data",
   saveBankProof="ucc/save-bank-proof",
   submit = "ucc/submit",
   getKycUpdate="ucc/get-kyc-update",
   getUccUpdate="ucc/get-ucc-update",

}
