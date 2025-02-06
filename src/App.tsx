import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PersonalDetails from "./pages/Personal-details";
import Declaration from "./pages/Declaration";
import AddressDetails from "./pages/Address-details";
import BankDetails from "./pages/Bank-Details";
import NominationDetails from "./pages/Nomination-details";
import "./assets/css/style.css";
import "./assets/css/media.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/address-details" element={<AddressDetails />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/nomination-details" element={<NominationDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
