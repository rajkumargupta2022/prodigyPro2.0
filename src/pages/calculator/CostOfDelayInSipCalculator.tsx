import { useState, useRef } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  minAmount,
  minEduAge,
} from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler, pmtvalue } from "../../services/utils/calculatorsFs";
import { errorToast } from "../../services/utils/toast";
import { useNavigate } from "react-router-dom";

const CostOfDelayInSipCalculator = () => {
  const navigate = useNavigate()
  const [childAge, setChildAge] = useState<number>(10);
  const [startCollegeAge, setStartCollegeAge] = useState<number>(18);
  const [durationOfEducation, setDurationOfEducation] = useState<number>(3);
  const [costPerYear, setCostPerYear] = useState<number>(500000);
  const [expectedRateofReturn, setExpectedRateofReturn] = useState<number>(12);
  const [expectedInflation, setExpectedInflation] = useState<number>(6);
  const [corpusRequired, setCorpusRequired] = useState<number>(2143352);
  const [oneTimeInvestmentRequired, setOneTimeInvestmentRequired] = useState<number>(904167);
  const [monthlyInvestmentRequired, setMonthlyInvestmentRequired] = useState<number>(13185);

  const costPerYearRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedRateofReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedInflationRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      costPerYearRef.current?.validate(costPerYear),
      expectedRateofReturnRef.current?.validate(expectedRateofReturn),
      expectedInflationRef.current?.validate(expectedInflation),
    ].every((value) => value === true);

    const ageValidation = minEduAge(childAge, startCollegeAge);

    if (ageValidation) {
      errorToast(ageValidation);
      return;
    }

    if (isValidated) {
      var yearleft: number = startCollegeAge - childAge;
      var rate: number = expectedRateofReturn * 0.01;
      var i: number = 0.01 * expectedInflation;
      var FV: number = costPerYear * (Math.pow((1 + i), yearleft));
      var er: number = expectedRateofReturn * 0.01;
      var ei: number = expectedInflation * 0.01;
      var Tot: number = (1 + er) / (1 + ei) - 1;
      // var firstot: number = (1 + er) / (1 + er)
      var nomialRate: number = 12.0 * (Math.pow((1 + rate), (1 / 12.0)) - 1);

      var totalAmtRequired = (FV * ((1 - (Math.pow((1 + Tot), (-durationOfEducation)))) / Tot));

      var lumpsum: number = (totalAmtRequired * (1 / (Math.pow((1 + nomialRate), yearleft))));
      var nominalRateMonthly: number = parseFloat((nomialRate / 12).toFixed(6))
      var monthleft: number = yearleft * 12
      let newsipamt: number = await pmtvalue(nominalRateMonthly, monthleft, 0, -Math.round(totalAmtRequired), 0)
      setCorpusRequired(Math.round(totalAmtRequired))
      setOneTimeInvestmentRequired(Math.round(lumpsum))
      setMonthlyInvestmentRequired(Math.round(newsipamt))
    }
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Cost of Delay in SIP Calculator</h4>
            <p className="fs14px">
             Calculate the difference in portfolio value over time between starting an SIP immediately and at a later date. Understand the consequences of delaying your SIP.
            </p>
          </div>

          <div className="col-12">
            <div className="row ">
              <div className="col-lg-6 co-sm-12 col-md12 ">
                <div className="card border-0 shadow p-2">
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <RangeBar
                        label={"CHILD AGE TODAY (YEARS)"}
                        maxLimit={30}
                        value={childAge}
                        setValue={setChildAge}
                      />
                      <RangeBar
                        label={"COLLEGE START AT AGE"}
                        maxLimit={30}
                        value={startCollegeAge}
                        setValue={setStartCollegeAge}
                      />
                      <RangeBar
                        label={"DURATION OF EDUCATION"}
                        maxLimit={8}
                        value={durationOfEducation}
                        setValue={setDurationOfEducation}
                      />
                      <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1" className="fs12px">
                          APPROX CURRENT COST PER YEAR
                        </label>
                        <ValidatedInput
                          ref={costPerYearRef}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="₹5,00,000"
                          value={costPerYear}
                          onChange={(e) =>
                            amountHandler(e, 100000000, setCostPerYear)
                          }
                          validate={[isNotEmpty, minAmount(100)]}
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
                          ref={expectedRateofReturnRef}
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="12"
                          value={expectedRateofReturn}
                          onChange={(e) =>
                            percentageHandler(e, 50, setExpectedRateofReturn)
                          }
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
                    <p className="fs12px mb-0 mt-3">
                      CORPUS REQUIRED AT START OF COLLEGE
                    </p>
                    <h6 className="mt-1">₹{corpusRequired.toLocaleString('en-IN')}</h6>
                    <hr />
                    <h6>To meet this goal your must invest:</h6>
                    <p className="fs12px mb-0 mt-3">
                      ONE TIME INVESTMENT REQUIRED
                    </p>
                    <h6 className="mt-1">₹{oneTimeInvestmentRequired.toLocaleString('en-IN')}</h6>
                    <p className="fs12px">OR</p>
                    <p className="fs12px mb-0 mt-3">
                      MONTHLY INVESTMENT REQUIRED
                    </p>
                    <h6 className="mt-1">₹{monthlyInvestmentRequired.toLocaleString('en-IN')}</h6>
                  </div>
                </div>
                <button type="button" className="btn investBtn mt-2 shadow-lg" onClick={()=>{navigate("/all-mutual-funds")}}>
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

export default CostOfDelayInSipCalculator;
