import { useState } from "react";
import NavBar from "../../components/Navbar";
import RangeBar from "./RangeBar";


const MarriageCalculator = () => {
  const [childAge, setChildAge] = useState<Number>(8)
  const [marriedAge, setMarriedAge] = useState<Number>(24)

  




  return (
    <>
      <NavBar />
      <div className="container px-4 my-4" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Marriage Calculator</h4>
            <p className="fs14px">This planner helps you to see the future expenditure which will be incurred at the time of marriage of your children.</p>
          </div>

          <div className="col-12">
          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form>
                    <RangeBar label={"CHILD AGE TODAY (YEARS)"} maxLimit={30} value={childAge} setValue={setChildAge}/>
                    <RangeBar label={"ChILD WILL GET MARRIED AT THE AGE"} maxLimit={30} value={marriedAge} setValue={setMarriedAge}/>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">AMOUNT REQUIRED FOR WEDDING AS ON TODAY</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="₹ 10,00,000" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">ANNUAL SAVINGS</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="₹ 5,00,000" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">EXPECTED RATE OF RETURNS (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="12" />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputPassword1" className="fs12px">EXPECTED INFLATION (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="6" />
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
                  <p className="fs12px mb-0 mt-3">INFLATION ADJUSTED COST</p>
                  <h6 className="mt-1">₹25,40,352</h6>
                  <p className="fs12px mb-0 mt-3">FUTURE VALUE OF SAVINGS</p>
                  <h6 className="mt-1">₹12,82,598</h6>
                  <p className="fs12px mb-0 mt-3">ADDITIONAL FUNDS REQUIRED TO MEET EXPENSES</p>
                  <h6 className="mt-1">₹12,57,753</h6>
                  <p className="fs12px mb-0 mt-3">ONE TIME INVESTMENT REQUIRED</p>
                  <h6 className="mt-1">₹2,05,167</h6>
                  <p className="fs12px mb-0 mt-3">MONTHLY INVESTMENT REQUIRED</p>
                  <h6 className="mt-1">₹2,185</h6>
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

export default MarriageCalculator;
