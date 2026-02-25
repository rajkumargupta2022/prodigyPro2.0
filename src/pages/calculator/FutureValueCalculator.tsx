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

const FutureValueCalculator = () => {
  const navigate = useNavigate()
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);

  const [investAmount, setInvestAmount] = useState<number>(50000);
  const [rateOfReturn, setRateOfReturn] = useState<number>(12);
  const [resultInvestment, setResultInvestment] = useState<number>(50000);
  const [gains, setGains] = useState<number>(155292);
  const [resultPeriod, setResultPeriod] = useState<number>(10);
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
      let lumpsums: number = investAmount * Math.pow((1 + rateOfReturn / 100), investmentPeriod);
      let lumpsum: number = Math.round(lumpsums)
      setResultInvestment(investAmount);
      setGains(lumpsum);
      setResultReturn(rateOfReturn)
      setResultPeriod(investmentPeriod)
    }
  };
  // Build correct invested (start-of-year) and gain (this year) arrays
  const buildYearSeries = (principal: number, rate: number, years: number) => {
    const invested: number[] = [];
    const gain: number[] = [];
    for (let i = 1; i <= years; i++) {
      const startOfYear = Math.round(principal * Math.pow(1 + rate / 100, i - 1));
      const endOfYear = Math.round(principal * Math.pow(1 + rate / 100, i));
      invested.push(startOfYear);
      gain.push(endOfYear - startOfYear);
    }
    return { invested, gain };
  };

  const { invested: investedArr, gain: gainArr } = buildYearSeries(
    resultInvestment,
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
          const gain = series[1][dataPointIndex] ?? 0;
          const current = investedVal + gain;
          const year = yearsArray[dataPointIndex];

          const formatValue = (v: number) => {
            if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
            if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
            if (v >= 1000) return `₹${(v / 1000).toFixed(2)}K`;
            return `₹${v.toLocaleString("en-IN")}`;
          };

          return `
          <div style="padding:8px; border-radius:8px; border:1px solid #e6e9ff; background:#fff;">
            <div><b>Year: ${year}</b></div>
            <div>Current Value: ${formatValue(current)}</div>
            <div>Invested Value: ${formatValue(investedVal)}</div>
            <div>Gain: <span style="color:green;">${formatValue(gain)}</span></div>
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
            <h4>Lump Sum Calculator</h4>
            <p className="fs14px">
              This calculator will help you to calculate the return value of
              your one time investment after your decided period.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        INVEST
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
                      label={"PERIOD"}
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
                  <p className="resultColor">
                    If you invest <span className="fw600">₹{resultInvestment}</span> for a
                    period of {resultPeriod} years at a <span className="fw600">{resultReturn}%</span>{" "}
                    annual return, the maturity amount will grow to{" "}
                    <span className="fw600">₹{gains.toLocaleString("en-IN")}</span>
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
                Invest
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FutureValueCalculator;
