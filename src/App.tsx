import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PersonalDetails from "./pages/Personal-details";
import Declaration from "./pages/Declaration";
import AddressDetails from "./pages/Address-details";
import BankDetails from "./pages/Bank-Details";
import NominationDetails from "./pages/Nomination-details";
import ProofIdentity from "./pages/proof-identity";
import ProofIdentity2 from "./pages/proof-identity2";
import DigitalSignature from "./pages/digital-signature";
import E_Sign from "./pages/e-sign";
import SuccessPage from "./pages/congratulation";
import KycStatusCheck from "./pages/kyc-status-check";
import "./assets/css/style.css";
import "./assets/css/media.css";
import Otp from "./pages/Otp";
import PanVarification from "./pages/PanVarification";
import Dashboard from "./pages/Dashboard";
import EmergencyFunds from "./pages/EmergencyFund";
import AddFamilyMember from "./pages/Add-family-member";
import RecommendedFunds from "./pages/RecommendedFunds";
import TaxSaving from "./pages/TaxSaving";
import NFOLive from "./pages/NFOLive";
import NFOApply from "./pages/NFOApply";
import PortfolioReview from "./pages/PortfolioReview";
import BankDetailsVarification from "./pages/bank-details-varification";
import NominationList from "./pages/Nomination-List";
import KnowYourRiskProfile from "./pages/Know-Your-Risk-Profile";
import PortfolioImport from "./pages/PortfolioImport";
import PortfolioUnderReview from "./pages/PortfolioUnderReview";
import Portfolio from "./pages/Portfolio";
import Explore from "./pages/explore";
import AllMutualFunds from "./pages/All-Mutual-Funds";
import FundDetails from "./pages/Fund-Details";
import Account from "./pages/account";
import PortfolioEmpty from "./pages/PortfolioEmpty";
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
import SWPCalculator from "./pages/calculator/SWPCAlculator";
import RecommendedSchemeGoal from "./pages/planning/RecommendedSchemeGoal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/pan-varification" element={<PanVarification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/address-details" element={<AddressDetails />} />
          <Route path="/bank-details" element={<BankDetails />} />
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
          <Route path="/add-family-member" element={<AddFamilyMember />} />
          <Route path="/portfolio-review" element={<PortfolioReview />} />
          <Route path="/kyc-status-check" element={<KycStatusCheck />} />
          <Route
            path="/bank-details-varification"
            element={<BankDetailsVarification />}
          />
          <Route path="/nomination-list" element={<NominationList />} />
          <Route
            path="/know-your-risk-profile"
            element={<KnowYourRiskProfile />}
          />
          <Route path="/portfolio-import" element={<PortfolioImport />} />
          <Route
            path="/portfolio-under-review"
            element={<PortfolioUnderReview />}
          />
          <Route path="/portfolio" element={<Portfolio />} />

          <Route path="/explore" element={<Explore />} />
          <Route path="/all-mutual-funds" element={<AllMutualFunds />} />
          <Route path="/fund-details" element={<FundDetails />} />
          {/* <Route path="/select-folio" element={<SelectFolio />} /> */}
          <Route path="/account" element={<Account />} />
          <Route path="/portfolio-empty" element={<PortfolioEmpty />} />
          <Route path="/goal-planning" element={<GoalPlanning />} />
          <Route path="/goal-summary" element={<GoalSummary />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/goal-result" element={<GoalResult />} />
          <Route path="/calculator-list" element={<CalculatorList />} />
          <Route path="/sip-calculator" element={<SipCalculator />} />
          <Route path="/marriage-calculator" element={<MarriageCalculator />} />
          <Route path="/education-calculator" element={<EducationCalculator />} />
          <Route path="/future-value-calculator" element={<FutureValueCalculator />} />
          <Route path="/retirment-calculator" element={<RetirementCalculator />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/fd-calculator" element={<FDCalculator />} />
          <Route path="/elss-calculator" element={<ElssCalculator />} />
          <Route path="/swp-calculator" element={<SWPCalculator />} />
          <Route path="/recommended-scheme-goal" element={<RecommendedSchemeGoal />} />
          <Route path="/custom-goal" element={<CustomGoal />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
