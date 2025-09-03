import { useRef, useState } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { amountHandler,percentageHandler, pmtvalue, presentValue } from "../../services/utils/calculatorsFs";
import { useNavigate } from "react-router-dom";

const MarriageCalculator = () => {
  const navigate = useNavigate()
  const [childAge, setChildAge] = useState<number>(8);
  const [marriedAge, setMarriedAge] = useState<number>(18);
  const [requiredAmount, setRequiredAmount] = useState<number>(1000000);
  const [annualSaving, setAnnualSaving] = useState<number>(30000);
  const [rateOfReturn, setRateOfReturn] = useState<number>(12);
  const [expectedInflation, setExpectedInflation] = useState<number>(6);
  const [inflationAdjustCost, setInflationAdjustCost] = useState<number>(2540352);
  const [futureValueOfSaving, setFutureValueOfSaving] = useState<number>(1282598);
  const [addtionalFundRequiredToMeetExpences, setAddtionalFundRequiredToMeetExpences] = useState<number>(1257753);
  const [oneTimeInvestmentRequired, setOneTimeInvestmentRequired] = useState<number>(205167);
  const [monthlyInvestmentRequired, setMonthlyInvestmentRequired] = useState<number>(2185);

  //input refs

  const requiredAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const annualSavingRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const rateOfReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedInflationRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const submit =async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidate = [
      requiredAmountRef.current?.validate(requiredAmount),
      annualSavingRef.current?.validate(annualSaving),
      rateOfReturnRef.current?.validate(rateOfReturn),
      expectedInflationRef.current?.validate(expectedInflation),
    ].every((value) => value == true);

    if (isValidate) {
      let years:number = marriedAge - childAge;
      let adjustedAmountRequired:number =
      requiredAmount * Math.pow(1 + expectedInflation / 100, years);
      let futureValue:number =
        (annualSaving * (Math.pow(1 + rateOfReturn / 100, years) - 1)) /
        (rateOfReturn / 100);
      let additionalFund = adjustedAmountRequired - futureValue


      let nperiod = (years * 12)
      let rate = (rateOfReturn / 12) / 100

      let monthlyInvestRequired =await pmtvalue(rate, nperiod, 0, -additionalFund, 0)

      let lumpsumRate = rateOfReturn / 100;
      let lumpsumRequired =await presentValue(lumpsumRate, years, 0, additionalFund);

      setAddtionalFundRequiredToMeetExpences(Math.trunc(additionalFund));
      setFutureValueOfSaving(Math.trunc(futureValue));
      setInflationAdjustCost(Math.trunc(adjustedAmountRequired));
      setMonthlyInvestmentRequired(Math.trunc(monthlyInvestRequired))
      setOneTimeInvestmentRequired(Math.trunc(lumpsumRequired));
    }
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Marriage Calculator</h4>
            <p className="fs14px">
             This calculator helps you to estimate the future expenditure needed at the time of marriage of your child.
            </p>
          </div>

          <div className="col-12">
            <div className="row ">
              <div className="col-lg-6 co-sm-12 col-md12 ">
                <div className="card border-0 shadow p-2">
                  <div className="card-body">
                    <form onSubmit={submit}>
                      <RangeBar
                        label={"CHILD AGE TODAY (YEARS)"}
                        maxLimit={30}
                        value={childAge}
                        setValue={setChildAge}
                      />
                      <RangeBar
                        label={"CHILD WILL GET MARRIED AT THE AGE"}
                        maxLimit={30}
                        value={marriedAge}
                        setValue={setMarriedAge}
                      />
                      <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1" className="fs12px">
                          AMOUNT REQUIRED FOR WEDDING AS ON TODAY
                        </label>

                        <ValidatedInput
                          ref={requiredAmountRef}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="₹ 10,00,000"
                          onChange={(e) =>
                            amountHandler(e, 100000000, setRequiredAmount)
                          }
                          value={requiredAmount}
                          validate={[isNotEmpty, minAmount(100)]}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          ANNUAL SAVINGS
                        </label>
                        <ValidatedInput
                          ref={annualSavingRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="₹ 5,00,000"
                          onChange={(e) =>
                            amountHandler(e, 2500000, setAnnualSaving)
                          }
                          value={annualSaving}
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXPECTED RATE OF RETURNS (%)
                        </label>
                        <ValidatedInput
                          ref={rateOfReturnRef}
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="12"
                          onChange={(e) =>
                            percentageHandler(e, 50, setRateOfReturn)
                          }
                          value={rateOfReturn}
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXPECTED INFLATION (%)
                        </label>
                        <ValidatedInput
                          ref={expectedInflationRef}
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="6"
                          value={expectedInflation}
                          onChange={(e) =>
                            percentageHandler(e, 50, setExpectedInflation)
                          }
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                      </div>
                      <button type="submit" className="customButton px-3 mt-3">
                        Calculate
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 co-sm-12 col-md-12 mTopForMobile">
                <div className="card border-0 shadow p-2">
                  <div className="card-body">
                    <h5 className=" fw-semi-bold mb-1">Result</h5>
                    <p className="fs12px mb-0 mt-3">INFLATION ADJUSTED COST</p>
                    <h6 className="mt-1">₹{inflationAdjustCost.toLocaleString('en-IN')}</h6>
                    <p className="fs12px mb-0 mt-3">FUTURE VALUE OF SAVINGS</p>
                    <h6 className="mt-1">₹{futureValueOfSaving.toLocaleString('en-IN')}</h6>
                    <p className="fs12px mb-0 mt-3">
                      ADDITIONAL FUNDS REQUIRED TO MEET EXPENSES
                    </p>
                    <h6 className="mt-1">₹{addtionalFundRequiredToMeetExpences.toLocaleString('en-IN')}</h6>
                    <p className="fs12px mb-0 mt-3">
                      ONE TIME INVESTMENT REQUIRED
                    </p>
                    <h6 className="mt-1">₹{oneTimeInvestmentRequired.toLocaleString('en-IN')}</h6>
                    <p className="fs12px mb-0 mt-3">
                      MONTHLY INVESTMENT REQUIRED
                    </p>
                    <h6 className="mt-1">₹{monthlyInvestmentRequired.toLocaleString('en-IN')}</h6>
                  </div>
                </div>
                <button type="button" className="btn investBtn mt-2" onClick={()=>{navigate("/all-mutual-funds")}}>
                  Invest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarriageCalculator;
