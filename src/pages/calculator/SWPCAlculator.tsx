import NavBar from "../../components/Navbar";
import Chart from 'react-apexcharts'
import { useState } from "react";
import RangeBar from "./RangeBar";
interface ChartState {
  options: object;
  series: number[];
  // labels: string[];
  colors:string[]
}

const SWPCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<Number>(5)

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>SWP Calculator</h4>
            <p className="fs14px">Plan your regular withdrawals for a steady income.</p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">LUMPSUM AMOUNT</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="₹ 1,00,000" />
                    </div>
                    <RangeBar label={"INVESTMENT PERIOD"} maxLimit={30} value={investmentPeriod} setValue={setInvestmentPeriod} />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">EXPECTED RETURN (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="8%" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="fs12px mt-3">SET WITHDRAWAL BY</label><br/>
                          <button type="button" className="btn shortcutValue mx-1  rounded-3">Amount</button>
                          <button type="button" className="btn shortcutValue mx-1  rounded-3">Percentage (%)</button>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="exampleInputPassword1" className="fs12px">MONTHLY WITHDRAWAL AMOUNT</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="₹ 15,000" />
                      <small className="fs12px"> Percentage: 23.08%</small>
                    </div>
                    <button type="submit" className="customButton px-3 mt-3">Calculate</button>
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
