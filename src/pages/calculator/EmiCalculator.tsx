import NavBar from "../../components/Navbar";
import Chart from "react-apexcharts";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { isNotEmpty } from "../../services/Validated-inputs/validations";
import { amountHandler } from "../../services/calculatorsFs";
interface ChartState {
  options: object;
  series: number[];
  // labels: string[];
  colors: string[];
}

const EmiCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interest, setInterest] = useState<number>(10);
  const [monthyEmi, setMonthyEmi] = useState<number>(13214.85);
  const [principal, setPrincipal] = useState<number>(1000000);
  const [totalinterest, setTotalInterest] = useState<number>(585782);
  const [totalAmount, setTotalAmount] = useState<number>(1585800);

  const loanAmountRef = useRef<{
    validate: (value: number) => boolean; 
  }>(null);

  const interestRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const state: ChartState = {
    options: {
      colors: ["#CCD2FF", "#1A35FE"],
    },
    series: [44, 95],
    colors: ["#fff", "#FF4560"],
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      loanAmountRef.current?.validate(loanAmount),
      interestRef.current?.validate(interest),
    ].every((value) => value === true);

    if (isValidated) {
      let totalMonths:number = investmentPeriod * 12;
      let monthlyRate = (interest / 12) / 100;
  
      let monthlyEmiAmount:number =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
      let totalAmount:number = monthlyEmiAmount * totalMonths;
      let totalInterest:number = totalAmount - loanAmount;
      setMonthyEmi(Math.floor(monthlyEmiAmount))
      setPrincipal(loanAmount)
      setTotalInterest(Math.floor(totalInterest))
      setTotalAmount(Math.floor(totalAmount))
    }
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>EMI Calculator</h4>
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
                        LOAN AMOUNT
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
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        INTEREST RATE (%)
                      </label>
                      <ValidatedInput
                        ref={interestRef}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={interest}
                        onChange={(e) => amountHandler(e, 100, setInterest)}
                        validate={isNotEmpty}
                      />
                    </div>
                    <RangeBar
                      label={"PERIOD"}
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
                  <div className="row">
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">YOUR MONTHLY EMI</p>
                      <h6 className="mt-1">₹{monthyEmi.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">principle</p>
                      <h6 className="mt-1">₹{principal.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL INTEREST</p>
                      <h6 className="mt-1">₹{totalinterest.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL AMOUNT</p>
                      <h6 className="mt-1">₹{totalAmount.toLocaleString('en-IN')}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 co-sm-12 col-md-12 ">
                  <div className="card border-0 shadow p-0">
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

export default EmiCalculator;
