import NavBar from "../../components/Navbar";
import { ChevronRight, CurrencyRupee, Dot } from "react-bootstrap-icons";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

import { useState } from "react";
import { currentDateInStringNumber } from "../../services/dates/dateFormater";
import PortfolioEmpty from "../PortfolioEmpty";
import { imageUrl } from "../../services/utils/urls";
import ManageBankAccounts from "./Components/ManageBankAccounts";

const ManualSurplusResult = () => {
  const [isEmergencyFund, setIsEmergencyFund] = useState<boolean>(true);
  const [openManageAccounts, setOpenManageAccounts] = useState<boolean>(false);
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

            <div className="col-lg-12 col-md-12">
              <button type="button" className={`${isEmergencyFund ? "customButton" : "customButtonNoBg"} px-4 mb-1`} onClick={() => handleTransactionType(true)}>Insights</button>
              <button type="button" className={`mx-3 ${isEmergencyFund ? "customButtonNoBg" : "customButton"} px-4 mb-1`} onClick={() => handleTransactionType(false)}>Investments</button>

              <div className="container py-2 mt-2 portfolio_sticky_2025">
                <div className="personal_form_container">

                  <div className="borderColor p-3 rounded-4 bg-white">
                    <div className="row text-center">
                      <div className="col">
                        <small className="fw-semibold">TOTAL BALANCE</small> <span className="fs12px ms-1" > As on {currentDateInStringNumber()}</span>
                      </div>
                      <h3 className={`fw-bold`}><CurrencyRupee className="mb-1 " />1,12,817.54</h3>

                    </div>
                    <div className="row justify-content-center">
                      <div className="col-lg-4 col-md-12">

                        <div className="d-flex justify-content-between ">
                          <small className="fs14px">EXPENSES</small>
                          <span className="fw-semibold">
                            4500
                          </span>
                        </div>

                        <hr className="my-2" />

                        <div className="d-flex justify-content-between ">
                          <small className="fs14px">Surplus</small>
                          <span className="fw-semibold">
                           5622
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>


                </div>
                <div className="col-lg-12 col-md-12 scheme-bg rounded-2">
                  <div className="d-flex align-items-center p-2 fs14px">
                    <p className="mb-0">
                      You just missed ₹17,000 in MF Savings returns!
                    </p>

                    <button className="customButton px-3 ms-auto crPointer" onClick={()=>setOpenManageAccounts(true)}>
                      Invest Surplus
                    </button>
                  </div>
                </div>
              </div>


            </div>
          </div>



          <div className="container py-2 crPointer" >
            <div className="personal_form_container">
              <h5 >My Accounts</h5>
              <div className="borderColor p-3 rounded-top-3 bg-white">

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="prod_icon_img">
                      <img src={`${imageUrl + 400027}.png`} className="logoRadius" height={40} width={40} alt="" />
                    </div>
                    <div className="ms-2 prod_icon_heading mt-1">
                      <h4>SBI....4649</h4>
                      <p ><small ><Dot className="fs-4 congratesColor" /></small>Last updated: 2 hours ago</p>
                    </div>
                  </div>

                </div>
                <div className="row justify-content-between mt-3">
                  <div className="col-lg-4 col-md-12">

                    <div className="d-flex justify-content-between ">
                      <small className="fs14px">Expenses</small>
                      <span className="fw-semibold text-black">
                        ₹45000
                      </span>
                    </div>

                    <hr className="my-2" />

                    <div className="d-flex justify-content-between ">
                      <small className="fs14px">Surplus</small>
                      <span className="fw-semibold text-black">
                        ₹1000
                      </span>
                    </div>

                  </div>
                </div>

              </div>
              <div className="col-lg-12 col-md-12 scheme-bg rounded-bottom p-0">
                <div className="d-flex align-items-center p-2 fs14px">
                  <p className="mb-0">
                    You just missed ₹750 in MF Savings returns!
                  </p>

                  <button className="customButton px-3 ms-auto">
                    Invest Surplus
                  </button>
                </div>
              </div>

               <div className="borderColor p-3 rounded-top-3 bg-white mt-3">

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="prod_icon_img">
                      <img src={`${imageUrl + 400013}.png`} className="logoRadius" height={40} width={40} alt="" />
                    </div>
                    <div className="ms-2 prod_icon_heading mt-1">
                      <h4>HDFC Bank....4560</h4>
                      <p ><small ><Dot className="fs-4 congratesColor" /></small>Last updated: 2 hours ago</p>
                    </div>
                  </div>

                </div>
                <div className="row justify-content-between mt-3">
                  <div className="col-lg-4 col-md-12">

                    <div className="d-flex justify-content-between ">
                      <small className="fs14px">Expenses</small>
                      <span className="fw-semibold text-black">
                        ₹45000
                      </span>
                    </div>

                    <hr className="my-2" />

                    <div className="d-flex justify-content-between ">
                      <small className="fs14px">Surplus</small>
                      <span className="fw-semibold text-black">
                        ₹1000
                      </span>
                    </div>

                  </div>
                </div>

              </div>
              <div className="col-lg-12 col-md-12 scheme-bg rounded-bottom p-0">
                <div className="d-flex align-items-center p-2 fs14px">
                  <p className="mb-0">
                    You just missed ₹750 in MF Savings returns!
                  </p>

                  <button className="customButton px-3 ms-auto">
                    Invest Surplus
                  </button>
                </div>
              </div>

            </div>
          </div>

          <PortfolioEmpty title="Let’s get you started!" body="Link your bank account to see your balances, returns, and discover how your idle money can earn more." btnName="Give Consent" />
        </div>
      </div>


   <ManageBankAccounts show={openManageAccounts} setShow={setOpenManageAccounts}/>

      <Footer />
    </>
  );
};

export default ManualSurplusResult;
