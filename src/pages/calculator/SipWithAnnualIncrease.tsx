import NavBar from "../../components/Navbar";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import { isNotEmpty } from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler } from "../../services/utils/calculatorsFs";
import { postRequest } from "../../services/Api/HandleApi";
import { sipWithAnnualIncreaseRes } from "../data-interfaces/calculators";
import {  endPoints } from "../../services/utils/urls";
import { useNavigate } from "react-router-dom";


const SipWithAnnualIncrease = () => {
  const navigate = useNavigate()
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [monthlySip, setMonthlySip] = useState<number>(25000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12.5);
  const [annualSipIncrease, setAnnualSipIncrease] = useState<number>(12);
  const [totalSipInvestedWithOutAnnualIncrease, setTotalSipInvestedWithOutAnnualIncrease] = useState<number>(3000000);
  const [totalGrowthWithOutAnnualIncrease, setTotalGrowthWithOutAnnualIncrease] = useState<number>(2752190);
  const [totalFutureValueNoAnnualIncrease, setTotalFutureValueNoAnnualIncrease] = useState<number>(5752190);
  const [totalSipAmountInvestedWithAnnualIncrease, setTotalSipAmountInvestedWithAnnualIncrease] = useState<number>(5264620);
  const [totalGrowthWithAnnualIncrease, setTotalGrowthWithAnnualIncrease] = useState<number>(3788142);
  const [totalFutureValueSipAndWithAnnualIncrease, setTotalFutureValueSipAndWithAnnualIncrease] = useState<number>(9052762);

  const monthlySipRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);
    const annualSipIncreaseRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  

  const submit =async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      monthlySipRef.current?.validate(monthlySip),
      expectedReturnRef.current?.validate(expectedReturn),
      annualSipIncreaseRef.current?.validate(annualSipIncrease),
    ].every((value) => value === true);

    if (isValidated) {
        try{
          const reqBody = {
            monthlySip,
            totalMonth:investmentPeriod*12,  
            expectedReturn,
            annualSipIncrease
          }
            const res = await postRequest<sipWithAnnualIncreaseRes>(endPoints.sipWithAnnualIncrease, reqBody)
            if(res.success){
                setTotalSipInvestedWithOutAnnualIncrease(res.data.invested_amount);
                setTotalGrowthWithOutAnnualIncrease(res.data.growth_value);
                setTotalFutureValueNoAnnualIncrease(res.data.maturity_amount);
                setTotalSipAmountInvestedWithAnnualIncrease(res.data.stepup_invested_amount);
                setTotalGrowthWithAnnualIncrease(res.data.stepup_growth_value);
                setTotalFutureValueSipAndWithAnnualIncrease(res.data.stepup_maturity_amount);
            }

        }catch(err){
          console.log(err);
          
        }
    }
  };
 const handleRecomendedScheme = () => {
      navigate("/recommended-scheme-goal", {
        state: {
          title: "Recommended",
          paragraph: "Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!",
          investmentPeriod: investmentPeriod,
          newsipamt: monthlySip,
        }
      })
    }
  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Step-up SIP Calculator</h4>
            <p className="fs14px">
              Project your wealth growth with yearly SIP step-ups for smarter long-term planning.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        HOW MUCH YOU CAN INVEST THROUGH MONTHLY SIP?
                      </label>
                      <ValidatedInput
                        ref={monthlySipRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="₹ 100,000"
                        value={monthlySip}
                        onChange={(e) =>
                          amountHandler(e, 100000000, setMonthlySip)
                        }
                        validate={isNotEmpty}
                      />
                    </div>
                     <RangeBar
                      label={"HOW MANY YEARS WILL YOU CONTINUE THE SIP?"}
                      maxLimit={30}
                      value={investmentPeriod}
                      setValue={setInvestmentPeriod}
                    />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                       EXPECTED RETURN (%P.A)
                      </label>
                      <ValidatedInput
                        ref={expectedReturnRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={expectedReturn}
                        onChange={(e) => percentageHandler(e, 100, setExpectedReturn)}
                        validate={isNotEmpty}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                       ANNUAL STEP UP PERCENTAGE (% P.A)
                      </label>
                      <ValidatedInput
                        ref={annualSipIncreaseRef}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={annualSipIncrease}
                        onChange={(e) => amountHandler(e, 100, setAnnualSipIncrease)}
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
                      <p className="fs12px mb-0 mt-3">TOTAL SIP AMOUNT INVESTED WITHOUT ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{totalSipInvestedWithOutAnnualIncrease.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL GROWTH WITHOUT ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{totalGrowthWithOutAnnualIncrease.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL FUTURE VALUE (SIP INVESTMENT + RETURNS, NO ANNUAL INCREASE)</p>
                      <h6 className="mt-1">₹{totalFutureValueNoAnnualIncrease.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL SIP AMOUNT INVESTED WITH ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{totalSipAmountInvestedWithAnnualIncrease.toLocaleString('en-IN')}</h6>
                    </div>
                     <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL GROWTH WITH ANNUAL INCREASE</p>
                      <h6 className="mt-1">₹{totalGrowthWithAnnualIncrease.toLocaleString('en-IN')}</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL FUTURE VALUE (SIP + GROWTH, WITH ANNUAL INCREASE)</p>
                      <h6 className="mt-1">₹{totalFutureValueSipAndWithAnnualIncrease.toLocaleString('en-IN')}</h6>
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

export default SipWithAnnualIncrease;
