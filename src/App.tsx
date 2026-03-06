import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TermsAndConditions from "./components/TermsAndConditions";
import PersonalDetails from "./pages/ucc/Personal-details";
import Declaration from "./pages/ucc/Declaration";
import AddressDetails from "./pages/ucc/Address-details";
import NominationDetails from "./pages/ucc/Nomination-details";
import ProofIdentity from "./pages/ucc/proof-identity";
import ProofIdentity2 from "./pages/ucc/proof-identity2";
import DigitalSignature from "./pages/ucc/digital-signature";
import E_Sign from "./pages/ucc/e-sign";
import SuccessPage from "./pages/congratulation";
import KycStatusCheck from "./pages/ucc/kyc-status-check";
import "./assets/css/style.css";
import "./assets/css/media.css";
import Otp from "./pages/Otp";
import PanVarification from "./pages/ucc/PanVarification";
import Dashboard from "./pages/Dashboard";
import EmergencyFunds from "./pages/EmergencyFund";
import RecommendedFunds from "./pages/RecommendedFunds";
import TaxSaving from "./pages/TaxSaving";
import NFOLive from "./pages/NFOLive";
import NFOApply from "./pages/NFOApply";
import PortfolioReview from "./pages/PortfolioReview";
import BankDetailsVarification from "./pages/ucc/bank-details-varification";
import NominationList from "./pages/ucc/Nomination-List";
import PortfolioImport from "./pages/PortfolioImport";
import PortfolioUnderReview from "./pages/PortfolioUnderReview";
import Portfolio from "./pages/Portfolio";
import Explore from "./pages/explore";
import AllMutualFunds from "./pages/All-Mutual-Funds";
import FundDetails from "./pages/Fund-Details";
import Account from "./pages/account";
import GoalPlanning from "./pages/planning/GoalPlanning";
import GoalSummary from "./pages/planning/GoalSummary";
import Goal from "./pages/planning/Goal";
import GoalResult from "./pages/planning/GoalResult";
import CalculatorList from "./pages/calculator/CalculatorList";
import SipCalculator from "./pages/calculator/SipCalculator";
import CustomGoal from "./pages/planning/CustomGoal";
import MarriageCalculator from "./pages/calculator/MarriageCalculator";
import EducationCalculator from "./pages/calculator/EducationCalculator";
import FutureValueCalculator from "./pages/calculator/FutureValueCalculator";
import RetirementCalculator from "./pages/calculator/RetirementCalculator";
import EmiCalculator from "./pages/calculator/EmiCalculator";
import FDCalculator from "./pages/calculator/FDCalculator";
import ElssCalculator from "./pages/calculator/ElssCalculator";
import SWPCalculator from "./pages/calculator/SWPCalculate";
import RecommendedSchemeGoal from "./pages/planning/RecommendedSchemeGoal";
import RiskProfile from "./components/RiskProfile";
import { ToastContainer } from "react-toastify";
import RiskResult from "./components/Risk-result";
import Profile from "./components/Profile";
import LocateUs from "./components/Locate-us";
import AboutUs from "./components/About-Us";
import PrivacyPolicyComponent from "./components/privacyPolicy";
import AllOrders from "./components/All-orders";
import OrderDetails from "./pages/orders/SipInstallmentDetails";
import SIPOrderDetails from "./pages/orders/Sip-order-details";
// import STPOrderDetails from "./pages/orders/Stp-order-details";
import SWPOrderDetails from "./pages/orders/SwpOrderDetails";
import LinkedBankAccount from "./components/Linked-BankAccount";
import AddBankAccount from "./components/Add-bank-account";
import AddBankDetails from "./components/add-bank-details";
import AddAccountVerification from "./components/bank-account-verification";
import ChangePassword from "./components/Change-Password";
import HelpSupport from "./components/help-and-support";
import Statements from "./components/Statements";
import MyProfile from "./components/Profile-details";
import Loader from "./services/Loader/Loader";
import { LoaderProvider, useLoader } from "./context/LoaderContext";
import { registerLoaderCallbacks } from "./services/Loader/LoaderController";
import { useEffect } from "react";
import StateFolioDetails from "./components/statement-folio-details";
import useAuthRedirect from "./services/user/useAuthRedirect";
import SighnUp from "./pages/Sign-up";
import SifFunds from "./pages/SifFunds";
import FundWithh100 from "./pages/FundWith100";
import PurchaseDetails from "./pages/orders/PurchaseDetails";
import RedemptionDetails from "./pages/orders/RedemptionDetails";
import SwpInstallmentDetails from "./pages/orders/SwpInstallmentDetails";
import TransactionHistory from "./pages/orders/TransactionHistory";
import WhatIsMfSavings from "./pages/mfSavings/What-is-mf-savings";
import ManualSurplusCalculator from "./pages/mfSavings/ManualSurplusCalculator";
import MfSavingDashboard from "./pages/mfSavings/MfSavingDashboard";
import MfSavingAccount from "./pages/mfSavings/MfSavingAccount";
import TargetAmountSIPCalculator from "./pages/calculator/TargetAmountCalculator";
import SipWithAnnualIncrease from "./pages/calculator/SipWithAnnualIncrease";
import AnnualSipCalculator from "./pages/calculator/AnnualSipCalculator";
import CostOfDelayInSipCalculator from "./pages/calculator/CostOfDelayInSipCalculator";
import BankDetailsForm from "./pages/ucc/Bank-Details-form";
import BankAndMandateList from "./components/Bank-and-mandate-list";
import MinorKycCheck from "./pages/ucc/Minor-kyc-check";
import AddFamilyMember from "./pages/ucc/Add-family-member";

