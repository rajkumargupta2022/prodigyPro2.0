import { Container } from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import MyStackBar from "../components/Stack-bar";
import { useEffect, useState } from "react";
import SelectFolioPopup from "../components/select-folio-popup";
import { AiOutlineMore } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../services/Api/HandleApi";
import { navHistoryResponse, schemeDeatilDataKeys, schemeDetailType } from "./data-interfaces/transact";
import { endPoints, imageUrl } from "../services/utils/urls";
import { dateInStringNumber } from "../services/dates/dateFormater";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Footer from "../components/Footer";
import { detailPortfolioSchemeType } from "./data-interfaces/portfolio";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}


const FundDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openSelectFolio, setOpenSelectFolio] = useState(false)
  const [schemeDetailArray, setSchemeDetailArray] = useState<schemeDeatilDataKeys[]>([])
  const [navDate, setNavDate] = useState<string[]>([])
  const [navValue, setNavValue] = useState<number[]>([])
  const [duration, setDuration] = useState<number>(12)
  const [cagr, setCagr] = useState<number>(0)
  const [durarinInYear, setDurarinInYear] = useState<string>("")

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
    },
  };

  useEffect(() => {

    if (location.state.accordSchemeCode) {
      fetchSchemeDetail()
      fetchNavHistory(12)
    } else {
      navigate("/portfolio")
    }

  }, [])

  const fetchSchemeDetail = async () => {
    try {
      const res = await postRequest<schemeDetailType>(endPoints.getSchemeDetails, { productcode: location.state.accordSchemeCode })
      setSchemeDetailArray(res.data)
      console.log(res);

    } catch (err) {
      console.log(err);

    }
  }
  const fetchNavHistory = async (durationMonth: number) => {
    try {
      const res = await postRequest<navHistoryResponse>(endPoints.getNavHistory, { productcode: location.state.accordSchemeCode, duration: durationMonth })
      setCagr(res.cagr)
      setNavDate(res.history.map(item => item.date))

      setNavValue(res.history.map(item => parseFloat(Number(item.nav).toFixed(2))))
      setDuration(durationMonth)
      console.log(res);
      yearInString(durationMonth)

    } catch (err) {
      console.log(err);

    }
  }
  const yearInString = (year: number) => {
    switch (year) {
      case 1:
        setDurarinInYear("1M")
        break;
      case 3:
        setDurarinInYear("3M")
        break;
      case 6:
        setDurarinInYear("6M")
        break;
      case 12:
        setDurarinInYear("1Y")
        break;
      case 36:
        setDurarinInYear("3Y")
        break;
      case 60:
        setDurarinInYear("5Y")
        break;
      default:
        setDurarinInYear("Max")
    }

  }

  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <div className="d-flex align-items-center">
          <img src={`${imageUrl + location.state?.amcCode}.png`} className="logoRadius" alt="Image not found" width={60} height={60} />
          <div style={{ marginLeft: "2%", marginTop: "2%" }}>
            <h4 className="fw-bold">{location.state?.scheme}</h4>
            <p>Equity: Flexi Cap</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-8 col-md-8 col-12 border-end">

            <div className="row" >
              <div className="col-5 m-3" >
                <p className="fs12px mb-0">NAV</p>
                <p className="fs16px">₹{location.state.cnav}</p>
              </div>
              <div className="col-5 m-3">
                <p className="fs12px mb-0">Last {durarinInYear} CAGR</p>
                <h5 className="sf12px congratesColor">{cagr}%</h5>
              </div>

            </div>
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="area"
              height={250}
            />
            <div className="d-flex justify-content-between align-items-center mx-4 mt-0 crPointer" >
              <p className={`${duration === 1 && "activeDuratin"} `} onClick={() => fetchNavHistory(1)}>1M</p>
              <p className={`${duration === 3 && "activeDuratin"}`} onClick={() => fetchNavHistory(3)}>3M</p>
              <p className={`${duration === 6 && "activeDuratin"}`} onClick={() => fetchNavHistory(6)}> 6M</p>
              <p className={`${duration === 12 && "activeDuratin"}`} onClick={() => fetchNavHistory(12)}>1Y</p>
              <p className={`${duration === 36 && "activeDuratin"}`} onClick={() => fetchNavHistory(36)}>3Y</p>
              <p className={`${duration === 60 && "activeDuratin"}`} onClick={() => fetchNavHistory(60)}>5Y</p>
              <p className={`${duration === -1 && "activeDuratin"}`} onClick={() => fetchNavHistory(-1)}>Max</p>
            </div>


            <div
              className="card mt-4 p-4"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="fw-bold">Fund Details</h5>
              <div className="row pt-4">
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Fund Size</span>
                  <h4 className="fs-6">₹{schemeDetailArray[0]?.fundSize} Cr</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Launched</span>
                  <h4 className="fs-6">{dateInStringNumber(schemeDetailArray[0]?.launchDate)} </h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Expense Ratio</span>
                  <h4 className="fs-6">{schemeDetailArray?.[0]?.expenseRatio}%</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Lock-in</span>
                  <h4 className="fs-6">{schemeDetailArray?.[0]?.lockInPeriod} Yr</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Plan Type</span>
                  <h4 className="fs-6">{schemeDetailArray?.[0]?.planType}</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Plan Option</span>
                  <h4 className="fs-6">Growth</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Risk</span>
                  <h4 className="fs-6">{schemeDetailArray?.[0]?.risk}</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Min. Investment</span>
                  <h4 className="fs-6">₹{schemeDetailArray?.[0]?.minInvestment}</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Withdrawal Charges</span>
                  <h4 className="fs-6">Exit load 1% if redeemed within 1 year</h4>
                </div>
              </div>
            </div>

           <MyStackBar/>
          </div>

          {/* Mutual Funds List */}
          <div className="col-md-4 col-12" >
            <div
              className="card mb-4"
              style={{
                border: "none",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div className="p-lg-3 p-4">

                <div className="d-flex gap-2 justify-content-around">
                  <div>
                    <label
                      className="btn_colorfull rounded-3 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset"
                      htmlFor="option3"
                    >
                      Invest More
                    </label>
                  </div>

                  <div>
                    <label
                      className="btn_colorfull rounded-3 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset"
                      htmlFor="option1"
                    >
                      Switch
                    </label>
                  </div>

                  <div className="">
                    <label
                      className="btn_colorfull dotted_sip_prodyg rounded-3 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset"
                      htmlFor="option1"
                    >
                      <AiOutlineMore />
                    </label>
                  </div>
                </div>
              </div>

            </div>

            <div
              className="card mb-4"
              style={{
                border: "none",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div className="p-lg-3 p-4">

                <div className="mt-2">

                  <div className="d-flex justify-content-between">
                    <div className="port_holding_etails">
                      <h1>Holding Details</h1>
                    </div>
                    <div className="prod_sip_22">
                      <span>SIP: ₹5.5K</span>
                    </div>
                  </div>

                  <div className="row pt-4">
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Units</span>
                      <h4 className="fs-6">1,304.161</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Folio</span>
                      <h4 className="fs-6">323253255</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Total invested</span>
                      <h4 className="fs-6">₹ 1.14L</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Current Nav</span>
                      <h4 className="fs-6">₹ 1,598.62</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">CAGR</span>
                      <h4 className="fs-6">19.56%</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Avg. Days</span>
                      <h4 className="fs-6">432</h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </Container>
      <SelectFolioPopup show={openSelectFolio} setShow={setOpenSelectFolio} />
      <Footer />
    </>
  );
};

export default FundDetails;
