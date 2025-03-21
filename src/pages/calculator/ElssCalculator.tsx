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

const ElssCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<Number>(10)
  const [state, setState] = useState<ChartState>({
    options: {
      colors: ["#CCD2FF", "#1A35FE"],
    },
    series: [44, 95],
    colors: ["#fff", "#FF4560"],
  });





  return (
    <>
      <NavBar />
      <div className="container px-4 my-4" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>ELSS Calculator</h4>
            <p className="fs14px">This calculator help to calculate the tax saved by investing in ELSS according to your tax slab.</p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">INVESTMENT AMOUNT (YEARS)</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="₹ 50,000" />
                      <small className="fs12px">Maximum eligible amount for tax deduction u/s 80C is 1.5 L</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">YOUR TAX SLAB</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="20%" />
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
                      <p className="fs12px mb-0 mt-3">TOTAL TAX SAVED U/S 80(C)</p>
                      <h6 className="mt-1">₹10,400</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElssCalculator;
