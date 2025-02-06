import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./assets/css/style.css"
import "./assets/css/media.css"
import Otp from "./pages/Otp";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/otp" element={<Otp />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
