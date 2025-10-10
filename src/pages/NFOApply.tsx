import NavBar from "../components/Navbar";
import {  ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useState } from "react";
// import BankMandate from "../components/BankMandate";
// import InvestmentForm from "../components/InvestmentForm";
// import { nfoLiveKey } from "./data-interfaces/nfo";
import { useLocation } from "react-router-dom";
import { dateInStringNumber } from "../services/dates/dateFormater";
import InvestmentForm from "../components/InvestmentForm";
import { schemeDeatilDataKeys } from "./data-interfaces/transact";
import { imageUrl } from "../services/utils/urls";

const NFOApply = () => {
  const location = useLocation()
 const [schemeList,setSchemeList] = useState<schemeDeatilDataKeys[]>([location.state])
 


  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor">Home  <ChevronRight className="fs12px" /> NFO Live <ChevronRight className="fs12px" /><small className="greyColor"> Kotak Nifty Small Cap 250 Index Fund - Regular (G) </small> </h6>
          </div>
          <div className="col-12 d-flex align-items-start">
            <img src={imageUrl+schemeList[0].accordAMCCode+".png"} alt="" className="rounded" height={50} width={50}/>
            <div className="d-flex flex-column ps-3">
              <h4 className="mb-0">{schemeList[0].scheme}</h4>
              <small className="fs12px">{schemeList[0].equityType}</small>
            </div>
          </div>
          <div className="col-8">
            <div className="col-12 bg-white rounded-2 p-2 px-2 mt-4">
              <small className="fs14px">Nav</small><br />
              <small><CurrencyRupee className="" />{schemeList[0].cnav}</small>
            </div>
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h6>Fund Detail</h6>
                <div className="col-6">
                  <p className="m-0 fs12px"> LAUNCHED</p>
                  <small className="fs14px text-dark">{dateInStringNumber(schemeList[0].launchDate)}</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> END DATE</p>
                  <small className="fs14px text-dark">{dateInStringNumber(schemeList[0].nfo_close_date)}</small>
                </div>
              </div>

              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> ALLOTMENT DATE</p>
                  <small className="fs14px text-dark">{schemeList[0].nfo_allotment_date?dateInStringNumber(schemeList[0].nfo_allotment_date):"N/A"}</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> MIN. INVESTMENT</p>
                  <small className="fs14px text-dark"><CurrencyRupee className="" />{schemeList[0].sipAllowed ? schemeList[0].minSIPAmt:schemeList[0].purchaseAllowed&&schemeList[0].minLumSumAmt}</small>
                </div>
              </div>
              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> PLAN TYPE</p>
                  <small className="fs14px text-dark">{schemeList[0].planType}</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> PLAN OPTION</p>
                  <small className="fs14px text-dark">{schemeList[0].planOption}</small>
                </div>
              </div>
              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> Exit load</p>
                  <small className="fs14px text-dark">{schemeList[0]?.exitLoad?schemeList[0]?.exitLoad+"%":"Nill"}</small>
                </div>

              </div>

            </div>
          </div>
         <InvestmentForm schemeList={schemeList} setSchemeList={setSchemeList} sipDateList={schemeList[0]?.sipDateList}/>
        </div>
      </div>


     
    </>
  );
};

export default NFOApply;
