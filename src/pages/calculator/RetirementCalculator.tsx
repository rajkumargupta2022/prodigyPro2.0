import { useRef, useState } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { isNotEmpty } from "../../services/Validated-inputs/validations";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<Number>(30);
  const [retirementAge, setRetirementAge] = useState<Number>(60);

  const [monthlyExpenses, setMonthlyExpenses] = useState<string | number>(0);
  const [expectedInflationRate, setExpectedInflationRate] = useState<
    string | number
  >(0);
  const [currentSaving, setCurrentSaving] = useState<string | number>(0);
  const [preRetirementReturns, setPreRetirementReturns] = useState<
    string | number
  >(0);
  const [postRetirementReturns, setPostRetirementReturns] = useState<
    string | number
  >(0);
  const [lifeExpectancy, setLifeExpectancy] = useState<string | number>(0);

  //refs of the input

  const monthlyExpensesRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const expectedInflationRateRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const currentSavingRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const preRetirementReturnsRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const postRetirementReturnsRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const lifeExpectancyRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      monthlyExpensesRef.current?.validate(monthlyExpenses),
      expectedInflationRateRef.current?.validate(expectedInflationRate),
      currentSavingRef.current?.validate(currentSaving),
      preRetirementReturnsRef.current?.validate(preRetirementReturns),
      postRetirementReturnsRef.current?.validate(postRetirementReturns),
      lifeExpectancyRef.current?.validate(lifeExpectancy),
    ].every((value) => value === true);

    if (isValidated) {
      alert("Form submitted");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Retirement Planning</h4>
            <p className="fs14px">
              This calculator help you to see the future expenditure which will
              be incurred at the time when you are retired from active
              employment/service.
            </p>
          </div>

          <div className="col-12">
            <div className="row ">
              <div className="col-lg-6 co-sm-12 col-md12 ">
                <div className="card border-0 shadow p-2">
                  <div className="card-body">
                    <form onSubmit={submit}>
                      <RangeBar
                        label={"CURRENT AGE"}
                        maxLimit={90}
                        value={currentAge}
                        setValue={setCurrentAge}
                      />
                      <RangeBar
                        label={"EXPECTED RETIREMENT AGE"}
                        maxLimit={80}
                        value={retirementAge}
                        setValue={setRetirementAge}
                      />
                      <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1" className="fs12px">
                          MONTHLY EXPENSES FOR CURRENT LIFESTYLE
                        </label>
                        <ValidatedInput
                          ref={monthlyExpensesRef}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="₹ 30,000"
                          value={monthlyExpenses}
                          onChange={(e) => setMonthlyExpenses(e.target.value)}
                          validate={isNotEmpty}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXPECTED INFLATION RATE (%)
                        </label>
                        <ValidatedInput
                          ref={expectedInflationRateRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="6%"
                          value={expectedInflationRate}
                          onChange={(e) =>
                            setExpectedInflationRate(e.target.value)
                          }
                          validate={isNotEmpty}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          CURRENT SAVINGS PER MONTH
                        </label>
                        <ValidatedInput
                          ref={currentSavingRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="₹ 5,000"
                          onChange={(e) => setCurrentSaving(e.target.value)}
                          value={currentSaving}
                          validate={isNotEmpty}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXPECTED PRE-RETIREMENT RETURNS (%)
                        </label>
                        <ValidatedInput
                          ref={preRetirementReturnsRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="12%"
                          value={preRetirementReturns}
                          onChange={(e) =>
                            setPreRetirementReturns(e.target.value)
                          }
                          validate={isNotEmpty}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXPECTED POST-RETIREMENT RETURNS (%)
                        </label>
                        <ValidatedInput
                          ref={postRetirementReturnsRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="7%"
                          value={postRetirementReturns}
                          onChange={(e) =>
                            setPostRetirementReturns(e.target.value)
                          }
                          validate={isNotEmpty}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          LIFE EXPECTANCY POST-RETIREMENT (YRS)
                        </label>
                        <ValidatedInput
                          ref={postRetirementReturnsRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="20"
                          value={postRetirementReturns}
                          onChange={(e) =>
                            setPostRetirementReturns(e.target.value)
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
              <div className="col-lg-6 co-sm-12 col-md-12 mTopForMobile">
                <div className="card border-0 shadow p-2">
                  <div className="card-body">
                    <h5 className=" fw-semi-bold mb-1">Result</h5>
                    <p className="fs12px mb-0 mt-3">YEAR TO RETIREMENT</p>
                    <h6 className="mt-1">30</h6>
                    <p className="fs12px mb-0 mt-3">
                      AMOUNT REQUIRED P.M. - POST RETIREMENT
                    </p>
                    <h6 className="mt-1">₹1,72,305</h6>
                    <p className="fs12px mb-0 mt-3">
                      CORPUS YOU WILL ACCUMULATE WITH CURRENT SAVINGS PER MONTH
                    </p>
                    <h6 className="mt-1">₹1,74,74,821</h6>
                    <p className="fs12px mb-0 mt-3">
                      CORPUS YOU WILL ACCUMULATE WITH EXISTING SAVINGS
                    </p>
                    <h6 className="mt-1">₹50,81,744</h6>
                    <p className="fs12px mb-0 mt-3">SHORTFALL IN AMOUNT</p>
                    <h6 className="mt-1">₹1,51,45,705</h6>
                    <p className="fs12px mb-0 mt-3">
                      EXTRA SAVINGS PER MONTH REQUIRED
                    </p>
                    <h6 className="mt-1">₹4,963</h6>
                  </div>
                </div>
                <button type="button" className="btn investBtn mt-2">
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

export default RetirementCalculator;
