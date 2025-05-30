import NavBar from "../components/Navbar";
import icici from "../assets/img/bank-logo/icici.png"
import { ArrowDownCircleFill, ArrowDownUp, ArrowUpCircleFill, CurrencyRupee } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import { familyDataType, familySnapshotResponseType } from "./data-interfaces/dashboard";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { currentDateInStringNumber } from "../services/dates/dateFormater";
import { getPercentageValue } from "../services/calculation/percentageCalculate";

const Portfolio = () => {
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  const [familySnapShotData, setFamilySnapShotData] = useState<familyDataType>({
    Totalpurchase: '',
    Totalmarketvalue: 0,
    Finaldays: 0,
    Finalcagr: '',
    Totaldayschange: 0,
    Gainloss: 0,
    Dividend: 0,
    debtPercentFinal: '',
    goldPercentFinal: '',
    equityPercentFinal: ''
  })


  useEffect(() => {
    familyPortfolio()
  }, [])

  const familyPortfolio = async () => {
    const pan = localStorage.getItem("pan")
    if (pan) {
      const res = await postRequest<familySnapshotResponseType>(endPoints.getFamilySnapshot, {
        pan
      });
      if (res) {
        setFamilySnapShotData(res.finalArray)
      }
    }
  }


  return (
    <>
      <NavBar />


      <div className="container py-2 mt-4">
        <div className="personal_form_container">
          <div className="borderColor p-3 rounded-4 bg-white">
            <div className="row text-center">
              <div className="col">
                <small className="fw-semibold">OVERALL PROFIT</small> <span className="fs12px ms-1" > As on {currentDateInStringNumber()}</span>
              </div>
              <h3 className="fw-bold congratesColor"><CurrencyRupee className="mb-1" />{familySnapShotData.Totalmarketvalue.toLocaleString("en-In")}<small className="fs-6 congratesColor" >({getPercentageValue(Number(familySnapShotData.Totalpurchase), familySnapShotData.Gainloss)}%)</small></h3>
              <div className="textColor">1 Day change
                {familySnapShotData.Totaldayschange > 0 ?
                  <span className="congratesColor"> <ArrowUpCircleFill /><CurrencyRupee className="mb-1" />{familySnapShotData.Totaldayschange.toLocaleString("en-In")} ({getPercentageValue(Number(familySnapShotData.Totalpurchase), familySnapShotData.Totaldayschange)}%)</span> :
                  <span className="errorColor2"><ArrowDownCircleFill /><CurrencyRupee className="mb-1" />{familySnapShotData.Totaldayschange.toLocaleString("en-In")} ({getPercentageValue(Number(familySnapShotData.Totalpurchase), familySnapShotData.Totaldayschange)}%)</span>
                }
              </div>
            </div>
            <hr />
            <div className="row  mt-1">
              <div className="col-6 text-end ">
                <small className="fs14px">Investment</small><br />
                <small className="fs16px"><CurrencyRupee className="mb-1" />{Number(familySnapShotData.Totalpurchase).toLocaleString("en-In")} </small>
              </div>
              <div className="col-5 text-start ">
                <small className="fs14px">Current Value</small><br />
                <small className="fs16px"><CurrencyRupee className="mb-1" />{familySnapShotData.Totalmarketvalue.toLocaleString("en-In")} </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-2 personal_form_container">
        <div className="row ">
          <div className="col-6 text-start"><h6 >OVERALL PROFIT</h6> </div>
          <div className="col-6 text-end">              <button type="button" className="btn gainLossBtn ">Gain/Loss <ArrowDownUp />
            {/* &#x25B2;
<br/>
<small>&#x25BC;</small> */}
          </button></div>
        </div>
      </div>
      <div className="container py-2">
        <div className="personal_form_container">
          <div className="borderColor p-3 rounded-4 bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Folio:32352612</p>
                </div>
              </div>

            </div>
            <hr />
            <div className="row text-start mt-2">
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Invested</small><br />
                <small> <CurrencyRupee className="mb-1" />124.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Current Value</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Gain/Loss</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small> <small className="fs12px congratesColor">22.63%</small>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="borderColor p-3 rounded-4 bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Folio:32352612</p>
                </div>
              </div>

            </div>
            <hr />
            <div className="row text-start mt-2">
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Invested</small><br />
                <small> <CurrencyRupee className="mb-1" />124.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Current Value</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Gain/Loss</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small> <small className="fs12px congratesColor">22.63%</small>
              </div>
            </div>
          </div>



        </div>
      </div>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default Portfolio;
