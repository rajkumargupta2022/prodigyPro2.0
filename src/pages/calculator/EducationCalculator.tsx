import { useState, useRef } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";

const EducationCalculator = () => {
  const [childAge, setChildAge] = useState<Number>(10);
  const [startCollegeAge, setStartCollegeAge] = useState<Number>(18);
  const [durationOfEducation, setDurationOfEducation] = useState<Number>(3);

  const [costPerYear, setCostPerYear] = useState<string | number>(0);
  const [expectedRateofReturn, setExpectedRateofReturn] = useState<
    string | number
  >(0);
  const [expectedInflation, setExpectedInflation] = useState<string | number>(
    0
  );

  const costPerYearRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const expectedRateofReturnRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const expectedInflationRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Education Calculator</h4>
            <p className="fs14px">
              It helps you to see plans for the future expenditure of your child
              higher education.
            </p>
          </div>

          <div className="col-12">
            <div className="row ">
              <div className="col-lg-6 co-sm-12 col-md12 ">
                <div className="card border-0 shadow p-2">
                  <div className="card-body">
                    <form>
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
                          onChange={() => {}}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXPECTED RATE OF RETURNS (%)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="12"
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXPECTED INFLATION (%)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="6"
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
                    <h6 className="mt-1">₹21,43,352</h6>
                    <hr />
                    <h6>To meet this goal your must invest:</h6>
                    <p className="fs12px mb-0 mt-3">
                      ONE TIME INVESTMENT REQUIRED
                    </p>
                    <h6 className="mt-1">₹9,04,167</h6>
                    <p className="fs12px">OR</p>
                    <p className="fs12px mb-0 mt-3">
                      MONTHLY INVESTMENT REQUIRED
                    </p>
                    <h6 className="mt-1">₹13,185</h6>
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

export default EducationCalculator;