const LoaderHandler = () => {
  const { showLoader, hideLoader } = useLoader();

  useAuthRedirect()
  useEffect(() => {
    registerLoaderCallbacks(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  return null;
};


function App() {

  return (
    <>

      <ToastContainer />
      <LoaderProvider>
        <LoaderHandler />
        <Loader />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/folio-details" element={<Account Component={StateFolioDetails} />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/pan-verification" element={<PanVarification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/address-details" element={<AddressDetails />} />
          <Route path="/bank-details-form" element={<BankDetailsForm />} />
          <Route path="/nomination-details" element={<NominationDetails />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/proof-identity" element={<ProofIdentity />} />
          <Route path="/proof-identity2" element={<ProofIdentity2 />} />
          <Route path="/digital-signature" element={<DigitalSignature />} />
          <Route path="/e-sign" element={<E_Sign />} />
          <Route path="/congratulation" element={<SuccessPage />} />
          <Route path="/emergency-funds" element={<EmergencyFunds />} />
          <Route path="/recommended-funds" element={<RecommendedFunds />} />
          <Route path="/tax-saving" element={<TaxSaving />} />
          <Route path="/nfo-live" element={<NFOLive />} />
          <Route path="/nfo-apply" element={<NFOApply />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          {/* <Route path="/add-family-member" element={<AddFamilyMember />} /> */}
          <Route path="/portfolio-review" element={<PortfolioReview />} />
          <Route path="/kyc-status-check" element={<KycStatusCheck />} />
          <Route
            path="/bank-details-verification"
            element={<BankDetailsVarification />}
          />
          <Route path="/nomination-list" element={<NominationList />} />

          <Route path="/portfolio-import" element={<PortfolioImport />} />
          <Route
            path="/portfolio-under-review"
            element={<PortfolioUnderReview />}
          />
          <Route
            path="/mf-saving-account"
            element={<MfSavingAccount />}
          />
          <Route path="/portfolio" element={<Portfolio />} />

          <Route path="/explore" element={<Explore />} />
          <Route path="/all-mutual-funds" element={<AllMutualFunds />} />
          <Route path="/fund-details" element={<FundDetails />} />
          {/* <Route path="/select-folio" element={<SelectFolio />} /> */}

          {/* account related pages */}
          <Route path="/my-profile" element={<Account Component={Profile} />} />
          <Route
            path="/profile-details"
            element={<Account Component={MyProfile} />}
          />
          <Route path="/locate-us" element={<Account Component={LocateUs} />} />
          <Route path="/about-us" element={<Account Component={AboutUs} />} />
          <Route
            path="/add-family-member"
            element={<Account Component={AddFamilyMember} />}
          />

          <Route
            path="/all-orders"
            element={<Account Component={AllOrders} />}
          />

          <Route
            path="/order-timeline"
            element={<Account Component={OrderDetails} />}
          />
          <Route
            path="/swp-installmet-details"
            element={<Account Component={SwpInstallmentDetails} />}
          />
          <Route
            path="/purchase-details"
            element={<Account Component={PurchaseDetails} />}
          />
          <Route
            path="/redemption-details"
            element={<Account Component={RedemptionDetails} />}
          />

          <Route
            path="/sip-order"
            element={<Account Component={SIPOrderDetails} />}
          />

          {/* <Route
            path="/stp-order"
            element={<Account Component={STPOrderDetails} />}
          /> */}

          <Route
            path="/swp-order"
            element={<Account Component={SWPOrderDetails} />}
          />

          <Route
            path="/linked-bank-account"
            element={<Account Component={LinkedBankAccount} />}
          />

          <Route
            path="/bank-and-mandate-list"
            element={<Account Component={BankAndMandateList} />}
          />

          <Route
            path="/add-bank-account-list"
            element={<Account Component={AddBankAccount} />}
          />

          <Route
            path="/add-bank-details"
            element={<Account Component={AddBankDetails} />}
          />

          <Route
            path="/add-verification-details"
            element={<Account Component={AddAccountVerification} />}
          />

          <Route
            path="/change-password"
            element={<Account Component={ChangePassword} />}
          />

          <Route
            path="/help-and-support"
            element={<Account Component={HelpSupport} />}
          />

          <Route
            path="/privacyPolicy"
            element={<Account Component={PrivacyPolicyComponent} />}
          />


          <Route
            path="/statements"
            element={<Account Component={Statements} />}
          />

          {/* account related pages end */}
          <Route path="/transaction-history" element={<TransactionHistory />} />

          <Route path="/goal-planning" element={<GoalPlanning />} />
          <Route path="/goal-summary" element={<GoalSummary />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/goal-result" element={<GoalResult />} />
          <Route path="/calculator-list" element={<CalculatorList />} />
          <Route path="/sip-calculator" element={<SipCalculator />} />
          <Route path="/marriage-calculator" element={<MarriageCalculator />} />
          <Route path="/sif-funds" element={<SifFunds />} />
          <Route path="/minor-kyc-check" element={<MinorKycCheck />} />
          <Route
            path="/manual-surplus-calculator"
            element={<ManualSurplusCalculator />}
          />
          <Route
            path="/mf-saving-dashboard"
            element={<MfSavingDashboard />}
          />
          <Route
            path="/education-calculator"
            element={<EducationCalculator />}
          />
          <Route
            path="/future-value-calculator"
            element={<FutureValueCalculator />}
          />
          <Route
            path="/retirment-calculator"
            element={<RetirementCalculator />}
          />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/fund-with-100" element={<FundWithh100 />} />
          <Route path="/fd-calculator" element={<FDCalculator />} />
          <Route path="/elss-calculator" element={<ElssCalculator />} />
          <Route path="/swp-calculator" element={<SWPCalculator />} />
          <Route path="/target-amount-sip-calculator" element={<TargetAmountSIPCalculator />} />
          <Route path="/sip-with-annual-increase-calculator" element={<SipWithAnnualIncrease />} />
          <Route path="/annual-sip-calculator" element={<AnnualSipCalculator />} />
          <Route path="/cost-of-delay-in-sip-calculator" element={<CostOfDelayInSipCalculator />} />
          <Route
            path="/recommended-scheme-goal"
            element={<RecommendedSchemeGoal />}
          />
          <Route path="/risk-profile" element={<RiskProfile />} />
          <Route path="/what-is-mf-savings" element={<WhatIsMfSavings />} />
          <Route path="/risk-result" element={<RiskResult />} />
          <Route path="/sign-up" element={<SighnUp />} />

          <Route path="/custom-goal" element={<CustomGoal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LoaderProvider>
    </>
  );
}

export default App;
