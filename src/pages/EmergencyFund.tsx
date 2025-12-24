import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import RecomendedSchemes from "../components/Recomended-schemes";
import { endPoints } from "../services/utils/urls";
import EmergencyInvestments from "./mfSavings/EmergencyInvestments";
import { useState } from "react";

const EmergencyFund = () => {
  const [isEmergencyFund, setIsEmergencyFund] = useState<boolean>(true);
  //  const isEmergencyFund = true
  const handleTransactionType = (value: boolean) => {
    setIsEmergencyFund(value);
 
  }


  return (
    <>
      <NavBar />

      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" ><Link to={"/dashboard"}>Home</Link> <small className="greyColor"> <ChevronRight className="fs14px" /> Emergency Fund</small> </h6>
          </div>
          <div className="row">

            <div className="col-lg-6 col-md-12">
              <button type="button" className={`${isEmergencyFund ? "customButton" : "customButtonNoBg"} px-4 mb-1`} onClick={() => handleTransactionType(true)}>Explore funds</button>
              <button type="button" className={`mx-3 ${isEmergencyFund ? "customButtonNoBg" : "customButton"} px-4 mb-1`} onClick={() => handleTransactionType(false)}>Emergency Portfolio</button>
              {isEmergencyFund &&
                <p className="small">Park your surplus money in liquid/overnight funds for flexibility, safety, liquidity, and better returns than your traditional savings account. Ideal for short-term goals and emergency funds.
                  With the Insta redemption feature, you can get an instant redemption from these funds up to ₹50,000 or 90% of your investment value, whichever is lower.</p>}
            </div>
          </div>
        </div>
      </div>
      {
        isEmergencyFund ? <RecomendedSchemes from={"Emergency"} url={endPoints.getEmergencyFunds} /> : <EmergencyInvestments />
      }
      <Footer />
    </>
  );
};

export default EmergencyFund;
