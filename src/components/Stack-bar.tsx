import "bootstrap/dist/css/bootstrap.min.css";
import { ReactElement, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { amountHandler } from "../services/utils/calculatorsFs";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

const InvestmentChart = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000)
  const [investmentPreiod, setInvestmentPreiod] = useState<number>(3)
  const [selectedInvestmentType, setSelectedInvestmentType] = useState<"sip" | "oneTime">("sip")

  const state: ChartState = {
    series: [
      {
        name: "Investment Amount",
        data: [100],
      },
      {
        name: "Market Value",
        data: [160],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 100,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ["#CCD2FF", "#1A35FE"],
      plotOptions: {
        bar: {
          borderRadius: 3,
          borderRadiusApplication: "end",
          horizontal: false,
          dataLabels: {
            total: {
              enabled: false,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 100,
              },
            },
          },
        },
      },
      stroke: {
        width: 0,
        colors: ["#1A35FE"],
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [2],
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  const handleInvestType = (type: "sip" | "oneTime") => {
    setSelectedInvestmentType(type)
  }
 
  return (
    <div
      className="card mt-4 p-4 mb-4 border-0 rounded-4"
    >
      <h6 className="fs16px">Return Calulator</h6>

      <div className="row text-center mt-2 crPointer">
        <div className="col-md-6 py-2 py-md-0" onClick={() => handleInvestType("sip")}>
          <div className={`${selectedInvestmentType === "sip" && "logobg_color"} w-100 border  text-center monthly_btn`}> Monthly SIP</div>
        </div>
        <div className="col-md-6 py-2 py-md-0" onClick={() => handleInvestType("oneTime")}>
          <div className={`${selectedInvestmentType === "oneTime" && "logobg_color"} w-100 border  text-center monthly_btn`}> One-Time </div>
        </div>
      </div>
      <hr />
      <div className="row justify-content-between gap-lg-5">
        <div className="col-lg-4 col-md-6 py-2">
          <p className="fs12px mb-1">INVESTMENT OF</p>
          <input
            type="text"
            className="form-control"
            placeholder="1000"
            onChange={(e) => amountHandler(e, 1000000, setInvestmentAmount)}
            value={investmentAmount}
          />
        </div>
        <div className="col-lg-6 col-md-6 align-self-md-end py-2">
          <p className="fs12px mb-1">FOR A PERIOD OF</p>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked />
            <label className="btn btn-outline-primary px-xl-5 px-4" htmlFor="btnradio1">1Y</label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
            <label className="btn btn-outline-primary px-xl-5 px-4" htmlFor="btnradio2">3Y</label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
            <label className="btn btn-outline-primary px-xl-5 px-4" htmlFor="btnradio3">5Y</label>
          </div>
        </div>
      </div>

      <div className="mt-2 border-bottom">
        <p className="fs14px">
          Investment of
          <span className="fw-bold text-dark" >
            {" "}
            ₹36k{" "}
          </span>
          could have been
        </p>
        <h6 className="">
          ₹50,028.46 <span className="congratesColor">(+22.56%)</span>
        </h6>
      </div>

      <div className="mt-4">
        <h6 className="fs16px mb-0">Returns Comparison</h6>
        <div className="container">
          <div
            className="row "
          >
            <div className="col-5 mx-auto ">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={300}
                width={80}
              />

              <p className="mb-0 text-muted ml20">₹39.75K</p>
              <p className="mb-0 text-success ml20">6.55%</p>
              <p className="text-muted ml20">Fixed Deposit</p>
            </div>
            <div className="col-5 mx-auto"><ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={300}
              width={80}
            />
              <p className="mb-0 text-muted ml20">₹50.02K</p>
              <p className="mb-0 text-success ml20">22.56%</p>
              <p className="text-muted ml20">This Fund</p></div>

          </div>

        </div>
      </div>
    </div>





  );
};

export default InvestmentChart;
