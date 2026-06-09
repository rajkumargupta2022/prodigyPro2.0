import NavBar from "../../components/Navbar";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  maxAmount,
  minAmount,
} from "../../services/Validated-inputs/validations";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { percentageHandler } from "../../services/utils/calculatorsFs";
interface SwpCalculatorModelData {
  totalWithdrawalAmount: number;
  totalBalanceAmount: number;
  totalProfit: number;
  lumpsum: number;
  investmentTenure: number;
}

interface CalculateSwpFvParams {
  P: number;
  R: number;
  T: number;
  W: number;
  withdrawalAtStart?: boolean;
}
interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}
interface resultVlaueKeys {
  lumpsumAmount: number;
  investmentPeriod: number;
  expectedReturn: number;
  widthdrawalAmount: number;
  startSWP: number;
}
const resultVlaueInitial: resultVlaueKeys = {
  lumpsumAmount: 1200000,
  investmentPeriod: 10,
  expectedReturn: 11,
  widthdrawalAmount: 10000,
  startSWP: 0,
}
const SWPCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(1200000);
  const [expectedReturn, setExpectedReturn] = useState<number>(11);
  const [widthdrawalAmount, setWidthdrawalAmount] = useState<number>(10000);
  const [widthdrawalAmountInPercentage, setWidthdrawalAmountInPercentage] = useState<number>(23.08);
  const [byAmount, setByAmount] = useState<string>("activeButton")
  const [byPercentage, setByPercentage] = useState<string>("")
  const [totalBalanceAmount, setTotalBalanceAmount] = useState<number>(1301402)
  const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState<number>(1200000)
  const [totalProfit, setTotalProfit] = useState<number>(1301402)
  const [startSWP, setStartSWP] = useState<number>(0)
  const [resultValue, setResultValue] = useState<resultVlaueKeys>(resultVlaueInitial)

  const lumpsumAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const widthdrawalAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);


  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidate = [
      lumpsumAmountRef.current?.validate(lumpsumAmount),
      expectedReturnRef.current?.validate(expectedReturn),
      widthdrawalAmountRef.current?.validate(widthdrawalAmount),
    ].every((value) => value === true);

    if (isValidate) {
      alert("form submitted");
    }
  };

  const handleWithdrawalBy = (key: number) => {
    if (key === 1) {
      setByAmount("activeButton")
      setByPercentage("")
      setWidthdrawalAmountInPercentage(0)
      setWidthdrawalAmount(0)
    } else {
      setByAmount("")
      setByPercentage("activeButton")
      setWidthdrawalAmountInPercentage(0)
      setWidthdrawalAmount(0)
    }
  }

  const lumpsumAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.trim());
    if (value < 100000001) {
      setLumpsumAmount(value)
      calculateByLumpsum(value)
      setWidthdrawalAmount(0)
      setWidthdrawalAmountInPercentage(0)
    }
  };
  const withdrawalPercentageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.trim());
    if (value < 101 && lumpsumAmount > 0) {
      setWidthdrawalAmountInPercentage(value)
      calculateAmount(value)
    } else if (lumpsumAmount < 1) {
      setWidthdrawalAmountInPercentage(0)
    } else {
      setWidthdrawalAmountInPercentage(100)
      calculateAmount(100)
    }

  };
  const withdrawalAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.trim());
    if (value <= lumpsumAmount) {
      setWidthdrawalAmount(value)
      calculatePercentage(value)
    } else {
      setWidthdrawalAmount(lumpsumAmount)
      calculatePercentage(lumpsumAmount)
    }

  };


  const calculatePercentage = (enteredAmount: number) => {
    if (lumpsumAmount > 1) {
      let ress = (enteredAmount * 100) / lumpsumAmount
      setWidthdrawalAmountInPercentage(ress)
    }
  }
  const calculateAmount = (enteredPercentage: number) => {
    if (lumpsumAmount > 1) {
      let ress = (enteredPercentage / 100) * lumpsumAmount
      setWidthdrawalAmount(ress)
    }
  }
  const calculateByLumpsum = (lumpsum: number) => {
    if (byAmount === "activeButton" && widthdrawalAmount > 0) {
      let ress = (widthdrawalAmount * 100) / lumpsum
      setWidthdrawalAmountInPercentage(ress)
    } else if (byPercentage === "activeButton" && widthdrawalAmountInPercentage > 0) {
      let ress = (widthdrawalAmountInPercentage / 100) * lumpsumAmount
      setWidthdrawalAmount(ress)
    }
  }

  const calculateREsult = async (e: React.FormEvent) => {
    e.preventDefault()
    if (startSWP > 0) {
      calcualteFv()
    } else {
      const swpData = calculateSwpFv({ P: lumpsumAmount, R: expectedReturn, T: investmentPeriod, W: widthdrawalAmount, withdrawalAtStart: false })
      setTotalBalanceAmount(swpData.totalBalanceAmount)
      setTotalWithdrawalAmount(swpData.totalWithdrawalAmount)
      setTotalProfit(swpData.totalProfit)
      setResultValue({
        lumpsumAmount: lumpsumAmount,
        investmentPeriod: investmentPeriod,
        expectedReturn: expectedReturn,
        widthdrawalAmount: widthdrawalAmount,
        startSWP: startSWP,
      })
    }
  }
  const calcualteFv = async () => {
    let lumpsums: number = lumpsumAmount * Math.pow((1 + expectedReturn / 100), startSWP);
    let lumpsum: number = Math.round(lumpsums);
    console.log("lumpsum", startSWP, investmentPeriod, lumpsum)
    const swpData = calculateSwpFv({ P: lumpsum, R: expectedReturn, T: (investmentPeriod - startSWP), W: widthdrawalAmount, withdrawalAtStart: false })
    setTotalBalanceAmount(swpData.totalBalanceAmount)
    setTotalWithdrawalAmount(swpData.totalWithdrawalAmount)
    setTotalProfit(swpData.totalProfit)
    setResultValue({
      lumpsumAmount: lumpsumAmount,
      investmentPeriod: investmentPeriod,
      expectedReturn: expectedReturn,
      widthdrawalAmount: widthdrawalAmount,
      startSWP: startSWP,
    })
    console.log("swpData", swpData)
  }



  const annualRateToMonthlyRate = (R: number) => {
    return Math.pow(1 + R / 100, 1 / 12) - 1;
  };

  const calculateSwpFv = ({ P, R, T, W, withdrawalAtStart = false, }: CalculateSwpFvParams): SwpCalculatorModelData => {

    const n = T * 12;
    const r = annualRateToMonthlyRate(R);
    const totalWithdrawal = W * n;

    let fv: number;
    let totalProfit: number;

    if (r === 0) {
      fv = P - totalWithdrawal;
      totalProfit = fv + totalWithdrawal - P;

      return {
        totalWithdrawalAmount: totalWithdrawal,
        totalBalanceAmount: Math.round(fv),
        totalProfit: Math.round(totalProfit),
        lumpsum: P,
        investmentTenure: T,
      };
    }

    const growth = Math.pow(1 + r, n);

    let annuity = (growth - 1) / r;

    if (withdrawalAtStart) {
      annuity *= (1 + r);
    }

    fv = (P * growth) - (W * annuity);

    if (fv < 0) {
      const maxWithdrawal = (P * growth) / annuity;

      throw new Error(
        `Maximum allowed withdrawal is ${Math.round(maxWithdrawal)}`
      );
    }

    totalProfit = fv + totalWithdrawal - P;

    return {
      totalWithdrawalAmount: totalWithdrawal,
      totalBalanceAmount: Math.round(fv),
      totalProfit: Math.round(totalProfit),
      lumpsum: P,
      investmentTenure: T,
    };
  };

  const yearInString = (): string[] => {
    let xAxisArray: string[] = [];
    for (let i = 1; i <= resultValue.investmentPeriod; i++) {
      xAxisArray.push(i + "Y");
    }
    return xAxisArray;
  };
  const valueForGraph = (type: "market" | "invested"): number[] => {
    const graphValue: number[] = [];

    if (type === "market") {

      // SWP starts immediately
      if (resultValue.startSWP === 0) {
        for (let i = 1; i <= resultValue.investmentPeriod; i++) {
          const swpData = calculateSwpFv({
            P: resultValue.lumpsumAmount,
            R: resultValue.expectedReturn,
            T: i,
            W: resultValue.widthdrawalAmount,
            withdrawalAtStart: false,
          });

          graphValue.push(swpData.totalBalanceAmount);
        }
      }

      // SWP starts after some years
      else {
        const swpCorpus = Math.round(
          resultValue.lumpsumAmount * Math.pow(1 + resultValue.expectedReturn / 100, resultValue.startSWP)
        );

        // Growth phase (No SWP)
        for (let i = 1; i <= resultValue.startSWP; i++) {
          graphValue.push(
            Math.round(
              resultValue.lumpsumAmount *
              Math.pow(1 + resultValue.expectedReturn / 100, i)
            )
          );
        }

        // SWP phase
        for (let i = 1; i <= resultValue.investmentPeriod - resultValue.startSWP; i++) {
          const swpData = calculateSwpFv({
            P: swpCorpus,
            R: resultValue.expectedReturn,
            T: i,
            W: resultValue.widthdrawalAmount,
            withdrawalAtStart: false,
          });

          graphValue.push(swpData.totalBalanceAmount);
        }
      }
    }

    if (type === "invested") {
      if (resultValue.startSWP > 0) {
        for (let i = 1; i <= resultValue.startSWP; i++) {
          graphValue.push(0);
        }

        for (let i = 1; i <= resultValue.investmentPeriod - resultValue.startSWP; i++) {
          graphValue.push(resultValue.widthdrawalAmount * 12 * i);
        }
      } else {
        for (let i = 1; i <= resultValue.investmentPeriod; i++) {
          graphValue.push(resultValue.widthdrawalAmount * 12 * i);
        }
      }
    }

    return graphValue;
  };
  const state: ChartState = {
    series: [
      {
        name: "Balance Amount",
        data: valueForGraph("market"),
      },
      {
        name: "Total Withdrawal",
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



  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>SWP Calculator</h4>
            <p className="fs14px">
              This calculator helps you to plan your regular withdrawals for a steady income.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        LUMPSUM AMOUNT
                      </label>
                      <ValidatedInput
                        ref={lumpsumAmountRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=""
                        value={lumpsumAmount}
                        onChange={(e) =>
                          lumpsumAmountHandler(e)
                        }
                        validate={[isNotEmpty, minAmount(500), maxAmount(100000000)]}
                      />
                    </div>
                    <RangeBar
                      label={"INVESTMENT PERIOD"}
                      maxLimit={30}
                      value={investmentPeriod}
                      setValue={setInvestmentPeriod}
                    />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        EXPECTED RETURN (% P.A.)
                      </label>
                      <ValidatedInput
                        ref={expectedReturnRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={expectedReturn}
                        onChange={(e) =>
                          percentageHandler(e, 50, setExpectedReturn)
                        }
                        validate={[isNotEmpty, minAmount(1)]}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="fs12px mt-3"
                      >
                        SET WITHDRAWAL BY
                      </label>
                      <br />
                      <button
                        type="button"
                        className={`btn shortcutValue ${byAmount}  mx-1  rounded-3`}
                        onClick={() => handleWithdrawalBy(1)}
                      >
                        Amount
                      </button>
                      <button
                        type="button"
                        className={`btn shortcutValue ${byPercentage}  mx-1  rounded-3`}
                        onClick={() => handleWithdrawalBy(2)}
                      >
                        Percentage (%)
                      </button>
                    </div>

                    {
                      byAmount === "activeButton" ? <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1" className="fs12px">
                          MONTHLY WITHDRAWAL AMOUNT
                        </label>
                        <ValidatedInput
                          ref={widthdrawalAmountRef}
                          type="text"
                          className="form-control"
                          id="exampleInputword1"
                          placeholder=""
                          value={widthdrawalAmount}
                          onChange={(e) =>
                            withdrawalAmountHandler(e)
                          }
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                        <small className="fs12px"> Percentage: {widthdrawalAmountInPercentage.toFixed(2)}%</small>
                      </div> : <div className="form-group mt-3">
                        <label htmlFor="monthlyWITHDRAWAL" className="fs12px">
                          MONTHLY WITHDRAWAL (% p.m)
                        </label>
                        <ValidatedInput
                          ref={widthdrawalAmountRef}
                          type="text"
                          className="form-control"
                          id="monthlyWITHDRAWAL"
                          placeholder=""
                          value={widthdrawalAmountInPercentage}
                          onChange={(e) =>
                            withdrawalPercentageHandler(e)
                          }
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                        <small className="fs12px"> Amount: {widthdrawalAmount.toLocaleString("en-In", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}</small>
                      </div>
                    }

                    {/* <div className="form-group mt-3">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        START SWP
                      </label>
                      <select
                        className="form-control"
                        value={startSWP}
                        onChange={(e) => setStartSWP(Number(e.target.value))}
                      >
                        <option value={0}>Immediately</option>
                        <option value={1}>After 1 year</option>
                        <option value={2}>After 2 years</option>
                        <option value={3}>After 3 years</option>
                        <option value={5}>After 5 years</option>
                        <option value={10}>After 10 years</option>
                      </select>
                    </div> */}

                    <div className="investment-slider mt-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label text-muted fs12px">
                          START SWP
                        </label>

                        <label className="form-label text-end fs16px mb-0">
                          {`${startSWP} ${startSWP <= 1 ? "Year" : "Years"}`}
                        </label>
                      </div>

                      <div className="position-relative">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="1"
                          value={startSWP}
                          onChange={(e) => setStartSWP(Number(e.target.value))}
                          className="range-slider"
                          style={{
                            background: `linear-gradient(
                            to right,
                            #5a67d8 ${(startSWP / 10) * 100}%,
                            #e0e7ff ${(startSWP / 10) * 100}%
                          )`,
                          }}
                        />

                        <div className="range-labels d-flex justify-content-between mt-2">
                          <span className="text-muted fs12px">Immediately</span>
                          <span className="text-muted fs12px">10 Years</span>
                        </div>
                      </div>
                    </div>
                    <small className="fs12px lh-base">
                      To get benefits of LTCG, there should be 12 months' gap between investment date and start of SWP.
                    </small><br />
                    <button type="submit" className="customButton px-3 mt-3" onClick={calculateREsult}>
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
                  <p className="fs12px mb-0 mt-3">TOTAL BALANCE AMOUNT </p>
                  <h6 className="mt-1">₹{totalBalanceAmount.toLocaleString("en-In")}</h6>
                  <p className="fs12px mb-0 mt-3">TOTAL WITHDRAWAL AMOUNT</p>
                  <h6 className="mt-1">₹{totalWithdrawalAmount.toLocaleString("en-In")}</h6>
                  <p className="fs12px mb-0 mt-3">TOTAL PROFIT</p>
                  <h6 className="mt-1"> ₹{totalProfit.toLocaleString("en-In")}</h6>
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
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SWPCalculator;
