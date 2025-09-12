import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import RecomendedSchemes from "../components/Recomended-schemes";
import { endPoints } from "../services/utils/urls";

const EmergencyFund = () => {
  const navigate = useNavigate()



  return (
    <>
      <NavBar />

      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" onClick={() => navigate("/dashboard")}>Home <small className="greyColor"> <ChevronRight className="fs14px" /> Emergency Fund</small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>Emergency Fund</h4>
              <p className="small">Park your surplus money in liquid funds for flexibility, safety, and better returns than traditional savings accounts. Ideal for short-term goals and emergency funds!</p>
            </div>
          </div>
        </div>
      </div>
      <RecomendedSchemes  from={"Emergency"} url={endPoints.getEmergencyFunds}/>

      <Footer />
    </>
  );
};

export default EmergencyFund;
