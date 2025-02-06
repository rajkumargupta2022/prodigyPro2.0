import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PersonalDetails from "./pages/Personal-details";
import "./assets/css/style.css"
import "./assets/css/media.css"
import Otp from "./pages/Otp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/otp" element={<Otp />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
