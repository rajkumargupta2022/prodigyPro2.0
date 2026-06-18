import NavBar from "../../components/Navbar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  maxAmount,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { useNavigate } from "react-router-dom";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

const SipCalculator = () => {
  const navigate = useNavigate()
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [monthlySaving, setMonthlySaving] = useState<number>(10000);
  const [expectedRateOfReturn, setExpectedRateOfReturn] =
    useState<number>(16.5);
  const [resultRateOfReturn, setResultRateOfReturn] =
    useState<number>(16.5);
  const [totalYear, setTotalYear] = useState<number>(10);
  const [totalGains, setTotalGains] = useState<number>(3017292);
  const [totalMonthlySaving, setTotalMonthlySaving] = useState<number>(1200000);
  const [oneMonthSaving, setOneMonthSaving] = useState<number>(10000);

  const monthlySavingRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const returnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const yearInString = (): string[] => {
    let xAxisArray: string[] = [];
    if (totalYear > 16) {
      for (let i = 1; i <= totalYear; i = i + 2) {
        xAxisArray.push(i + "Y");
      }
      if (totalYear % 2 === 0) {
        xAxisArray.push(totalYear + "Y")
      }

    } else {
      for (let i = 1; i <= totalYear; i++) {
        xAxisArray.push(i + "Y");
      }
    }

    return xAxisArray;
  };
  const valueForGraph = (type: "market" | "invested"): number[] => {
    let graphValue: number[] = [];
    let monthlyRate: number = resultRateOfReturn / 12 / 100;

    const calcValue = (years: number) => {
      let months = years * 12;
      if (type === "invested") {
        return oneMonthSaving * months;
      } else {
        if (monthlyRate === 0) return oneMonthSaving * months;
        let futureValue =
          ((oneMonthSaving * (Math.pow(1 + monthlyRate, months) - 1)) /
            monthlyRate) *
          (1 + monthlyRate);
        return Math.round(futureValue);
      }
    };

    if (totalYear > 16) {
      for (let i = 1; i <= totalYear; i = i + 2) {
        graphValue.push(calcValue(i));
      }
      if (totalYear % 2 === 0) {
        graphValue.push(calcValue(totalYear));
      }
    } else {
      for (let i = 1; i <= totalYear; i++) {
        graphValue.push(calcValue(i));
      }
    }
    return graphValue;
  };
  const state: ChartState = {
    series: [
      {
        name: "Market Value",
        data: valueForGraph("market"),
      },
      {
        name: "Invested Amount",
        data: valueForGraph("invested"),
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
        curve: "monotoneCubic",
        width: [2, 2], // ✅ Custom width (3px for first line, 2px for second line)
        colors: ["#357AF6", "#57BE65"],
      },
      xaxis: {
        categories: yearInString(), // ✅ Custom X-axis labels
      },
      tooltip: {
        // x: {
        //   formatter: function (val: any) {
        //     return val; // ✅ Tooltip will also show 1M, 3M, etc.
        //   },
        // },
      },
      grid: {
        show: false, // ✅ Removes background grey lines
      },
    },
  };
 const annualRateToMonthlyRate = (R: number) => {
    return Math.pow(1 + R / 100, 1 / 12) - 1;
  };
  const calculateSip = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      monthlySavingRef.current?.validate(monthlySaving),
      returnRef.current?.validate(expectedRateOfReturn),
    ].every((value) => value === true);

    if (isValidated) {
      let monthlyRate: number = annualRateToMonthlyRate(expectedRateOfReturn);
      let months: number = investmentPeriod * 12;
      let futureValue: number = 0;
      futureValue = ((monthlySaving * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate) * (1 + monthlyRate);

      let mainresults: number = Math.round(futureValue);
      let totalSaving: number = monthlySaving * months;
      let gain: number = mainresults - monthlySaving * months;
      setTotalYear(investmentPeriod);
      setTotalMonthlySaving(totalSaving);
      setOneMonthSaving(monthlySaving);
      setResultRateOfReturn(expectedRateOfReturn)
      // let a = parseInt(totalSaving)
      // let g = parseInt(gains)
      // let gainss = a + g
      setTotalGains(totalSaving + gain);
    }
  };
  const handleRecomendedScheme = () => {
    navigate("/recommended-scheme-goal", {
      state: {
        title: "Recommended",
        paragraph: "Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!",
        investmentPeriod: investmentPeriod,
        newsipamt: monthlySaving,
      }
    })
  }


  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Sip Calculator</h4>
            <p className="fs14px">
              This calculator will help you to calculate the corpus you can accumulate with a regular monthly investments.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={calculateSip}>
                    <div className="form-group my-2">
                      <label htmlFor="monthlysip" className="fs12px">
                        MONTHLY SAVING (₹)
                      </label>
                      <ValidatedInput
                        ref={monthlySavingRef}
                        type="text"
                        className="form-control"
                        value={monthlySaving}
                        onChange={(e) =>
                          amountHandler(e, 1000000, setMonthlySaving)
                        }
                        id="monthlysip"
                        aria-describedby="emailHelp"
                        placeholder=""
                        validate={[isNotEmpty, minAmount(500), maxAmount(1000000)]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expectedrateofreturn" className="fs12px">
                        EXPECTED RATE OF RETURN (% p.a)
                      </label>
                      <ValidatedInput
                        ref={returnRef}
                        type="number"
                        className="form-control"
                        value={expectedRateOfReturn}
                        onChange={(e) =>
                          percentageHandler(e, 50, setExpectedRateOfReturn)
                        }
                        id="expectedrateofreturn"
                        placeholder=""
                        validate={[isNotEmpty, minAmount(1), maxAmount(50)]}
                      />
                    </div>
                    <RangeBar
                      label={"INVESTMENT PERIOD"}
                      maxLimit={30}
                      value={investmentPeriod}
                      setValue={setInvestmentPeriod}
                    />
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
                    If you invest
                    <span className="fw600">
                      {" "}
                      ₹{oneMonthSaving.toLocaleString("en-IN")}
                    </span>{" "}
                    per month for a period of {totalYear} years at a annual return of   <span className="fw600">
                      {" "}
                      {resultRateOfReturn}
                    </span>% your invested amount will be
                    <span className="fw600">
                      {" "}
                      ₹{totalMonthlySaving.toLocaleString("en-IN")}{" "}
                    </span>{" "}
                    and your estimated corpus will grow to <span className="fw600">
                      ₹{totalGains.toLocaleString("en-IN")}{" "}
                    </span>
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
                        type="area"
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

export default SipCalculator;
