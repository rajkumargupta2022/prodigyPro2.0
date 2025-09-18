import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import {  Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import RecomendedSchemes from "../components/Recomended-schemes";
import { endPoints } from "../services/utils/urls";

const TaxSaving = () => {
  const navigate = useNavigate()
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  // const handleSchemeDetail = () => {
  //   setOpenSchemeDetail(true)
  // }
  return (
    <>
      <NavBar />
    
    
      <div className="container pt-2">
        <div className="personal_form_container">
        <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" ><Link to={"/dashboard"}>Home</Link> <small className="greyColor"> <ChevronRight className="fs12px bold" /> Tax Saving</small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>Recommended Funds</h4>
              <p className="fs14px">Invest in tax-saving funds and enjoy dual benefits—tax deductions and long-term financial growth.</p>
            </div>
          </div>
        </div>
      </div>
       <RecomendedSchemes  from={"Tax Saving"} url={endPoints.getTaxPlanningScheme}/>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default TaxSaving;
