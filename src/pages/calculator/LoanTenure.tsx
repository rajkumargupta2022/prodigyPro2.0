import NavBar from "../../components/Navbar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { useState } from "react";
import { isNotEmpty } from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
import { errorToast } from "../../services/utils/toast";
export default function LoanTenure() {

  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [emi, setEmi] = useState<number>(10000);
  const [rate, setRate] = useState<number>(11.5);
  const [displayResult, setDisplayResult] = useState<String>("5 Years and 9 Months");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emi >= loanAmount) {
      errorToast("EMI amount should be less than loan amount");
      return;
    }
    else if (loanAmount < 10000 || loanAmount > 250000000) {
      errorToast("Loan amount should be between 10,000 and 250,000,000");
      return;
    }
    else if (emi < 1000 || emi > 10000000) {
      errorToast("EMI amount should be between 1,000 and 10,000,000");
      return;
    }
    else if (rate < 5 || rate > 50) {
      errorToast("Interest rate should be between 5% and 50%");
      return;
    }
    else {
      const r = (rate / 100) / 12;

      const value = emi - (loanAmount * r);

      if (value <= 0) {
        errorToast("EMI amount is too less");
        return;
      }

      const tenure = Math.ceil(Math.log(emi / value) / Math.log(1 + r));
      setDisplayResult(
        tenure >= 12
          ? `${Math.floor(tenure / 12)} Year${Math.floor(tenure / 12) > 1 ? "s" : ""}${tenure % 12 > 0
            ? ` and ${Math.floor(tenure % 12)} Month${Math.floor(tenure % 12) > 1 ? "s" : ""}`
            : ""
          }`
          : `${Math.floor(tenure)} Month${Math.floor(tenure) > 1 ? "s" : ""}`
      );
    }
  };
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
                        amountHandler(e, 100000, setLoanAmount)
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
                        amountHandler(e, 10000000, setEmi)
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
                      <p className="mt-1">{displayResult}</p>
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