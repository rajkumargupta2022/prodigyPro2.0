import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import { keys } from "../services/utils/keys";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}
interface schemeDataProps {
  schemeData: schemeDeatilDataKeys
}

const InvestmentChart: React.FC<schemeDataProps> = ({ schemeData }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000)
  const [totalInvestment, setTotalInvestment] = useState<number>(180000)
  const [totalFixedProfit, setTotalFixedProfit] = useState<number>(218967)
  const [totalProfit, setTotalProfit] = useState<number>(255641)
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(3)
  const [returnPercentage, setReturnPercentage] = useState<number>(schemeData?.threeYearCAGR??0)
  const [selectedInvestmentType, setSelectedInvestmentType] = useState<"sip" | "oneTime">("sip")


  const state: ChartState = {
    series: [
      {
        name: "Invested",
        data: [0,totalInvestment, 0,  0,  0, 0, totalInvestment,0],
      },
      {
        name: "Maturity",
        data: [0,totalFixedProfit-totalInvestment,  0, 0,  0, 0, totalProfit-totalInvestment,0],
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
      states: {
        hover: {
          filter: {
            type: "none", // Prevent dimming or changing on hover
          },
        },
      },
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
       tooltip: {
        custom: function ({ series, dataPointIndex }) {
          const invested = series[0][dataPointIndex];
          const maturity = series[1][dataPointIndex];

          return `
      <div style="padding: 10px; background: white; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); font-family: sans-serif; text-align: center;">
        <div style="font-size: 14px; color: #011EFE ;">${dataPointIndex ? "This Fund" : selectedInvestmentType === "sip" ? "Recurring Deposit" : "Fixed Deposit"}</div>
        <div style="font-size: 14px; color: #333;">Invested: ₹${invested.toLocaleString('en-IN')}</div>
        <div style="font-size: 14px; color: #333;">${dataPointIndex===6?"Market Value":"Maturity"}: ₹${(totalInvestment+maturity).toLocaleString('en-IN')}</div>
      </div>
    `;
        }
      }
    },
  };

  useEffect(() => {
    setReturnPercentage(schemeData?.threeYearCAGR??0)
     calculateFixedDeposit(3, investmentAmount, keys.sip)
    checkInvestmentType(keys.sip, investmentAmount, 3)
  }, [schemeData?.threeYearCAGR]);
  // useEffect(() => {
   
  // }, []);


  const handleInvestType = (type: "sip" | "oneTime") => {
    setSelectedInvestmentType(type)
    checkInvestmentType(type, investmentAmount, investmentPeriod)
  }
  const handlePeriod = (period: 1 | 3 | 5, type: "sip" | "oneTime") => {
    setInvestmentPeriod(period)
    calculateFixedDeposit(period, investmentAmount, type)
    checkInvestmentType(type, investmentAmount, period)
  }
  const calculateFixedDeposit = (period: number, amount: number, type: "sip" | "oneTime") => {
    let cagr: number = 6.55;
    let p: number = 0
    if (type === "sip") {
      p = amount * 12 * period;
    } else {
      p = amount
    }
    let t: number = period;
    let r: number = cagr;
    let n: number = 12;

    let pric: number = p;
    let amt: number = 0;

    for (let i = 1; i <= t; i++) {
      const val1: number = 1 + r / (100 * n);
      const val2: number = n;
      amt = pric * Math.pow(val1, val2);
      pric = amt;
    }

    setTotalInvestment(p)
    setTotalFixedProfit(Math.round(amt))


  }
  const checkInvestmentType = (type: "sip" | "oneTime", amount: number, period: number) => {
    if (type === "sip") {
      calculateForSip(amount, period)
    } else {
      calculateFutureValue(amount, period)
      calculateFixedDeposit(period, amount, type)
    }
  }

  const calculateFutureValue = (amount: number, period: number) => {
    if(schemeData?.oneYearCAGR){
  let cagr: number| undefined;
    switch (period) {
      case 1:
        setReturnPercentage(schemeData.oneYearCAGR)
        cagr = schemeData.oneYearCAGR
        break;
      case 3:
        setReturnPercentage(schemeData.threeYearCAGR??0)
        cagr = schemeData.threeYearCAGR
        break;
      case 5:
        setReturnPercentage(schemeData.fiveYearCAGR??0)
        cagr = schemeData.fiveYearCAGR
        break;
      default:
        return
    }
    let lumpsums: number = amount * Math.pow((1 + (cagr??0) / 100), period);
    setTotalInvestment(amount)
    setTotalProfit(Math.round(lumpsums))
    }
  
  }

  const calculateForSip = (amount: number, period: number) => {
    let cagr: number|undefined;
    switch (period) {
      case 1:
        setReturnPercentage(schemeData?.oneYearCAGR??0)
        cagr = schemeData.oneYearCAGR
        break;
      case 3:
        setReturnPercentage(schemeData?.threeYearCAGR??0)
        cagr = schemeData?.threeYearCAGR
        break;
      case 5:
        setReturnPercentage(schemeData?.fiveYearCAGR??0)
        cagr = schemeData?.fiveYearCAGR
        break;
      default:
        return
    }
    let monthlyRate: number = (cagr??0) / 12 / 100;
    let months: number = period * 12;
    let futureValue: number = 0;
    futureValue = ((amount * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate) * (1 + monthlyRate);

    setTotalInvestment(months * amount)
    let mainresults: number = futureValue
    let gain: number = mainresults - (amount * months);
    setTotalProfit(Math.round(gain + (months * amount)))
    recuringDeposite(amount, period)
  }
  const recuringDeposite = (amount: number, period: number) => {
    let monthlyRate: number = 6.55 / 12 / 100;
    let months: number = period * 12;
    let futureValue: number = 0;
    futureValue = ((amount * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate) * (1 + monthlyRate);

    setTotalInvestment(months * amount)
    let mainresults: number = futureValue
    let gain: number = mainresults - (amount * months);
    setTotalFixedProfit(Math.round(gain + (months * amount)))
  }

  const amountHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxAmount: number
  ): void => {
    let value = Number(e.target.value.trim());
    if (value <= 1000000000) {
      setInvestmentAmount(value);
      calculateFixedDeposit(investmentPeriod, value, selectedInvestmentType)
      checkInvestmentType(selectedInvestmentType, value, investmentPeriod)
    }
    else if (value >= maxAmount) {
      setInvestmentAmount(value);
      calculateFixedDeposit(investmentPeriod, value, selectedInvestmentType)
      checkInvestmentType(selectedInvestmentType, value, investmentPeriod)
    }

  };

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
        <div className="col-lg-4 col-12 py-2">
          <p className="fs12px mb-1">INVESTMENT OF</p>
          <input
            type="text"
            className="form-control"
            placeholder="1000"
            onChange={(e) => amountHandler(e, 1000000)}
            value={investmentAmount}
          />
        </div>
        <div className="col-lg-6 col-12  py-2 ">
          <p className="fs12px mb-1 set-margin-left">FOR A PERIOD OF</p>
          <div className="text-lg-end">
            <div className="btn-group rounded-tab-btn" role="group" aria-label="Basic radio toggle button group">

              <input type="radio" className="btn-check" name="btnradio" onClick={() => handlePeriod(1, selectedInvestmentType)} id="btnradio1" autoComplete="off" checked={investmentPeriod === 1} />
              <label className="btn  padding-under-area border" htmlFor="btnradio1">1Y</label>

              <input type="radio" className="btn-check" name="btnradio" onClick={() => handlePeriod(3, selectedInvestmentType)} id="btnradio2" autoComplete="off" checked={investmentPeriod === 3} />
              <label className="btn  padding-under-area border" htmlFor="btnradio2">3Y</label>

              <input type="radio" className="btn-check" name="btnradio" onClick={() => handlePeriod(5, selectedInvestmentType)} id="btnradio3" autoComplete="off" checked={investmentPeriod === 5} />
              <label className="btn  padding-under-area border" htmlFor="btnradio3">5Y</label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 border-bottom">
        <p className="fs14px">
          Investment of
          <span className="fw-bold text-dark" >
            {" "}
            ₹{getValueInSort(totalInvestment)}{" "}
          </span>
          could have been
        </p>
        <h6 className="">
          ₹{totalProfit}
          {returnPercentage > 0 ?
           <span className="congratesColor">(+{returnPercentage}%)</span>:<span className="errorColor">({returnPercentage}%)</span>}
        </h6>
      </div>

      <div className="mt-4">
        <h6 className="fs16px mb-0">Returns Comparison</h6>
        <div className="container">
          <div className="row ">
            <div className="col-md-12" >
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={200}
                width={"62%"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-4">
              <p className="mb-0 text-muted ml20">₹{getValueInSort(totalFixedProfit)}</p>
              <p className="mb-0 text-success ml20">6.55%</p>
              <p className="text-muted ml20">{selectedInvestmentType === "sip" ? "Recurring Deposit" : "Fixed Deposit"}</p>
            </div>
            <div className="col-6">
              <p className="mb-0 text-muted ml20 m-0">₹{getValueInSort(totalProfit)}</p>
              <p className="mb-0 text-success ml20 m-0">{returnPercentage}%</p>
              <p className="text-muted ml20 m-0">This Fund</p>
            </div>
          </div>

        </div>
      </div>
    </div>





  );
};

export default InvestmentChart;
