import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PersonalDetails from "./pages/Personal-details";
import "./assets/css/style.css"
import "./assets/css/media.css"
import Otp from "./pages/Otp";
import PanVarification from "./pages/PanVarification";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/otp" element={<Otp />}/>
          <Route path="/pan-varification" element={<PanVarification />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
