import NavBar from "../../components/Navbar";
import Chart from "react-apexcharts";
import { useState, useRef } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";

interface ChartState {
  options: object;
  series: number[];
  // labels: string[];
  colors: string[];
}

const FDCalculator = () => {
  const [period, setPeriod] = useState<number>(5);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [compound, setCompound] = useState<number>(12);
  const [totalAmountInvested, setTotalAmountInvested] = useState<number>(100000);
  const [totalInterest, setTotalInterest] = useState<number>(34885);
  const [maturityAmount, setMaturityAmount] = useState<number>(134885);

  const state: ChartState = {
    options: {
      dataLabels: {
        enabled: false, // Disable percentage or value labels
      },
      colors: ["#CCD2FF", "#1A35FE"],
      tooltip: {
        enabled: false, // Disable hover tooltip
      },
      labels: [`Total Interest(${totalInterest.toLocaleString("en-IN")})`,`Total amount invested(${totalAmountInvested.toLocaleString("en-IN")})`],
      legend: {
        show: true,
        position: 'bottom', // ✅ Legend at bottom
        horizontalAlign: 'center',
        fontSize: '14px',
        markers: {
          width: 12,
          height: 12,
        },
        onItemHover: {
          highlightDataSeries: false, // ❌ disables slice highlight on legend hover
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none', // Disable hover visual effect
          },
        },
        active: {
          filter: {
            type: 'none', // Disable active (on-click) effect
          },
        },
      },
      
    },
    series: [ totalInterest,totalAmountInvested],
    colors: ["#fff", "#FF4560"],
  };

  const investmentAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const interestRateRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      investmentAmountRef.current?.validate(investmentAmount),
      interestRateRef.current?.validate(interestRate),
    ].every((value) => value === true);

    if (isValidated) {
      let p: number = investmentAmount;
      let t: number = period;
      let r: number = interestRate;
      let n: number = compound;
      
      let pric: number = p;
      let amt: number = 0;
      // let inest: number = 0;
      
      for (let i = 1; i <= t; i++) {
        const val1: number = 1 + r / (100 * n);
        const val2: number = n;
        amt = pric * Math.pow(val1, val2);
        // inest = amt - pric;
        pric = parseFloat(amt.toFixed(0)); // Round to whole number
      }
      
        setTotalAmountInvested(investmentAmount)
      setTotalInterest(Math.round(amt - investmentAmount))
      setMaturityAmount(Math.round(amt))
    }
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>FD Calculator</h4>
            <p className="fs14px">
              This calculator help to calculate the maturity value of your FD
              for a given tenure, ROI and frequency of compounding.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        INVESTMENT AMOUNT
                      </label>
                      <ValidatedInput
                        ref={investmentAmountRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="₹ 1,00,000"
                        value={investmentAmount}
                        onChange={(e) =>
                          amountHandler(e, 10000000, setInvestmentAmount)
                        }
                        validate={[isNotEmpty, minAmount(500)]}
                      />
                    </div>
                    <RangeBar
                      label={"PERIOD"}
                      maxLimit={30}
                      value={period}
                      setValue={setPeriod}
                    />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        INTEREST RATE (%)
                      </label>
                      <ValidatedInput
                        ref={interestRateRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder=""
                        value={interestRate}
                        onChange={(e) =>
                          percentageHandler(e, 20, setInterestRate)
                        }
                        validate={[isNotEmpty, minAmount(1)]}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        COMPOUNDING PERIOD
                      </label>
                      <select
                        className="form-control"
                        value={compound}
                        onChange={(e) => setCompound(Number(e.target.value))}
                      >
                        <option value={12}>Monthly</option>
                        <option value={4}>Quaterly</option>
                        <option value={2}>Half Yearly</option>
                        <option value={1}>Yearly</option>
                      </select>
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
                  <p className="fs12px mb-0 mt-3">TOTAL AMOUNT INVESTED</p>
                  <h6 className="mt-1">₹{totalAmountInvested.toLocaleString("en-IN")}</h6>
                  <p className="fs12px mb-0 mt-3">TOTAL INTEREST</p>
                  <h6 className="mt-1">₹{totalInterest.toLocaleString("en-IN")}</h6>
                  <p className="fs12px mb-0 mt-3">MATURITY AMOUNT</p>
                  <h6 className="mt-1">₹{maturityAmount.toLocaleString("en-IN")}</h6>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 co-sm-12 col-md-12 ">
                  <div className="card border-0 shadow p-0 d-flex justify-content-center align-items-center">
                    <div className="card-body">
                      <div className="donut">
                        <Chart
                          options={state.options}
                          series={state.series}
                          type="donut"
                          width="280"
                        />
                      </div>
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

export default FDCalculator;
