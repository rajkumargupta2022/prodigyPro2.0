import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PortfolioEmpty from "../PortfolioEmpty";
import ManageBankAccounts from "./Components/ManageBankAccounts";

import { ChevronRight, Dot } from "react-bootstrap-icons";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { currentDateInStringNumber, dateInStringNumber } from "../../services/dates/dateFormater";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { fetchAdminUser } from "../../services/user/adminUser";
import { getRequest } from "../../services/Api/HandleApi";
import {  getAllInsightsKeys, getAllInsightsRes, getBankInsightsKeys, getBankInsightsRes, NewMfUserRes } from "../data-interfaces/mf-savings";
import { inTitleCase } from "../../services/utils/services";

const MfSavingDashboard = () => {
  const navigate = useNavigate();
  const [isEmergencyFund, setIsEmergencyFund] = useState<boolean>(true);
  const [openManageAccounts, setOpenManageAccounts] = useState<boolean>(false);
  const [insightsData, setInsightsData] = useState<getAllInsightsKeys>();
  const [bankInsightsData, setBankInsightsData] = useState<getBankInsightsKeys[]>([]);


// dynamic chart and desgine 
  useEffect(() => {
    fetchIsNewUser()
  }, [])

  const fetchIsNewUser = async () => {
    const adminUser = fetchAdminUser();
    try {
      const res = await getRequest<NewMfUserRes>(`${endPoints.checkNewUser}?ucc=${adminUser.ucc}`);
        console.log(res.data)
        if(res.data){
          navigate("/what-is-mf-savings");
        }else if(!res.data){
          navigate("/mf-saving-dashboard");
          fetchAllInsights()
          fetchBankInsights()
        }
      
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllInsights = async () => {
    const adminUser = fetchAdminUser(); 
    try {
      const res = await getRequest<getAllInsightsRes>(`${endPoints.getAllInsights}?ucc=${adminUser.ucc}`);
        setInsightsData(res.data);
    } catch (err) {
      console.error(err);
    }
  }
   const fetchBankInsights = async () => {
    const adminUser = fetchAdminUser(); 
    try {
      const res = await getRequest<getBankInsightsRes>(`${endPoints.getBankInsights}?ucc=${adminUser.ucc}`);
        setBankInsightsData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const series = [
    {
      name: "Invested",
      data: [0, 5000, 0, 0, 0, 0, 1200, 0],
    },
    {
      name: "Maturity",
      data: [0, 3000, 0, 0, 0, 0, 2000, 0],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    colors: ["#CCD2FF", "#1A35FE"],
    plotOptions: {
      bar: {
        borderRadius: 3,
        borderRadiusApplication: "end",
        horizontal: false,
      },
    },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      categories: ["Returns"],
      labels: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    legend: { show: false },
    fill: { opacity: 1 },
  };

  const handleTransactionType = (value: boolean) => {
    setIsEmergencyFund(value);
  };

  return (
    <>
      <NavBar />

      <div className="container pt-2">
        <div className="personal_form_container">

          {/* Breadcrumb */}
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer">
              <Link to="/dashboard">Home</Link>
              <small className="greyColor">
                <ChevronRight className="fs14px" /> MF Saving Account
              </small>
            </h6>
          </div>

          <div className="row">
            <h3 className="mb-4">MF Savings Account</h3>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <button
                type="button"
                className={`${isEmergencyFund ? "customButton" : "customButtonNoBg"} px-4 mb-1`}
                onClick={() => handleTransactionType(true)}
              >
                Insights
              </button>

              <button
                type="button"
                className={`mx-3 ${isEmergencyFund ? "customButtonNoBg" : "customButton"} px-4 mb-1`}
                onClick={() => handleTransactionType(false)}
              >
                Investments
              </button>
              {/* LEFT SECTION */}

            </div>
          </div>

          <div className="row pt-4">
            <div className="col-lg-6 col-md-6 col-sm-12 align-items-center mb-3">
              <div className="borderColor p-3 rounded-4 bg-white text-center h-100">
                <div className="row pt-md-5 pt-3">
                  <div className="col-12 align-self-center h-100">
                    <small className="fw-semibold">
                      SURPLUS AMOUNT
                      <span className="fs12px ms-1">
                        As on {dateInStringNumber(insightsData?.last_refreshed_data ? insightsData.last_refreshed_data : currentDateInStringNumber())}
                      </span>
                    </small>

                    <h3 className="fw-bold mt-2">
                  ₹{insightsData?.surplus_balance || 0}
                    </h3>

                    <div className="row justify-content-center mt-3 w-75 mx-auto">
                      <div className="col-md-12">
                        <div className="d-flex justify-content-between">
                          <small>Current Balance</small>
                          <span className="fw-semibold">₹{insightsData?.current_balance||0}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <small>Avg. Balance</small>
                          <span className="fw-semibold">₹{insightsData?.avg_balance||0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
              <div className="borderColor p-3 rounded-4 bg-white ">
                <h6 className="fs16px mb-0">Returns Comparison</h6>

                <ReactApexChart
                  options={options}
                  series={series}
                  type="bar"
                  height={200}
                  className="mx-auto w-md-75 h-auto px-3"
                />

                <div className="row justify-content-center w-md-75 mx-auto text-center">
                  <div className="col-6">
                    <p className="mb-0 text-muted fw-semibold fs14px text-dark">₹5,656</p>
                    <p className="mb-0 text-success">6.55%</p>
                    <p className="text-muted fs14px">Bank Account</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-0 text-muted fw-semibold fs14px text-dark">₹5,00,000</p>
                    <p className="mb-0 text-success">12%</p>
                    <p className="text-muted fs14px">MF Saving Account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MY ACCOUNTS */}
          <div className="container py-2">
            <div className="row justify-content-between align-items-center mb-3">
              <div className="col-6 mb-2"><h5 className="mb-0">My Accounts</h5></div>
              <div className="col-6 text-end mb-2" onClick={() => setOpenManageAccounts(true)}><p className="mb-0 logoBlueColor crPointer">Manage</p></div>
            </div>

            {bankInsightsData.length> 0 ? bankInsightsData?.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="borderColor p-3 rounded-top-3 bg-white">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-7">
                      <div className="d-flex">
                        <img
                          src={imageUrl + item?.bank_name?.trim()
                      .toLowerCase()
                      .replace(/\s+/g, '_') + ".png"}
                          height={40}
                          width={40}
                          className="logoRadius mt-1"
                          alt=""
                        />
                        <div className="ms-2 mt-1">
                          <h6 className="mb-0">{inTitleCase(item?.bank_name)}</h6>
                          <small className="fs12px mt-0">XXXXXXXXX{item?.account_number?.slice(-4)}</small>
                          <p className="fs12px mt-0">
                            <Dot className="fs-4 congratesColor" style={{ marginLeft: "-7px" }} />
                            Last updated: {dateInStringNumber(item?.last_refreshed_data)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 text-end">
                      <p className="text-dark fs15px">₹{item?.surplus_balance?.toLocaleString()}</p>
                    </div>


                  </div>

                  <div className="row mt-3">
                    <div className="col-lg-4">
                      <div className="d-flex justify-content-between">
                        <small>Current Balance</small>
                        <span className="fw-semibold">₹{item?.current_balance?.toLocaleString()}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <small>Avg. Balance</small>
                        <span className="fw-semibold">₹{item?.avg_balance?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="scheme-bg rounded-bottom">
                  <div className="d-md-flex align-items-center p-2 fs14px">
                    <p className="mb-0 mb-2 mb-md-0">
                      You just missed ₹750 in MF Savings returns!
                    </p>
                    <button className="customButton px-3 ms-auto ">
                      Invest Surplus
                    </button>
                  </div>
                </div>
              </div>
            )):<PortfolioEmpty
            title="Let’s get you started!"
            body="Link your bank account to see your balances, returns, and discover how your idle money can earn more."
            btnName="Give Consent"
          />}
          </div>

          
        </div>
      </div >

      <ManageBankAccounts
        show={openManageAccounts}
        setShow={setOpenManageAccounts}
        list={bankInsightsData}
      />

      <Footer />
    </>
  );
};

export default MfSavingDashboard;
