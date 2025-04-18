import NavBar from "../../components/Navbar";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  maxAmount,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { percentageHandler } from "../../services/calculatorsFs";

const SWPCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);

  const [lumpsumAmount, setLumpsumAmount] = useState<number>(0);
  const [expectedReturn, setExpectedReturn] = useState<number>(0);
  const [widthdrawalAmount, setWidthdrawalAmount] = useState<number>(0);
  const [byAmount, setByAmount] = useState<string>("activeButton")
  const [byPercentage, setByPercentage] = useState<string>("")

  const lumpsumAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const widthdrawalAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidate = [
      lumpsumAmountRef.current?.validate(lumpsumAmount),
      expectedReturnRef.current?.validate(expectedReturn),
      widthdrawalAmountRef.current?.validate(widthdrawalAmount),
    ].every((value) => value === true);

    if (isValidate) {
      alert("form submitted");
    }
  };

  const handleWithdrawalBy = (key: number) => {
    if (key === 1) {
      setByAmount("activeButton")
      setByPercentage("")
    } else {
      setByAmount("")
      setByPercentage("activeButton")
    }
  }

  const lumpsumAmountHandler = ( e: React.ChangeEvent<HTMLInputElement> ) =>  {
    let value = Number(e.target.value.trim());
      setLumpsumAmount(value)
      setWidthdrawalAmount(0)
  };
  const withdrawalPercentageHandler = ( e: React.ChangeEvent<HTMLInputElement> ) =>  {
    let value = Number(e.target.value.trim());
    console.log("====",value);
    setWidthdrawalAmount(value)
  };
  const withdrawalAmountHandler = ( e: React.ChangeEvent<HTMLInputElement> ) =>  {
    let value = Number(e.target.value.trim());
    console.log("====",value);
    
   setWidthdrawalAmount(value)
  };

  // const calculateValues = ()=>{
  //   if(key==1){
  //     let ress = (percentage / 100) * lumpsumAmounts
  //     setMonthlyWithdrawl(ress.toFixed(2))
  //   }
  // }
  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>SWP Calculator</h4>
            <p className="fs14px">
              Plan your regular withdrawals for a steady income.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        LUMPSUM AMOUNT
                      </label>
                      <ValidatedInput
                        ref={lumpsumAmountRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=""
                        value={lumpsumAmount}
                        onChange={(e) =>
                          lumpsumAmountHandler(e)
                        }
                        validate={[isNotEmpty, minAmount(500),maxAmount(100000000)]}
                      />
                    </div>
                    <RangeBar
                      label={"INVESTMENT PERIOD"}
                      maxLimit={30}
                      value={investmentPeriod}
                      setValue={setInvestmentPeriod}
                    />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        EXPECTED RETURN (%)
                      </label>
                      <ValidatedInput
                        ref={expectedReturnRef}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={expectedReturn}
                        onChange={(e) =>
                          percentageHandler(e, 50, setExpectedReturn)
                        }
                        validate={[isNotEmpty, minAmount(1)]}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="fs12px mt-3"
                      >
                        SET WITHDRAWAL BY
                      </label>
                      <br />
                      <button
                        type="button"
                        className={`btn shortcutValue ${byAmount}  mx-1  rounded-3`}
                        onClick={() => handleWithdrawalBy(1)}
                      >
                        Amount
                      </button>
                      <button
                        type="button"
                        className={`btn shortcutValue ${byPercentage}  mx-1  rounded-3`}
                        onClick={() => handleWithdrawalBy(2)}
                      >
                        Percentage (%)
                      </button>
                    </div>

                    {
                      byAmount === "activeButton" ? <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1" className="fs12px">
                          MONTHLY WITHDRAWAL AMOUNT
                        </label>
                        <ValidatedInput
                          ref={widthdrawalAmountRef}
                          type="text"
                          className="form-control"
                          id="exampleInputword1"
                          placeholder=""
                          value={widthdrawalAmount}
                          onChange={(e) =>
                            withdrawalAmountHandler(e)
                          }
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                        <small className="fs12px"> Percentage: 23.08%</small>
                      </div> : <div className="form-group mt-3">
                        <label htmlFor="monthlyWITHDRAWAL" className="fs12px">
                          MONTHLY WITHDRAWAL (% p.m)
                        </label>
                        <ValidatedInput
                          ref={widthdrawalAmountRef}
                          type="text"
                          className="form-control"
                          id="monthlyWITHDRAWAL"
                          placeholder=""
                          value={widthdrawalAmount}
                          onChange={(e) =>
                            withdrawalPercentageHandler(e)
                          }
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                        <small className="fs12px"> Amount: 20</small>
                      </div>
                    }


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
                  <p className="fs12px mb-0 mt-3">TOTAL BALANCE AMOUNT </p>
                  <h6 className="mt-1">₹- ₹9,64,107</h6>
                  <p className="fs12px mb-0 mt-3">TOTAL WITHDRAWAL AMOUNT</p>
                  <h6 className="mt-1">₹9,00,000</h6>
                  <p className="fs12px mb-0 mt-3">TOTAL PROFIT</p>
                  <h6 className="mt-1">- ₹1,29,107</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SWPCalculator;
