import NavBar from "../../components/Navbar";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { isNotEmpty } from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
import { useNavigate } from "react-router-dom";


const TargetAmountSIPCalculator = () => {
  const navigate = useNavigate()
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [targetAmount, setTargetAmount] = useState<number>(1000000);
  const [expectedRateOfReturn, setExpectedRateOfReturn] = useState<number>(12);
  const [monthySip, setMonthySip] = useState<number>(10868);
  const [oneTimeInvestment, setOneTimeInvestment] = useState<number>(804933);
  const [totalTargetAmount, setTotalTargetAmount] = useState<number>(1000000);

  const totalTargetAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedRateOfReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

 const annualRateToMonthlyRate = (R: number) => {
    return Math.pow(1 + R / 100, 1 / 12) - 1;
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      totalTargetAmountRef.current?.validate(totalTargetAmount),
      expectedRateOfReturnRef.current?.validate(expectedRateOfReturn),
    ].every((value) => value === true);

    if (isValidated) {
      const monthlyRate = annualRateToMonthlyRate(expectedRateOfReturn);
      const totalMonths = investmentPeriod * 12;

      // Monthly SIP (PMT equivalent)
      const monthlySipValue =
        (targetAmount * monthlyRate) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

      // One-time Lump Sum
      const lumpSum =
        targetAmount / Math.pow(1 + expectedRateOfReturn / 100, investmentPeriod);
      setMonthySip(Math.round(monthlySipValue));
      setOneTimeInvestment(Math.round(lumpSum));
      setTotalTargetAmount(targetAmount);
    }
  };
  const handleRecomendedScheme = () => {
    navigate("/recommended-scheme-goal", {
      state: {
        title: "Recommended Funds",
        paragraph: "Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!",
        investmentPeriod: investmentPeriod
      }
    })
  }
  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Target Amount Calculator</h4>
            <p className="fs14px">
              Calculate the lumpsum and monthly SIP required to achieve your target amount.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        TARGET AMOUNT
                      </label>
                      <ValidatedInput
                        ref={totalTargetAmountRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="₹100,000"
                        value={targetAmount}
                        onChange={(e) =>
                          amountHandler(e, 100000, setTargetAmount)
                        }
                        validate={isNotEmpty}
                      />
                    </div>
                    <div className="form-group">
                      <RangeBar
                        label={"INVESTMENT PERIOD"}
                        maxLimit={30}
                        value={investmentPeriod}
                        setValue={setInvestmentPeriod}
                      />
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        EXPECTED RATE OF RETURN (%P.A.)
                      </label>
                      <ValidatedInput
                        ref={expectedRateOfReturnRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={expectedRateOfReturn}
                        onChange={(e) => percentageHandler(e, 100, setExpectedRateOfReturn)}
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
                      <p className="fs12px mb-0 mt-3">YOUR TARGET AMOUNT</p>
                      <h6 className="mt-1">₹{totalTargetAmount.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">MONTHLY SIP INVESTMENT REQUIRED</p>
                      <h6 className="mt-1">₹{monthySip.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">ONE TIME INVESTMENT REQUIRED</p>
                      <h6 className="mt-1">₹{oneTimeInvestment.toLocaleString('en-IN')}</h6>
                    </div>

                  </div>
                </div>
              </div>
              <button type="button" className="btn investBtn mt-2 shadow-lg" onClick={handleRecomendedScheme}>
                Start Investing
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TargetAmountSIPCalculator;
