import { useRef, useState } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { amountHandler, percentageHandler, pmtvalue, RetirementPresentValue } from "../../services/utils/calculatorsFs";
import { useNavigate } from "react-router-dom";

const RetirementCalculator = () => {
  const navigate = useNavigate()
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);

  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(30000);
  const [expectedInflationRate, setExpectedInflationRate] = useState<number>(6);
  const [currentSaving, setCurrentSaving] = useState<number>(5000);
  const [existingCorpus, setExistingCorpus] = useState<number>(200000);
  const [preRetirementReturns, setPreRetirementReturns] = useState<number>(12);
  const [postRetirementReturns, setPostRetirementReturns] = useState<number>(7);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(20);

  const [yearToRetirement, setYearToRetirement] = useState<number>(30);
  const [amountPostRetirementPM, setAmountPostRetirementPM] = useState<number>(172305);
  const [corppusToBeAchive, setCorppusToBeAchive] = useState<number>(37702271);
  const [corpusYouWillAccumalateWithCurrentSaving, setCorpusYouWillAccumalateWithCurrentSaving] = useState<number>(17474821);
  const [corpusYouWillAccumalateWithExistingSaving, setCorpusYouWillAccumalateWithExistingSaving] = useState<number>(5081744);
  const [sortfallAmount, setSortfallAmount] = useState<number>(15145706);
  const [extraSavingPM, setExtraSavingPM] = useState<number>(4963);
  const [isCalculate, setIsCalculate] = useState<boolean>(false)
 
  //refs of the input

  const monthlyExpensesRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedInflationRateRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const currentSavingRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);
  const existingCorpusRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const preRetirementReturnsRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const postRetirementReturnsRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const lifeExpectancyRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const submit =async (e: React.FormEvent) => {
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
      
    let retirement_yr:number = retirementAge - currentAge;

    let inflationR:number = 0.01 * expectedInflationRate
    let postRetirementReturn = 0.01 * postRetirementReturns
    let onePlusinflationR:number = 1 + inflationR
    let onePluspostRetirementReturn:number = 1 + postRetirementReturn
    let inflationAdjust = (onePluspostRetirementReturn / onePlusinflationR) - 1
    let inflationAdjustReturn:number = inflationAdjust / 12
    inflationAdjustReturn = inflationAdjustReturn
    let lifeExpectancy_yr:number = lifeExpectancy * 12
    // let lumpsumRequired = presentValue(adj_rate, yearsleft, 0, fv);
    let fvvalue:number = (monthlyExpenses * (Math.pow(onePlusinflationR, retirement_yr)));
    fvvalue = fvvalue
    //let corpusAchieved = (fvvalue * pow) / inflationAdjustReturn;
    let onePlusinflationAdjustReturn:number = 1 + inflationAdjustReturn
    // let powValue:number = 1 - Math.pow(onePlusinflationAdjustReturn, -lifeExpectancy_yr);
    let corpusAchieved = 0;

    if (onePlusinflationAdjustReturn == 0) {
      corpusAchieved = 0
    } else {
      corpusAchieved = await RetirementPresentValue(inflationAdjustReturn, lifeExpectancy_yr, -fvvalue, 0, 1)
    }

    let investment:number = currentSaving;
    let monthlyRate:number = preRetirementReturns / 12 / 100;
    let months:number = retirement_yr * 12;
    let corpus_month:number = investment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
     corpus_month = Math.round(corpus_month)

    let pre_ret:number = 0.01 * preRetirementReturns;
    let log:number = (1 + pre_ret);
    let n:number = 1 / 12.0;
    let pow:number = Math.pow(log, n);
    let nom:number = 12.0 * (pow - 1);

    let logg = (1 + nom);
     pow = Math.pow(logg, retirement_yr);
    let corpus_exist:number = existingCorpus * pow;
     corpus_exist = corpus_exist
    let shortfall_amt:number = corpusAchieved - (corpus_month + corpus_exist)
     shortfall_amt = shortfall_amt

    let nomialRate:number = 12.0 * (Math.pow((1 + (preRetirementReturns * 0.01)), (1 / 12.0)) - 1);
    let nominalRateMonthly:number = parseFloat((nomialRate / 12).toFixed(9))
    let newsipamt = await pmtvalue(nominalRateMonthly, months, 0, -shortfall_amt, 0)
    setSortfallAmount(Math.round(shortfall_amt));
    setAmountPostRetirementPM(Math.round(fvvalue));
    setYearToRetirement(retirement_yr);
    setExtraSavingPM(Math.round(newsipamt));
    setCorpusYouWillAccumalateWithCurrentSaving(Math.round(corpus_month));
    setCorpusYouWillAccumalateWithExistingSaving(Math.round(corpus_exist));
    setCorppusToBeAchive(Math.round(corpusAchieved));
    setIsCalculate(true)
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
                          onChange={(e) => {
                            amountHandler(e, 1000000, setMonthlyExpenses);
                          }}
                          validate={[isNotEmpty, minAmount(1)]}
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
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="6%"
                          value={expectedInflationRate}
                          onChange={(e) => {
                            percentageHandler(e, 50, setExpectedInflationRate);
                          }}
                          validate={[isNotEmpty, minAmount(1)]}
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
                          onChange={(e) => {
                            amountHandler(e, 1000000, setCurrentSaving);
                          }}
                          value={currentSaving}
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                      </div>
                      <div className="form-group my-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="fs12px"
                        >
                          EXISTING CORPUS(₹)
                        </label>
                        <ValidatedInput
                          ref={existingCorpusRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="₹ 5,000"
                          onChange={(e) => {
                            amountHandler(e, 1000000, setExistingCorpus);
                          }}
                          value={existingCorpus}
                          validate={[isNotEmpty, minAmount(1)]}
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
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="12%"
                          value={preRetirementReturns}
                          onChange={(e) => {
                            percentageHandler(e, 50, setPreRetirementReturns);
                          }}
                          validate={[isNotEmpty, minAmount(1)]}
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
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          value={postRetirementReturns}
                          onChange={(e) => {
                            percentageHandler(e, 50, setPostRetirementReturns);
                          }}
                          validate={[isNotEmpty, minAmount(1)]}
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
                          ref={lifeExpectancyRef}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="20"
                          value={lifeExpectancy}
                          onChange={(e) => {
                            amountHandler(e, 100, setLifeExpectancy);
                          }}
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                      </div>
                      <button type="submit" className="customButton px-3 mt-3">
                        {isCalculate ? "Re-Calculate" : "Calculate"}
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
                    <h6 className="mt-1">{yearToRetirement}</h6>
                    <p className="fs12px mb-0 mt-3">
                      AMOUNT REQUIRED P.M. - POST RETIREMENT
                    </p>
                    <h6 className="mt-1">₹{amountPostRetirementPM.toLocaleString("en-IN")}</h6>
                      <p className="fs12px mb-0 mt-3">
                      CORPUS TO BE ACHIEVED @ RETIREMENT
                    </p>
                    <h6 className="mt-1">₹{corppusToBeAchive.toLocaleString("en-IN")}</h6>
                    <p className="fs12px mb-0 mt-3">
                      CORPUS YOU WILL ACCUMULATE WITH CURRENT SAVINGS PER MONTH
                    </p>
                    <h6 className="mt-1">₹{corpusYouWillAccumalateWithCurrentSaving.toLocaleString("en-IN")}</h6>
                    <p className="fs12px mb-0 mt-3">
                      CORPUS YOU WILL ACCUMULATE WITH EXISTING SAVINGS
                    </p>
                    <h6 className="mt-1">₹{corpusYouWillAccumalateWithExistingSaving.toLocaleString("en-IN")}</h6>
                    <p className="fs12px mb-0 mt-3">SHORTFALL IN AMOUNT</p>
                    <h6 className="mt-1">₹{sortfallAmount.toLocaleString("en-IN")}</h6>
                    <p className="fs12px mb-0 mt-3">
                      EXTRA SAVINGS PER MONTH REQUIRED
                    </p>
                    <h6 className="mt-1">₹{extraSavingPM.toLocaleString("en-IN")}</h6>
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

export default RetirementCalculator;
