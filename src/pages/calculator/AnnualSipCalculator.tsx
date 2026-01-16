import NavBar from "../../components/Navbar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}
import {
  isNotEmpty,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
import { useNavigate } from "react-router-dom";

const AnnualSipCalculator = () => {
  const navigate = useNavigate()
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(12);

  const [investAmount, setInvestAmount] = useState<number>(50000);
  const [rateOfReturn, setRateOfReturn] = useState<number>(12);
  const [resultInvestment, setResultInvestment] = useState<number>(600000);
  const [gains, setGains] = useState<number>(1351455.463);
  const [resultPeriod, setResultPeriod] = useState<number>(12);
  const [resultReturn, setResultReturn] = useState<number>(12);

  const investAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const rateOfReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      investAmountRef.current?.validate(investAmount),
      rateOfReturnRef.current?.validate(rateOfReturn),
    ].every((value) => value === true);

    if (isValidated) {
      const P = investAmount;
      const n = investmentPeriod;
      const r = rateOfReturn / 100;
      const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);


      setResultInvestment(investAmount * investmentPeriod);
      setGains(fv);
      setResultPeriod(investmentPeriod);
      setResultReturn(rateOfReturn);

    }
  };
  // Build correct invested (start-of-year) and gain (this year) arrays
const buildYearSeries = (
  yearlyInvestment: number,
  rate: number,
  years: number
) => {
  const invested: number[] = [];
  const gain: number[] = [];

  const r = rate / 100;

  for (let i = 1; i <= years; i++) {
    const investedTillNow = yearlyInvestment * i;

    const fvTillNow =
      yearlyInvestment *
      ((Math.pow(1 + r, i) - 1) / r) *
      (1 + r);

    invested.push(Math.round(investedTillNow));
    gain.push(Math.round(fvTillNow - investedTillNow));
  }

  return { invested, gain };
};


const { invested: investedArr, gain: gainArr } = buildYearSeries(
  investAmount,     // yearly SIP amount
  resultReturn,
  resultPeriod
);

  const yearsArray: number[] = Array.from({ length: resultPeriod }, (_, i) => i + 1);

  const state: ChartState = {
    series: [
      {
        name: "Invested Value",
        data: investedArr,
      },
      {
        name: "Gain",
        data: gainArr,
      },
    ],
    options: {
      chart: { type: "bar", stacked: true, height: 1000 },
      colors: ["#CCD2FF", "#1A35FE"],
      plotOptions: {
        bar: {
          borderRadius: 3,
          borderRadiusApplication: "end",
          horizontal: false,
        },
      },
     tooltip: {
  shared: true,
  intersect: false,
  custom: function ({ series, dataPointIndex }: any) {
    const investedVal = series[0][dataPointIndex] ?? 0;
    const gainVal = series[1][dataPointIndex] ?? 0;
    const currentVal = investedVal + gainVal;
    const year = yearsArray[dataPointIndex];

    const formatValue = (v: number) => {
      if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
      if (v >= 100000) return `₹${(v / 100000).toFixed(2)} L`;
      if (v >= 1000) return `₹${(v / 1000).toFixed(2)} K`;
      return `₹${v.toLocaleString("en-IN")}`;
    };

    return `
      <div style="padding:8px;border-radius:8px;border:1px solid #e6e9ff;background:#fff;">
        <div><b>Year ${year}</b></div>
        <div>Total Invested: ${formatValue(investedVal)}</div>
        <div>Portfolio Value: ${formatValue(currentVal)}</div>
        <div>Gain: <span style="color:green;">${formatValue(gainVal)}</span></div>
      </div>
    `;
  },
},

      xaxis: { categories: yearsArray, axisTicks: { show: false } },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      dataLabels: { enabled: false },
      fill: { opacity: 1 },
    },
  };

  const handleRecomendedScheme = () => {
    navigate("/recommended-scheme-goal", {
      state: {
        title: "Recommended Funds",
        paragraph: "Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!",
        investmentPeriod: investmentPeriod
      }
    })
  }
  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Annual SIP Calculator</h4>
            <p className="fs14px">
              Estimate your yearly investment growth with accurate projections.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        HOW MUCH YOU CAN INVEST YEARLY
                      </label>
                      <ValidatedInput
                        ref={investAmountRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="0"
                        value={investAmount}
                        onChange={(e) => {
                          amountHandler(e, 10000000, setInvestAmount);
                        }}
                        validate={[isNotEmpty, minAmount(500)]}
                      />
                    </div>
                    <RangeBar
                      label={"HOW MANY YEARS WILL YOU CONTINUE THE INVESTMENT"}
                      maxLimit={30}
                      value={investmentPeriod}
                      setValue={setInvestmentPeriod}
                    />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        EXPECTED RATE OF RETURNS (%)
                      </label>
                      <ValidatedInput
                        ref={rateOfReturnRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={rateOfReturn}
                        onChange={(e) => {
                          percentageHandler(e, 50, setRateOfReturn);
                        }}
                        validate={[isNotEmpty, minAmount(1)]}
                      />
                    </div>
                    <button type="submit" className="customButton px-3 mt-3">
                      Calculate
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 co-sm-12 col-md-12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <h5 className=" fw-normal mb-1">Result</h5>
                  <p className=" fs12px">
                    AMOUNT INVESTED  <br />
                    <h6 className="fw600 text-dark">₹{resultInvestment.toLocaleString("en-IN")}</h6>
                  </p>
                  <p className=" fs12px">
                    FUTURE  VALUE OF INVESTMENT <br />
                    <h6 className="fw600 text-dark">₹{gains.toLocaleString("en-IN", {
  maximumFractionDigits: 0
})}</h6>
                  </p>
                  
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 co-sm-12 col-md-12 ">
                  <div className="card border-0 shadow p-0">
                    <div className="card-body">
                      <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="btn investBtn mt-2 shadow-lg" onClick={handleRecomendedScheme}>
                Start Investing
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnualSipCalculator;
