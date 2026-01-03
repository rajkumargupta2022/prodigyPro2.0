import { useState, useRef } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
import { useNavigate } from "react-router-dom";

const CostOfDelayInSipCalculator = () => {
  const navigate = useNavigate()
  const [myCurrentAgeIs, setMyCurrentAgeIs] = useState<number>(25);
  const [startSipOf, setStartSipOf] = useState<number>(10000);
  const [investTillIAm, setInvestTillIAm] = useState<number>(60);
  const [expectedRateOfReturn, setExpectedRateOfReturn] = useState<number>(12.5);
  const [ifIDelayStartingMySipBy, setIfIDelayStartingMySipBy] = useState<number>(10);

  const [realProfit, setRealProfit] = useState<number>(500000);
  const [fakeProfit, setFakeProfit] = useState<number>(500000);
  const [difference, setDifference] = useState<number>(500000);
  const [realTotalInvestment, setRealTotalInvestment] = useState<number>(500000);
  const [fakeTotalInvestment, setFakeTotalInvestment] = useState<number>(500000);

  const startSipOfRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedRateOfReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);



  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      startSipOfRef.current?.validate(startSipOf),
      expectedRateOfReturnRef.current?.validate(expectedRateOfReturn),

    ].every((value) => value === true);





    if (isValidated) {
      const P = startSipOf;
      const n = (investTillIAm - myCurrentAgeIs) * 12;
      const r = expectedRateOfReturn / 100 / 12;

      // FV = P * ((1+r)^n - 1) / r * (1+r)
      const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

      setRealProfit(fv);
      const ni = (investTillIAm - myCurrentAgeIs - ifIDelayStartingMySipBy) * 12;

      const fv1 = P * ((Math.pow(1 + r, ni) - 1) / r) * (1 + r);

      setFakeProfit(fv1);
      setDifference(fv - fv1);
      setRealTotalInvestment(startSipOf * n);
      setFakeTotalInvestment(startSipOf * ni);
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
                        label={"MY CURRENT AGE IS"}
                        maxLimit={65}
                        value={myCurrentAgeIs}
                        setValue={setMyCurrentAgeIs}
                      />
                      <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1" className="fs12px">
                          I WANT TO START A MONTHLY SIP OF
                        </label>
                        <ValidatedInput
                          ref={startSipOfRef}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="₹5,00,000"
                          value={startSipOf}
                          onChange={(e) =>
                            amountHandler(e, 100000000, setStartSipOf)
                          }
                          validate={[isNotEmpty, minAmount(100)]}
                        />
                      </div>
                      <RangeBar
                        label={"INVEST TILL I AM"}
                        maxLimit={80}
                        value={investTillIAm}
                        setValue={setInvestTillIAm}
                      />    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1" className="fs12px">
                          EXPECTED RATE OF RETURN (%P.A)
                        </label>
                        <ValidatedInput
                          ref={expectedRateOfReturnRef}
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="12"
                          value={expectedRateOfReturn}
                          onChange={(e) =>
                            percentageHandler(e, 50, setExpectedRateOfReturn)
                          }
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                      </div>
                      <RangeBar
                        label={"IF I DELAY STARTING MY SIP BY"}
                        maxLimit={40}
                        value={ifIDelayStartingMySipBy}
                        setValue={setIfIDelayStartingMySipBy}
                      />



                      <button type="submit" className="customButton px-3 mt-3">
                        Check Impact
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 co-sm-12 col-md-12 mTopForMobile">
                <div className="card border-0 shadow p-2">
                  <div className="sip-calculate-results mb-4" data-aos="fade-left">
                   <h2>Result</h2>

                  <div className="row pt-3">
                    <div className="col-md-6">
                      <div className="border border-2 rounded-4 p-3 cost-investment-cards">
                       <span className="rounded-pill cacl-bg-green"> 👍 Start Age : {myCurrentAgeIs}</span>
                        <p>Final Value of Investment</p>
                        <h3 className="cost-invet-green">₹{realProfit.toLocaleString("en-IN")}</h3>
                        <p>Total Investment:₹ {realTotalInvestment.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border border-2 rounded-4 p-3 cost-investment-cards">
                       <span className="rounded-pill cacl-bg-red"> 👎 Start Age : {Number(ifIDelayStartingMySipBy)+Number(myCurrentAgeIs)}</span>
                        <p>Final Value of Investment</p>
                        <h3 className="cost-invet-red">₹{fakeProfit.toLocaleString("en-IN")}</h3>
                        <p>Total Investment:₹ {fakeTotalInvestment.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="text-center">
                      <span className="">Loss Due to Delay in Investment</span>
                      <h2 className="cost-invet-red py-2">₹{difference.toLocaleString("en-IN")}</h2>
                    </div>
                    <p className="">
                      Starting a{" "}
                      <strong>
                        ₹{startSipOf.toLocaleString("en-IN")}
                      </strong>{" "}
                      monthly SIP at age {myCurrentAgeIs} grows to{" "}
                      <strong >₹{realProfit.toLocaleString("en-IN")}</strong> by
                      age {investTillIAm}, while delaying it by {ifIDelayStartingMySipBy}{" "}
                      years reduces the corpus to{" "}
                      <strong>₹{fakeProfit.toLocaleString("en-IN")} </strong>
                      causing a loss of{" "}
                      <strong>₹{difference.toLocaleString("en-IN")}</strong>
                      {/* ; to bridge this gap, you would need to invest <strong></strong> per month instead of {monthlySIP} */}
                    </p>
                    </div>
                  </div>

                </div>
                <button type="button" className="btn investBtn mt-2 shadow-lg" onClick={() => { navigate("/all-mutual-funds") }}>
                  Start Investing
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
