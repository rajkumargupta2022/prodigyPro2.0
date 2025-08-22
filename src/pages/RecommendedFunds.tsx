import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import { useNavigate } from "react-router-dom";
import RecomendedSchemes from "../components/Recomended-schemes";

const RecommendedFunds = () => {
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
            <h6 className="logoBlueColor crPointer" onClick={()=>navigate("/dashboard")}>Home <small className="greyColor"> <ChevronRight className="fs14px" /> Recommended Funds </small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>Recommended Funds</h4>
              <p className="fs14px">Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!</p>
            </div>
          </div>
          <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">Risk Profile</small>
              <div className="">
                <button type="button" className="btn riskProfileBtn">Conservative</button>
                <button type="button" className="btn riskProfileBtn mx-1">Moderate</button>
                <button type="button" className="btn riskProfileBtn mx-1">Aggressive</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">Investment horizon</small>
              <div className="">
                <button type="button" className="btn riskProfileBtn">Upto 1 Yr</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 3 Yrs</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 5Yrs</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 8 Yrs</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 10 Yrs</button>
              </div>
            </div>
          </div>

        </div>
      </div>
        <RecomendedSchemes  from={"emergency"}/>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default RecommendedFunds;
