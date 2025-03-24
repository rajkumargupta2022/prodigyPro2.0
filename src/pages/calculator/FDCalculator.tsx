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

const FDCalculator = () => {
  const [period, setPeriod] = useState<Number>(5)
  // const [state, setState] = useState<ChartState>({
  //   options: {
  //     colors: ["#CCD2FF", "#1A35FE"],
  //   },
  //   series: [44, 95],
  //   colors: ["#fff", "#FF4560"],
  // });
const state: ChartState = {
  options: {
    colors: ["#CCD2FF", "#1A35FE"],
  },
  series: [44, 95],
  colors: ["#fff", "#FF4560"],
}
 



  return (
    <>
      <NavBar />
      <div className="container px-4 my-4" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>FD Calculator</h4>
            <p className="fs14px">This calculator help to calculate the maturity value of your FD for a given tenure, ROI and frequency of compounding.</p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">INVESTMENT AMOUNT</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="₹ 1,00,000" />
                    </div>
                    <RangeBar label={"PERIOD"} maxLimit={30} value={period} setValue={setPeriod} />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">INTEREST RATE (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="12" />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="exampleInputPassword1" className="fs12px">COMPOUNDING PERIOD</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Monthly" />
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
                      <p className="fs12px mb-0 mt-3">TOTAL AMOUNT INVESTED</p>
                      <h6 className="mt-1">₹1,00,000</h6>
                      <p className="fs12px mb-0 mt-3">TOTAL INTEREST</p>
                      <h6 className="mt-1">₹48,985</h6>
                      <p className="fs12px mb-0 mt-3">MATURITY AMOUNT</p>
                      <h6 className="mt-1">₹1,48,985</h6>
                    </div>
                
                  
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 co-sm-12 col-md-12 ">
                  <div className="card border-0 shadow p-0">
                    <div className="card-body">
                      <div className="donut">
                        <Chart options={state.options} series={state.series} type="donut" width="280" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FDCalculator;
