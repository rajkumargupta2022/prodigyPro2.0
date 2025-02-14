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
import "./assets/css/style.css";
import "./assets/css/media.css";
import Otp from "./pages/Otp";
import PanVarification from "./pages/PanVarification";
import Dashboard from "./pages/Dashboard";
import EmergencyFunds from "./pages/EmergencyFund";
import AddFamilyMember from "./pages/Add-family-member";
import RecommendedFunds from "./pages/RecommendedFunds";
import TaxSaving from "./pages/TaxSaving";

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
          <Route path="/add-family-member" element={<AddFamilyMember />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
