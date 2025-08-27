import { useRef, useState } from "react";
import NavBar from "../../components/Navbar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { amountHandler } from "../../services/utils/calculatorsFs";
import {
  isNotEmpty,
  minAmount,
} from "../../services/Validated-inputs/validations";

const ElssCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(12500);
  const [taxSlab, setTaxSlab] = useState<number>(5);
  const [totalTaxSaved, setTotalTaxSaved] = useState<number>(650);

  const investmentAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      investmentAmountRef.current?.validate(investmentAmount),
    ].every((value) => value === true);

    if (isValidated) {
      let taxInvestment: number;
      if (investmentAmount > 150000) {
        taxInvestment = 150000;
      } else {
        taxInvestment = investmentAmount;
      }

      const taxValue: number = (taxInvestment * taxSlab) / 100;
      const taxValuePercent: number = (taxValue * 4) / 100;

      let finalValue: number = taxValue + taxValuePercent;
      finalValue = Math.round(finalValue);

      setTotalTaxSaved(finalValue);

    }
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>ELSS Calculator</h4>
            <p className="fs14px">
              This calculator help to calculate the tax saved by investing in
              ELSS according to your tax slab.
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
                        placeholder="₹ 50,000"
                        value={investmentAmount}
                        onChange={(e) =>
                          amountHandler(e, 150000, setInvestmentAmount)
                        }
                        validate={[isNotEmpty, minAmount(500)]}
                      />
                      <small className="fs12px">
                        Maximum eligible amount for tax deduction u/s 80C is 1.5
                        L
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        YOUR TAX SLAB
                      </label>
                      <select
                        className="form-control"
                        value={taxSlab}
                        onChange={(e) => setTaxSlab(Number(e.target.value))}
                      >
                        <option value="5">5%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
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
                  <p className="fs12px mb-0 mt-3">TOTAL TAX SAVED U/S 80(C)</p>
                  <h6 className="mt-1">₹{totalTaxSaved.toLocaleString("en-IN")}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElssCalculator;
