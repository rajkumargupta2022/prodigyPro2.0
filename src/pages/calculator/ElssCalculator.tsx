import { useRef, useState } from "react";
import NavBar from "../../components/Navbar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { amountHandler } from "../../services/calculatorsFs";
import { isNotEmpty } from "../../services/Validated-inputs/validations";

const ElssCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [taxSlab, setTaxSlab] = useState<number>(0);

  const investmentAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const taxSlabRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      investmentAmountRef.current?.validate(investmentAmount),
      taxSlabRef.current?.validate(taxSlab),
    ].every((value) => value === true);

    if (isValidated) {
      alert("Form Submitted.");
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
                        INVESTMENT AMOUNT (YEARS)
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
                          amountHandler(e, 50000, setInvestmentAmount)
                        }
                        validate={isNotEmpty}
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
                      <ValidatedInput
                        ref={taxSlabRef}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="20%"
                        value={taxSlab}
                        onChange={(e) => amountHandler(e, 50000, setTaxSlab)}
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
                  <p className="fs12px mb-0 mt-3">TOTAL TAX SAVED U/S 80(C)</p>
                  <h6 className="mt-1">₹10,400</h6>
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
