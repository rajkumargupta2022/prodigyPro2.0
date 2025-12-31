import NavBar from "../../components/Navbar";
import Chart from "react-apexcharts";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { isNotEmpty } from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
interface ChartState {
  options: object;
  series: number[];
  // labels: string[];
  colors: string[];
}

const SipWithAnnualIncrease = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interest, setInterest] = useState<number>(9.8);
  const [monthyEmi, setMonthyEmi] = useState<number>(13214.85);
  const [principal, setPrincipal] = useState<number>(1000000);
  const [totalinterest, setTotalInterest] = useState<number>(585782);
  const [totalAmount, setTotalAmount] = useState<number>(1585800);
  const [resultLoanAmount, setResultLoanAmount] = useState<number>(1000000);

  const loanAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const interestRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const state: ChartState = {
    options: {
      dataLabels: {
        enabled: false, // Disable percentage or value labels
      },
      colors: ["#CCD2FF", "#1A35FE"],
      tooltip: {
        enabled: false, // Disable hover tooltip
      },
      labels: [`Total Interest (${totalinterest.toLocaleString("en-IN")})`, `Principal Amount (${principal.toLocaleString("en-IN")})`,],
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
    series: [resultLoanAmount, totalinterest,],
    colors: ["#fff", "#FF4560"],
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      loanAmountRef.current?.validate(loanAmount),
      interestRef.current?.validate(interest),
    ].every((value) => value === true);

    if (isValidated) {
      let totalMonths: number = investmentPeriod * 12;
      let monthlyRate = (interest / 12) / 100;

      let monthlyEmiAmount: number =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

      let totalAmount: number = monthlyEmiAmount * totalMonths;
      let totalInterest: number = totalAmount - loanAmount;
      setMonthyEmi(Math.trunc(monthlyEmiAmount))
      setPrincipal(loanAmount)
      setTotalInterest(Math.trunc(totalInterest))
      setTotalAmount(Math.trunc(totalAmount))
      setResultLoanAmount(loanAmount)
    }
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>SIP with Annual Increase</h4>
            <p className="fs14px">
              Project your wealth growth with yearly SIP step-ups for smarter long-term planning.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        HOW MUCH YOU CAN INVEST THROUGH MONTHLY SIP?
                      </label>
                      <ValidatedInput
                        ref={loanAmountRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="₹ 100,000"
                        value={loanAmount}
                        onChange={(e) =>
                          amountHandler(e, 100000, setLoanAmount)
                        }
                        validate={isNotEmpty}
                      />
                    </div>
                     <RangeBar
                      label={"HOW MANY MONTHS WILL YOU CONTINUE THE SIP?"}
                      maxLimit={30}
                      value={investmentPeriod}
                      setValue={setInvestmentPeriod}
                    />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                       EXPECTED SIP RETURN RATE (% p.a)
                      </label>
                      <ValidatedInput
                        ref={interestRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={interest}
                        onChange={(e) => percentageHandler(e, 100, setInterest)}
                        validate={isNotEmpty}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                       HOW MUCH ANNUALLY INCREASE MONTHLY SIP? (% p.a)
                      </label>
                      <ValidatedInput
                        ref={interestRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={interest}
                        onChange={(e) => percentageHandler(e, 100, setInterest)}
                        validate={isNotEmpty}
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
                  <div className="row">
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL  SIP AMOUNT INVESTED WITHOUT ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{monthyEmi.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL GROWTH WITH OUT ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{principal.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL FUTURE VALUE (SIP INVESTMENT + RETIRNS, NO ANNUAL INCREASE)</p>
                      <h6 className="mt-1">₹{totalinterest.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL  SIP AMOUNT INVESTED WITH ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{totalAmount.toLocaleString('en-IN')}</h6>
                    </div>
                     <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL GROWTH WITH ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{totalinterest.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL FUTURE VALUE (SIP + GROWTH, WITH ANNUAL INCREASE)</p>
                      <h6 className="mt-1">₹{totalAmount.toLocaleString('en-IN')}</h6>
                    </div>
                  </div>
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

export default SipWithAnnualIncrease;
