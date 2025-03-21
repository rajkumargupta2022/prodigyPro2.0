import { useState } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";


const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<Number>(30)
  const [retirementAge, setRetirementAge] = useState<Number>(60)


  return (
    <>
      <NavBar />
      <div className="container px-4 my-4" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Retirement Planning</h4>
            <p className="fs14px">This calculator help you to see the future expenditure which will be incurred at the time when you are retired from active employment/service.</p>
          </div>

          <div className="col-12">
          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form>
                    <RangeBar label={"CURRENT AGE"} maxLimit={90} value={currentAge} setValue={setCurrentAge}/>
                    <RangeBar label={"EXPECTED RETIREMENT AGE"} maxLimit={80} value={retirementAge} setValue={setRetirementAge}/>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">MONTHLY EXPENSES FOR CURRENT LIFESTYLE</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="₹ 30,000" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">EXPECTED INFLATION RATE (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="6%" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">CURRENT SAVINGS PER MONTH</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="₹ 5,000" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">EXPECTED PRE-RETIREMENT RETURNS (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="12%" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">EXPECTED POST-RETIREMENT RETURNS (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="7%" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">LIFE EXPECTANCY POST-RETIREMENT (YRS)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="20" />
                    </div>
                    <button type="submit" className="customButton px-3 mt-3">Calculate</button>
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
                  <p className="fs12px mb-0 mt-3">AMOUNT REQUIRED P.M. - POST RETIREMENT</p>
                  <h6 className="mt-1">₹1,72,305</h6>
                  <p className="fs12px mb-0 mt-3">CORPUS YOU WILL ACCUMULATE WITH CURRENT SAVINGS PER MONTH</p>
                  <h6 className="mt-1">₹1,74,74,821</h6>
                  <p className="fs12px mb-0 mt-3">CORPUS YOU WILL ACCUMULATE WITH EXISTING SAVINGS</p>
                  <h6 className="mt-1">₹50,81,744</h6>
                  <p className="fs12px mb-0 mt-3">SHORTFALL IN AMOUNT</p>
                  <h6 className="mt-1">₹1,51,45,705</h6>
                  <p className="fs12px mb-0 mt-3">EXTRA SAVINGS PER MONTH REQUIRED</p>
                  <h6 className="mt-1">₹4,963</h6>
                </div>
              </div>
              <button type="button" className="btn investBtn mt-2">Invest</button>
            </div>
        
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetirementCalculator;
