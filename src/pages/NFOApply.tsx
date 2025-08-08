import NavBar from "../components/Navbar";
import sbi from "../assets/img/bank-logo/sbi.png"
import {  ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useState } from "react";
import BankMandate from "../components/BankMandate";
import InvestmentForm from "../components/InvestmentForm";

const NFOApply = () => {
  const [openBankMandate, setOpenBankMandate] = useState<boolean>(false)
 const [schemeList,setSchemeList] = useState([{
      "sipAllowed": true,
      "stpAllowed": false,
      "swpAllowed": false,
      "purchaseAllowed": false,
      "redemptionAllowed": true,
      "switchAllowed": true,
      "scheme": "Nippon India Power & Infra Fund(B)",
      "accordSchemeCode": 2450,
      "nseProductCode": "PSBP",
      "nseAMCCode": "NIPPONINDIAMUTUALFUND_MF",
      "amcCode": "RMF",
      "nseReinvestTag": "Z",
      "launchDate": "2004-05-08T00:00:00.000Z",
      "lockInPeriod": 0,
      "ISIN": "INF204K01AD2",
      "cnav": 341.44,
      "expenseRatio": 1.82,
      "planType": "NORMAL",
      "planOption": "Bonus",
      "equityType": "Sector Funds",
      "fundSize": 0,
      "minSIPAmt": 1000,
      "minLumSumAmt": 5000,
      "exitLoadPeriod": 1,
      "exitLoad": "1% on or before 1M, Nil after 1M",
      "sipDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "stpDateList": [],
      "swpDateList": [],
      "oneYearCAGR": -8.41,
      "threeYearCAGR": 30.57,
      "fiveYearCAGR": 31.48
    },
    {
      "sipAllowed": true,
      "stpAllowed": false,
      "swpAllowed": false,
      "purchaseAllowed": false,
      "redemptionAllowed": false,
      "switchAllowed": false,
      "scheme": "SBI Small Cap Fund-Reg(G)",
      "accordSchemeCode": 7885,
      "nseProductCode": "SB346G-GR-L1",
      "nseAMCCode": "SBIMUTUALFUND_MF",
      "amcCode": "L",
      "nseReinvestTag": "Z",
      "launchDate": "2009-09-08T18:30:00.000Z",
      "lockInPeriod": 0,
      "ISIN": "INF200K01T28",
      "cnav": 170.91,
      "expenseRatio": 1.57,
      "planType": "NORMAL",
      "planOption": "Growth",
      "equityType": "Small cap Fund",
      "fundSize": 308287873000,
      "minSIPAmt": 1000,
      "minLumSumAmt": 5000,
      "exitLoadPeriod": 1,
      "exitLoad": "",
      "sipDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "stpDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "swpDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "oneYearCAGR": -7.02,
      "threeYearCAGR": 16.92,
      "fiveYearCAGR": 27.35
    }])
  // const handleBankMandate = () => {
  //   setOpenBankMandate(true)
  // }

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor">Home  <ChevronRight className="fs12px" /> NFO Live <ChevronRight className="fs12px" /><small className="greyColor"> Kotak Nifty Small Cap 250 Index Fund - Regular (G) </small> </h6>
          </div>
          <div className="col-12 d-flex align-items-start">
            <img src={sbi} alt="" />
            <div className="d-flex flex-column ps-3">
              <h4 className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</h4>
              <small className="fs12px">Equity: Small Cap</small>
            </div>
          </div>
          <div className="col-8">
            <div className="col-12 bg-white rounded-2 p-2 px-2 mt-4">
              <small className="fs14px">Nav</small><br />
              <small><CurrencyRupee className="" />100</small>
            </div>
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h6>Fund Detail</h6>
                <div className="col-6">
                  <p className="m-0 fs12px"> LAUNCHED</p>
                  <small className="fs14px text-dark">20 jan 2025</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> END DATE</p>
                  <small className="fs14px text-dark">22 Jan 2025</small>
                </div>
              </div>

              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> ALLOTMENT DATE</p>
                  <small className="fs14px text-dark">25 Jan 2025</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> MIN. INVESTMENT</p>
                  <small className="fs14px text-dark"><CurrencyRupee className="" />100</small>
                </div>
              </div>
              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> PLAN TYPE</p>
                  <small className="fs14px text-dark">Regular</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> PLAN OPTION</p>
                  <small className="fs14px text-dark">GROTH</small>
                </div>
              </div>
              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> Withdrawal Charges</p>
                  <small className="fs14px text-dark">0%</small>
                </div>

              </div>

            </div>
          </div>
         <InvestmentForm schemeList={schemeList} setSchemeList={setSchemeList}/>
        </div>
      </div>


      <BankMandate show={openBankMandate} setShow={setOpenBankMandate}schemeList={schemeList}  setSchemeList={setSchemeList} isSipTransaction={false}/>
    </>
  );
};

export default NFOApply;
