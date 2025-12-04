import { Container } from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import MyStackBar from "../components/Stack-bar";
import { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../services/Api/HandleApi";
import { foliosResponse, navHistoryResponse, schemeDeatilDataKeys, schemeDetailType } from "./data-interfaces/transact";
import { endPoints, imageUrl } from "../services/utils/urls";
import { dateInStringNumber } from "../services/dates/dateFormater";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Footer from "../components/Footer";
import { getPercentageValue, getValueInSort } from "../services/calculation/percentageCalculate";
import InvetmentConfirmation from "../components/InvestmentConfirmation";
import { fetchAdminUser } from "../services/user/adminUser";
import SelectFolioPopup from "../components/select-folio-popup";
import InvestmentForm from "../components/InvestmentForm";
import SwitchSchemeModel from "../components/SwitchStpSchemeModel";
import RedumptionConfirmation from "../components/RedumptionConfirmation";
import { checkIsSIFScheme, checkTransactionAllowed } from "../services/utils/services";
import { keys } from "../services/utils/keys";
import { detailPortfolioSchemeType } from "./data-interfaces/portfolio";
import SwpConfirmation from "../components/Swp-confirmation";
import MsgModel from "../components/MsgModel";
import InstaRedeem from "./mfSavings/InstaRedeem";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}
interface monthKeys {
  value: number;
  label: string;
}

const FundDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openSelectFolio, setOpenSelectFolio] = useState<boolean>(false)
  const [transactionType, setTransactionType] = useState<string>("Switch")
  const [openSwpModel, setOpenSwpModel] = useState<boolean>(false)
  const [openInvestPopup, setOpenInvestPopup] = useState(false)
  const [schemeList, setSchemeList] = useState<schemeDeatilDataKeys[]>([])
  const [show, setShow] = useState(false);
  const [navDate, setNavDate] = useState<string[]>([])
  const [navValue, setNavValue] = useState<number[]>([])
  const [duration, setDuration] = useState<number>(12)
  const [cagr, setCagr] = useState<number>(0)
  const [schmeDetail, setSchmeDetail] = useState<detailPortfolioSchemeType[]>([location.state])

  const [sipDateList, setSipDateList] = useState<number[]>([])
  const [openSwitchSchemeModel, setOpenSwitchSchemeModel] = useState<boolean>(false)
  const [openRedumptionModel, setOpenRedumptionModel] = useState<boolean>(false)
  const [openMsgModel, setOpenMsgModel] = useState<boolean>(false)
  const [openInstaRedeem, setOpenInstaRedeem] = useState<boolean>(false)
  const [monthList, setMonthList] = useState<monthKeys[]>([])



  const state: ChartState = {
    series: [
      {
        name: "₹ ",
        data: navValue,
      },
    ],
    options: {
      chart: {

        height: 350,
        type: "area",
        background: "transparent",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: [2], // ✅ Custom width (3px for first line, 2px for second line)
        colors: ["#357AF6"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.2, // keep it light
          opacityFrom: 0.3,    // start opacity (near line)
          opacityTo: 0.0,      // fade to transparent
          stops: [0, 90, 100], // control spread of gradient
          colorStops: [
            {
              offset: 0,
              color: "#357AF6",
              opacity: 0.25,
            },
            {
              offset: 100,
              color: "#357AF6",
              opacity: 0,
            },
          ],
        },
      },

      xaxis: {
        categories: navDate,
        labels: {
          show: false, // ❌ Hide date labels
        },
        axisBorder: {
          show: false, // ❌ Hide bottom axis line
        },
        axisTicks: {
          show: false, // ❌ Hide tick marks
        },// ✅ Custom X-axis labels


      },

      yaxis: {
        labels: {
          show: false, // ❌ Hide Y-axis labels
        },
        axisBorder: {
          show: false, // ❌ Hide Y-axis line
        },
        axisTicks: {
          show: false, // ❌ Hide Y-axis ticks
        },
      },

      grid: {
        show: false, // ✅ Removes background grey lines
      },

      tooltip: {

        custom: function ({ series, seriesIndex, dataPointIndex }) {
          const maturityAmount = series[seriesIndex][dataPointIndex];
          const date = navDate[dataPointIndex];

          return `
          <div style="padding: 10px; background: white; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); font-family: sans-serif; text-align: center;">
          
            <div style="font-size: 14px; color: #333;">${dateInStringNumber(date)}</div>
            <div style="font-size: 14px; color: #333;"> ₹${maturityAmount.toLocaleString('en-IN')}</div>
          </div>
        `;
        }
      }
    },
  };




  useEffect(() => {
    if (location?.state?.accordSchemeCode) {
      fetchSchemeDetail()
      handleMinAmount()
      fetchFolios()
    } else {
      if (location?.state?.fromPortfolio) {
        navigate("/portfolio")
      } else {
        navigate("/all-mutual-funds")
      }
    }

  }, [])

  const fetchSchemeDetail = async () => {
    try {
      const res = await postRequest<schemeDetailType>(endPoints.getSchemeDetails, { productcode: location.state.accordSchemeCode })
      const updated = res.data.map(obj => ({
        ...obj,
        firstSIPToday: true,
        to_date: "",
        from_date: "",
        mandateId: "",
        amount: 0,
        totalAmount: 0
      }));

      setSchemeList([...updated])

      setSipDateList([...res.data[0].sipDateList])
      const monthForMap = [1, 3, 6, 12, 36, 60]
      let monthData: monthKeys[] = []
      const month = getMonthsSinceLaunch(res.data[0].launchDate)
      console.log("111");
      
      monthForMap.forEach((item) => {
        if (month >= item) {
          monthData.push({ value: item, label: (item >= 12 ? (item / 12) + "Y" : item + "M") })
        }
      })
      monthData.push({ value: -1, label: "Max" })
      fetchNavHistory(monthData[Math.floor(monthData.length/2)]?.value)
      setMonthList(monthData)
      handleNearSipDate(res.data[0].sipDateList)

    } catch (err) {
      setSipDateList([])
      setSchemeList([])

    }
  }

  function getMonthsSinceLaunch(launchDateStr: string): number {
    const launchDate = new Date(launchDateStr);
    const today = new Date();

    let years = today.getFullYear() - launchDate.getFullYear();
    let months = today.getMonth() - launchDate.getMonth();

    let totalMonths = years * 12 + months;

    // If today's date is before launch day within the month, subtract 1
    if (today.getDate() < launchDate.getDate()) {
      totalMonths -= 1;
    }

    return totalMonths < 0 ? 0 : totalMonths; // never negative
  }

  const fetchNavHistory = async (durationMonth: number) => {
    try {
      const res = await postRequest<navHistoryResponse>(endPoints.getNavHistory, { productcode: location.state.accordSchemeCode, duration: durationMonth })
      setCagr(res.cagr)
      setNavDate(res.history.map(item => item.date))
     setDuration(durationMonth)
      setNavValue(res.history.map(item => parseFloat(Number(item.nav).toFixed(2))))
    } catch (err) {
      setNavDate([])

    }
  }


  const handleClick = () => {
    setShow(!show);
  };




  const fetchFolios = async () => {
    const adminUser = fetchAdminUser();

    if (!adminUser?.ucc || schemeList.length === 0) return;

    const reqBody = {
      ucc: adminUser.ucc,
      product_code: schemeList[0].accordSchemeCode,
    };

    try {
      const res = await postRequest<foliosResponse>(endPoints.getSchemeFolios, reqBody);

      const updatedList = [
        {
          ...schemeList[0],
          folioList: res.data || [],
        },
      ];

      setSchemeList([...updatedList]);
    } catch (error) {

      const updatedList = [
        {
          ...schemeList[0],
          folioList: [],
        },
      ];

      setSchemeList([...updatedList]);
    }

  };


  const handleNearSipDate = (dateList: number[]) => {
    const today = new Date();
    const currentDay = today.getDate();
    const sipDateNumbers = dateList?.map(Number);
    let nearestDate = sipDateNumbers?.find(date => date >= currentDay);
    if (!nearestDate) {
      nearestDate = sipDateNumbers[0];
    }


  }

  const handleMinAmount = () => {

    if (schemeList?.length > 0) {

      const updatedSchemes = schemeList.map((scheme) => {
        const minAmount = schemeList[0]?.sipAllowed ? scheme.minSIPAmt : scheme.minLumSumAmt;
        return {
          ...scheme,
          amount: minAmount,
        };
      });
      setSchemeList([...updatedSchemes]);
    }

  };

  const handleInvestMore = () => {
    setOpenInvestPopup(true)
  }

  const handleSwitch = (type: string) => {
    setTransactionType(type)
    setOpenSwitchSchemeModel(true)
    setShow(false)
  }
  const handleRedmptionModel = () => {
    const result = schemeList.find(item => checkIsSIFScheme(item.scheme));
    if (result) {
      setOpenMsgModel(true)
      setShow(false)
    } else {
      setOpenRedumptionModel(true)
      setShow(false)
    }
  }
  const handleSwp = () => {
    setOpenSwpModel(true)
    setShow(false)

  }
  const goTransactionHistory = (item: schemeDeatilDataKeys) => {
    navigate("/transaction-history", { state: { accord_product_code: item.accordSchemeCode, folio_number: location.state?.folio } })
  }
  const handleInstaRedeem = () => {
    setOpenInstaRedeem(true)
  }


  return (
    <>
      <MyNavbar />
      <Container className="mt-4">

        <div className="d-flex align-items-center">
          <img src={`${imageUrl + schemeList[0]?.accordAMCCode}.png`} className="logoRadius" alt="Image not found" width={60} height={60} />
          <div style={{ marginLeft: "1%", marginTop: "1%" }}>
            <h4 className="fw-bold">{schemeList[0]?.scheme}</h4>
            <p>Category-{schemeList[0]?.equityType}</p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-8 col-md-8 col-12">

            <div className=" border-0">
              <div className="row px-4 pt-4" >
                <div className="col-6" >
                  <p className="fs12px mb-0">NAV</p>
                  <p className="fs16px">₹{schemeList[0]?.cnav?.toFixed(2)}</p>
                </div>
                <div className="col-6">
                  <p className="fs12px mb-0">  Last {monthList.find((m) => m.value === duration)?.label} CAGR</p>
                  <h5 className={`  ${cagr > 0 ? "congratesColor" : "errorColor2"}`}>{cagr}%</h5>
                </div>
              </div>

              <div className="">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="area"
                  height={250}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mx-4 mt-0 crPointer" >
                {monthList.map((item: monthKeys) => {
                  return <p className={`${duration === item.value && "activeDuratin"}`} onClick={() => fetchNavHistory(item.value)}>{item.label}</p>
                })}
              </div>
            </div>


            <div
              className="card mt-4 p-4"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="fw-bold">Fund Details</h5>
              <div className="row pt-4">
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Fund Size</span>
                  <h4 className="fs-6">₹{getValueInSort(Number(schemeList[0]?.fundSize))} </h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Launched</span>
                  <h4 className="fs-6">{dateInStringNumber(schemeList[0]?.launchDate)} </h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Expense Ratio</span>
                  <h4 className="fs-6">{schemeList[0]?.expenseRatio}%</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Lock-in</span>
                  <h4 className="fs-6">{schemeList[0]?.lockInPeriod} Yr</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Plan Type</span>
                  <h4 className="fs-6">{schemeList[0]?.planType}</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Plan Option</span>
                  <h4 className="fs-6">Growth</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Risk</span>
                  <h4 className="fs-6">{schemeList[0]?.risk || "N/A"}</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Min. Investment</span>
                  <h4 className="fs-6">₹{schemeList[0]?.minSIPAmt ?? 0}</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Exit Load</span>
                  <h4 className="fs-6"> {schemeList[0]?.exitLoad?.split(',')?.map((line, index) => (
                    <span key={index}>
                      {line?.trim() || "N/A"}
                      <br />
                    </span>
                  ))}</h4>
                </div>
              </div>
            </div>

            {monthList.length >= 4 && <MyStackBar schemeData={schemeList[0]} />}

          </div>

          {/* Mutual Funds List */}
          {location?.state?.fromPortfolio ?
            <div className="col-md-4 col-12 position-relative" >
              <div
                className="card mb-4 radius16OverFlow"

              >
                <div className="p-lg-3 p-4 row">

                  <div className="d-flex gap-2 justify-content-around">
                    {(checkTransactionAllowed(schemeList, keys.sip) || checkTransactionAllowed(schemeList, keys.purchase)) &&
                      <div onClick={handleInvestMore} >
                        <label
                          className="btn_colorfull rounded-3 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset crPointer"
                          htmlFor="option3"
                        >
                          Invest More
                        </label>
                      </div>}
                    {location.state?.from === keys.bajaj ?
                      <div onClick={handleInstaRedeem} >
                        <label
                          className="btn_colorfull rounded-3 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset crPointer"
                          htmlFor="option1"
                        >
                          Insta Redeem
                        </label>
                      </div> : <>
                        {checkTransactionAllowed(schemeList, keys.switch) &&
                          <div onClick={() => handleSwitch("Switch")} >
                            <label
                              className="btn_colorfull rounded-3 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset crPointer"
                              htmlFor="option1"
                            >
                              Switch
                            </label>
                          </div>}

                        <div onClick={handleClick} >
                          <label
                            className="btn_colorfull dotted_sip_prodyg rounded-3 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset crPointer"
                            htmlFor="option1"
                          >
                            <AiOutlineMore />
                          </label>
                        </div></>}
                  </div>
                </div>

              </div>
              {show && (

                <div className="card mb-4 popup_card_steup_area">
                  <div className="p-3">
                    <ul className="ps-0 style-unerline-prodgy mb-0 crPointer">
                      {/* <li onClick={() => handleRedmptionModel()}>Redeem Fund</li> */}

                      {checkTransactionAllowed(schemeList, keys.redumption) && <li onClick={() => handleRedmptionModel()}>Redeem Fund</li>}
                      {checkTransactionAllowed(schemeList, keys.stp) && <li onClick={() => handleSwitch("STP")}>Systematic Transfer Plan (STP)</li>}
                      {checkTransactionAllowed(schemeList, keys.swp) && <li onClick={() => handleSwp()}>Systematic Withdrawal Plan (SWP)</li>}
                      <li onClick={() => goTransactionHistory(schemeList[0])}>Transaction History</li>

                    </ul>
                  </div>
                </div>

              )}

              <div
                className="card mb-4 radius16OverFlow "
              >

                <div className="p-lg-3 p-4">

                  <div className="mt-2">

                    <div className="d-flex justify-content-between">
                      <div className="port_holding_etails">
                        <h1>Holding Details</h1>
                      </div>

                    </div>

                    <div className="row pt-4">
                      <div className="col-6 py-2">
                        <span className="text-secondary text-uppercase fs-7">Units</span>
                        <h4 className="fs-6">{Math.round(location.state?.unit * 100) / 100}</h4>
                      </div>
                      <div className="col-6 py-2">
                        <span className="text-secondary text-uppercase fs-7">Folio</span>
                        <h4 className="fs-6">{location.state?.folio}</h4>
                      </div>
                      <div className="col-6 py-2">
                        <span className="text-secondary text-uppercase fs-7">Total invested</span>
                        <h4 className="fs-6">₹ {getValueInSort(location.state?.purchase)}</h4>
                      </div>
                      <div className="col-6 py-2">
                        <span className="text-secondary text-uppercase fs-7">Current Value</span>
                        <h4 className="fs-6">₹ {getValueInSort(location.state?.currentvalue)}</h4>
                      </div>
                      <div className="col-6 py-2">
                        <span className="text-secondary text-uppercase fs-7">Gain/Loss</span>
                        <h4 className="fs-6">{location.state?.gain ? getPercentageValue(Number(location.state?.purchase), location.state?.gain) : getPercentageValue(Number(location.state?.purchase), Number(location.state?.currentvalue) - Number(location.state?.purchase))}%</h4>
                      </div>
                      {location.state?.days &&
                        <div className="col-6 py-2">
                          <span className="text-secondary text-uppercase fs-7">Avg. Days</span>
                          <h4 className="fs-6">{location.state?.days}</h4>
                        </div>}
                    </div>
                  </div>
                </div>

              </div>

            </div> : (schemeList[0]?.sipAllowed || schemeList[0]?.purchaseAllowed) && <InvestmentForm schemeList={schemeList} setSchemeList={setSchemeList} sipDateList={sipDateList} />}
        </div>

      </Container>
      <InvetmentConfirmation
        show={openInvestPopup}
        setShow={setOpenInvestPopup}
        schemeList={schemeList}
        setSchemeList={setSchemeList}
        sipDateList={sipDateList}
        from={"portfolio"}
      />
      <InstaRedeem show={openInstaRedeem} setShow={setOpenInstaRedeem} redeemList={location.state} />
      <SelectFolioPopup show={openSelectFolio} setShow={setOpenSelectFolio} schemeList={schemeList} setSchemeList={setSchemeList} isSipTransaction={true} />
      <SwitchSchemeModel show={openSwitchSchemeModel} setShow={setOpenSwitchSchemeModel} selectedAmcCode={[schemeList[0]?.accordAMCCode]} schemeList={location.state} transactionType={transactionType} />
      <SwpConfirmation show={openSwpModel} setShow={setOpenSwpModel} swpList={schmeDetail} schemeList={schemeList} />
      <RedumptionConfirmation show={openRedumptionModel} setShow={setOpenRedumptionModel} redeemList={schmeDetail} setRedeemList={setSchmeDetail} />
      <MsgModel show={openMsgModel} setShow={setOpenMsgModel} setNewModelShow={setOpenRedumptionModel} heading={"Redemption Guidelines"} msg={[
        "Redemption orders will be executed only on specific days as per the AMC’s SIF redemption guidelines.",
        "Redemption order may be rejected if the applicable NAV declines so that the value of balance units falls below the min threshold investment limit of Rs. 10 Lakhs.",

      ]}
        btn="OK" />
      <Footer />
    </>
  );
};

export default FundDetails;
