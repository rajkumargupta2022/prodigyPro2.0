import NavBar from "../../components/Navbar";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
import {
  isNotEmpty,
  maxAmount,
  minAmount,
} from "../../services/Validated-inputs/validations";
import { percentageHandler } from "../../services/utils/calculatorsFs";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";

const SWPCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);

  const [lumpsumAmount, setLumpsumAmount] = useState<number>(65000);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [widthdrawalAmount, setWidthdrawalAmount] = useState<number>(15000);
  const [widthdrawalAmountInPercentage, setWidthdrawalAmountInPercentage] = useState<number>(23.08);
  const [byAmount, setByAmount] = useState<string>("activeButton")
  const [byPercentage, setByPercentage] = useState<string>("")
  const [totalBalanceAmount, setTotalBalanceAmount] = useState<number>(964107)
  const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState<number>(900000)
  const [totalProfit, setTotalProfit] = useState<number>(129107)

  const lumpsumAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const expectedReturnRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);

  const widthdrawalAmountRef = useRef<{
    validate: (value: number) => boolean;
  }>(null);
  type responseKeys = {
    total_balance_amount: number,
    total_withdrawal_amount: number,
    total_profit: number
  }
  interface swpResponse {
    msg: string;
    success: boolean;
    data: responseKeys;
  }
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
      setWidthdrawalAmountInPercentage(0)
      setWidthdrawalAmount(0)
    } else {
      setByAmount("")
      setByPercentage("activeButton")
      setWidthdrawalAmountInPercentage(0)
      setWidthdrawalAmount(0)
    }
  }

  const lumpsumAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.trim());
    if (value < 100000001) {
      setLumpsumAmount(value)
      calculateByLumpsum(value)
      setWidthdrawalAmount(0)
      setWidthdrawalAmountInPercentage(0)
    }
  };
  const withdrawalPercentageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.trim());
    if (value < 101 && lumpsumAmount > 0) {
      setWidthdrawalAmountInPercentage(value)
      calculateAmount(value)
    } else if (lumpsumAmount < 1) {
      setWidthdrawalAmountInPercentage(0)
    } else {
      setWidthdrawalAmountInPercentage(100)
      calculateAmount(100)
    }

  };
  const withdrawalAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.trim());
    if (value <= lumpsumAmount) {
      setWidthdrawalAmount(value)
      calculatePercentage(value)
    } else {
      setWidthdrawalAmount(lumpsumAmount)
      calculatePercentage(lumpsumAmount)
    }

  };


  const calculatePercentage = (enteredAmount: number) => {
    if (lumpsumAmount > 1) {
      let ress = (enteredAmount * 100) / lumpsumAmount
      console.log("enteredAmount", ress);
      setWidthdrawalAmountInPercentage(ress)
    }
  }
  const calculateAmount = (enteredPercentage: number) => {
    if (lumpsumAmount > 1) {
      let ress = (enteredPercentage / 100) * lumpsumAmount
      setWidthdrawalAmount(ress)
    }
  }
  const calculateByLumpsum = (lumpsum: number) => {
    if (byAmount === "activeButton" && widthdrawalAmount > 0) {
      let ress = (widthdrawalAmount * 100) / lumpsum
      setWidthdrawalAmountInPercentage(ress)
    } else if (byPercentage === "activeButton" && widthdrawalAmountInPercentage > 0) {
      let ress = (widthdrawalAmountInPercentage / 100) * lumpsumAmount
      setWidthdrawalAmount(ress)
    }
  }

  const calculateREsult = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await postRequest<swpResponse>(endPoints.swpCalculator, {
      monthlyWithdrawl: Math.round(widthdrawalAmount),
      period: investmentPeriod,
      interestRate: expectedReturn,
      lumpsum: Math.round(lumpsumAmount)
    });
   
    setTotalBalanceAmount(res.data?.total_balance_amount)
    setTotalWithdrawalAmount(res.data?.total_withdrawal_amount)
    setTotalProfit(res.data?.total_profit)
  }

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
                        validate={[isNotEmpty, minAmount(500), maxAmount(100000000)]}
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
                        <small className="fs12px"> Percentage: {widthdrawalAmountInPercentage.toFixed(2)}%</small>
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
                          value={widthdrawalAmountInPercentage}
                          onChange={(e) =>
                            withdrawalPercentageHandler(e)
                          }
                          validate={[isNotEmpty, minAmount(1)]}
                        />
                        <small className="fs12px"> Amount: {widthdrawalAmount.toLocaleString("en-In", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}</small>
                      </div>
                    }


                    <button type="submit" className="customButton px-3 mt-3" onClick={calculateREsult}>
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
                  <h6 className="mt-1">₹{totalBalanceAmount.toLocaleString("en-In")}</h6>
                  <p className="fs12px mb-0 mt-3">TOTAL WITHDRAWAL AMOUNT</p>
                  <h6 className="mt-1">₹{totalWithdrawalAmount.toLocaleString("en-In")}</h6>
                  <p className="fs12px mb-0 mt-3">TOTAL PROFIT</p>
                  <h6 className="mt-1"> ₹{totalProfit.toLocaleString("en-In")}</h6>
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
