import NavBar from "../components/Navbar";
import icici from "../assets/img/bank-logo/icici.png"
import { ArrowDownCircleFill, ArrowDownUp, ArrowUpCircleFill, CurrencyRupee } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import { familyDataType, familySnapshotResponseType } from "./data-interfaces/dashboard";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { currentDateInStringNumber } from "../services/dates/dateFormater";
import { getPercentageValue, getValueInThousand } from "../services/calculation/percentageCalculate";
import { detailPortfolioSchemeType, detailPortfolioType } from "./data-interfaces/portfolio";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate()
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  const [portfolioDetailData, setPortfolioDetailData] = useState<detailPortfolioSchemeType[]>([])
  const [snapshotData, setSnapshotData] = useState<familyDataType>({
    Totalpurchase: 0,
    Totalmarketvalue: 0,
    Finaldays: 0,
    Finalcagr: "",
    Totaldayschange: 0,
    Gainloss: 0,
    Dividend: 0,
    debtPercentFinal: "",
    goldPercentFinal: "",
    equityPercentFinal: "",
    myPortfolio: false,
  })


  useEffect(() => {
    const pan = localStorage.getItem("pan")
    if (pan) {
      fetchFamilyPortfolio(pan)
      fetchDetailedPortfolio(pan)
    }
  }, [])

  const fetchFamilyPortfolio = async (pan: string) => {

    const res = await postRequest<familySnapshotResponseType>(endPoints.getFamilySnapshot, {
      pan
    });
    if (res) {
      let family = res.finalArray.filter((item) => item?.myPortfolio === true)
      setSnapshotData(family[0])
    }

  }
  const fetchDetailedPortfolio = async (pan: string) => {
    let reqBody = {
      name: "RAJKUMAR GUPTA",
      pan,
      gpan: ""
    }
    const res = await postRequest<detailPortfolioType>(endPoints.getDetailedPortfolio, reqBody);
    if (res) {
      console.log("res", res);

      setPortfolioDetailData(res.dataSent.data)
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
              <h3 className={`fw-bold ${snapshotData.Gainloss >= 0 ? "congratesColor" : "errorColor2"}`}><CurrencyRupee className="mb-1" />{Math.abs(snapshotData.Gainloss).toLocaleString("en-In")}<small className={`fs-6 ${snapshotData.Gainloss >= 0 ? "congratesColor" : "errorColor2"}`} >({snapshotData.Finalcagr}%)</small></h3>
              <div className="textColor">1 Day change
                {snapshotData.Totaldayschange >= 0 ?
                  <span className="congratesColor"> <ArrowUpCircleFill /><CurrencyRupee className="mb-1" />{snapshotData.Totaldayschange.toLocaleString("en-In")} ({getPercentageValue(Number(snapshotData.Totalpurchase), snapshotData.Totaldayschange)}%)</span> :
                  <span className="errorColor2"><ArrowDownCircleFill /><CurrencyRupee className="mb-1" />{snapshotData.Totaldayschange.toLocaleString("en-In")} ({getPercentageValue(Number(snapshotData.Totalpurchase), snapshotData.Totaldayschange)}%)</span>
                }
              </div>
            </div>
            <hr />
            <div className="row  mt-1">
              <div className="col-6 text-end ">
                <small className="fs14px">Investment</small><br />
                <small className="fs16px"><CurrencyRupee className="mb-1" />{Number(snapshotData.Totalpurchase).toLocaleString("en-In")} </small>
              </div>
              <div className="col-5 text-start ">
                <small className="fs14px">Current Value</small><br />
                <small className="fs16px"><CurrencyRupee className="mb-1" />{snapshotData.Totalmarketvalue.toLocaleString("en-In")} </small>
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

      {portfolioDetailData.length && portfolioDetailData.map((item) => {
        return (
          <div className="container py-2" onClick={()=>navigate("/fund-details")}>
            <div className="personal_form_container">
              <div className="borderColor p-3 rounded-4 bg-white">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="prod_icon_img">
                      {/* <img src={`${imageUrl+item.AMC_CODE}`} height={35} width={35} alt="" /> */}
                    </div>
                    <div className="ms-2 prod_icon_heading">
                      <h4>{item.scheme}</h4>
                      <p>Folio: {item.folio}</p>
                    </div>
                  </div>

                </div>
                <hr />
                <div className="row text-start mt-2">
                  <div className="col-md-4 py-2 py-md-0">
                    <small className="fs14px">Invested</small><br />
                    <small> <CurrencyRupee className="mb-1" />{getValueInThousand(Number(item.purchase))}K</small>
                  </div>
                  <div className="col-md-4 py-2 py-md-0">
                    <small className="fs14px">Current Value</small><br />
                    <small> <CurrencyRupee className="mb-1" />{getValueInThousand(Number(item.currentvalue))}K</small>
                  </div>
                  <div className="col-md-4 py-2 py-md-0">
                    <small className="fs14px">Gain/Loss</small><br />
                    <small> <CurrencyRupee className="mb-1" />{getValueInThousand(Number(item.gain))}K</small> <small className={`fs12px ${Number(item.finalcagr) > 0 ? "congratesColor" : "errorColor2"}`}>{item.finalcagr}%</small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
      })}


      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default Portfolio;
