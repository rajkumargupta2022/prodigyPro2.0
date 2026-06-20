import NavBar from "../../components/Navbar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { useState, useEffect, useRef } from "react";
import { amountForMax, amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
export default function LoanTenure() {

  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [emi, setEmi] = useState<number>(10000);
  const [rate, setRate] = useState<number>(11.5);
  // const [displayResult, setDisplayResult] = useState<String>("5 Years and 9 Months");
  const [years, setYears] = useState<number>(5);
  const [months, setMonths] = useState<number>(9);

  const loanAmountRef = useRef<{ validate: (value: number) => boolean }>(null);
  const emiRef = useRef<{ validate: (value: number) => boolean }>(null);
  const rateRef = useRef<{ validate: (value: number) => boolean }>(null);

  const validateLoanAmount = (val: number) => {
    if (val < 200000 || val > 5000000000) return "Loan amount should be between 2,00,000 and 5,00,00,00,000";
    return null;
  };

  const validateEmi = (val: number) => {
    if (val < 1000 || val > 100000000) return "EMI amount should be between 1,000 and 10,000,000";
    if (val >= loanAmount && loanAmount > 0) return "EMI amount should be less than loan amount";
    const r = (rate / 100) / 12;
    const div = val - (loanAmount * r);
    if (div <= 0) return `Minimum EMI amount for the given inputs can be ${Math.ceil(loanAmount * r + 1)}`;
    return null;
  };

  const validateRate = (val: number) => {
    if (val < 5 || val > 50) return "Interest rate should be between 5% and 50%";
    return null;
  };

  useEffect(() => {
    const isLoanValid = loanAmountRef.current?.validate(loanAmount);
    const isEmiValid = emiRef.current?.validate(emi);
    const isRateValid = rateRef.current?.validate(rate);

    if (isLoanValid && isEmiValid && isRateValid) {
      const r = (rate / 100) / 12;
      const div = emi - (loanAmount * r);
      let allMonths = Math.ceil(Math.log(emi / div) / Math.log(1 + r));
      if (!isNaN(allMonths) && isFinite(allMonths) && allMonths >= 0) {
        setYears(Math.floor(allMonths / 12));
        setMonths(allMonths % 12);
      } else {
        setYears(0);
        setMonths(0);
      }
    } else {
      setYears(0);
      setMonths(0);
    }
  }, [loanAmount, emi, rate]);
  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Loan Tenure Calculator</h4>
            <p className="fs14px">
              Calculate loan tenure and plan early foreclosure of your outstanding loan
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form >
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        LOAN AMOUNT (OUTSTANDING)
                      </label>
                    </div>
                    <ValidatedInput
                      ref={loanAmountRef}
                      className="form-control"
                      value={loanAmount}
                      onChange={(e) =>
                        amountHandler(e, 5000000000, setLoanAmount)
                      }
                      validate={validateLoanAmount}
                    />


                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        EMI AMOUNT
                      </label>

                    </div>
                    <ValidatedInput
                      ref={emiRef}
                      className="form-control"
                      value={emi}
                      onChange={(e) =>
                        amountForMax(e, 100000000, setEmi)
                      }
                      validate={validateEmi}
                    />
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        INTEREST RATE (%)
                      </label>
                      <ValidatedInput
                        ref={rateRef}
                        className="form-control"
                        type="number"
                        value={rate}
                        onChange={(e) =>
                          percentageHandler(e, 50, setRate)
                        }
                        validate={validateRate}
                      />
                    </div>

                    
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 co-sm-12 col-md-12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <h5 className=" fw-normal mb-1">Loan Tenure</h5>
                  <div className="row">

                    <div className="col-6">
             <p className="mt-1">
  {years > 0 && `${years} ${years === 1 ? "Year" : "Years"}`}
  {years > 0 && months > 0 && " and "}
  {months > 0 && `${months} ${months === 1 ? "Month" : "Months"}`}
</p>
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
}