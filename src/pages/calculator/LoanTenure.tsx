import NavBar from "../../components/Navbar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { useState } from "react";
import { isNotEmpty } from "../../services/Validated-inputs/validations";
import { amountForMax, amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
import { errorToast } from "../../services/utils/toast";
export default function LoanTenure() {

  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [emi, setEmi] = useState<number>(10000);
  const [rate, setRate] = useState<number>(11.5);
  // const [displayResult, setDisplayResult] = useState<String>("5 Years and 9 Months");
  const [years, setYears] = useState<number>(5);
  const [months, setMonths] = useState<number>(9);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emi >= loanAmount) {
      errorToast("EMI amount should be less than loan amount");
      return;
    }
     if (loanAmount < 200000 || loanAmount > 500000000) {
      errorToast("Loan amount should be between 2,00,000 and 50,00,00,000");
      return;
    }
     if (emi < 1000 || emi > 10000000) {
      errorToast("EMI amount should be between 1,000 and 10,000,000");
      return;
    }
     if (rate < 5 || rate > 50) {
      errorToast("Interest rate should be between 5% and 50%");
      return;
    }
   loanTenureCalculator(loanAmount, rate, emi)
     
  };

 function loanTenureCalculator(p:number, rate:number, emi:number) {
  const r = (rate / 100) / 12;
  const div = emi - (p * r);

  if (div <= 0) {
    errorToast(
      `Minimum EMI amount for the given inputs can be ${Math.ceil(p * r + 1)}`
    );
    return
  }

 let allMonths =Math.ceil(
    Math.log(emi / div) / Math.log(1 + r)
  )
  setYears(Math.floor(allMonths / 12));
  setMonths(allMonths % 12);
}
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
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        LOAN AMOUNT (OUTSTANDING)
                      </label>
                    </div>
                    <ValidatedInput
                      className="form-control"
                      value={loanAmount}
                      onChange={(e) =>
                        amountHandler(e, 500000000, setLoanAmount)
                      }
                      validate={isNotEmpty}
                    />


                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        EMI AMOUNT
                      </label>

                    </div>
                    <ValidatedInput
                      className="form-control"
                      value={emi}
                      onChange={(e) =>
                        amountForMax(e, 10000000, setEmi)
                      }
                      validate={isNotEmpty}
                    />
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        INTEREST RATE (%)
                      </label>
                      <ValidatedInput
                        className="form-control"
                        type="number"
                        value={rate}
                        onChange={(e) =>
                          percentageHandler(e, 50, setRate)
                        }
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