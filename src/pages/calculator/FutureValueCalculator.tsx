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
import { amountHandler, percentageHandler } from "../../services/calculatorsFs";

const FutureValueCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);

  const [investAmount, setInvestAmount] = useState<number>(50000);
  const [rateOfReturn, setRateOfReturn] = useState<number>(12);
  const [resultInvestment, setResultInvestment] = useState<number>(50000);
  const [resultPeriod, setResultPeriod] = useState<number>(10);
  const [gains, setGains] = useState<number>(155292);

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
      
    // let i:number = (rateOfReturn / 100) / 12;

    let lumpsums:number = investAmount * Math.pow((1 + rateOfReturn / 100), investmentPeriod);
    let lumpsum:number = Math.round(lumpsums)
    // let gains:number = lumpsum - investAmount
    setResultInvestment(investAmount);
    setGains(lumpsum);
    setResultPeriod(investmentPeriod)
    // setSgains(getMachine(gains));
    // window.scrollTo(500, 500);
    // setCalculateCheck(1)
    // setLoader("none");
    // setChartPresentValue(investment);
    // setChartGain(gains);
    }
  };
  const valueForGraph = (data: number): number[] => {
    let graphValue: number[] = [];
    for (let i = resultPeriod; i > 0; i--) {
      graphValue.push(Math.round(data / i));
    }
    console.log("graphValue", graphValue);

    return graphValue;
  };

  const yearInString = (year:number): number[] => {
    let xAxisArray: number[] = [];
    for (let i = 1; i <= year; i++) {
      xAxisArray.push(i);
    }
    return xAxisArray;
  };

  const state: ChartState = {
    series: [
      {
        name: "Market Value",
        data: valueForGraph(gains),
      },
      {
        name: "Investment Amount",
        data: valueForGraph(resultInvestment),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 1000,
        stacked: true,
      },
      colors: ["#CCD2FF", "#1A35FE"],
      plotOptions: {
        bar: {
          borderRadius: 3, // ✅ Adds rounded corners to the top of bars
          borderRadiusApplication: "end",
          horizontal: false,
          dataLabels: {
            total: {
              enabled: false,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 0,
        colors: ["#1A35FE"],
      },
      title: {
        text: "Investment Performance",
      },
      dataLabels: {
        enabled: false, // ✅ Hides the numbers above bars
      },
      grid: {
        show: false, // ✅ Removes the background grey lines
      },
      xaxis: {
        categories: yearInString(resultPeriod),
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
        axisTicks: {
          show: false, // ✅ Removes ticks (small lines under labels)
        },
      },
      yaxis: {
        labels: {
          show: false, // ✅ Removes vertical numbers (Y-axis labels)
        },
      },

      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Future Value Calculator</h4>
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
                    period of 10 years at a <span className="fw600">{resultPeriod}%</span>{" "}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FutureValueCalculator;
