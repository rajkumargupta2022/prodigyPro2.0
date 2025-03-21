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

const EmiCalculator = () => {
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
            <h4>EMI Calculator</h4>
            <p className="fs14px">This calculator will help you to calculate the return value of your one time investment after your decided period.</p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">LOAN AMOUNT</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="₹ 100,000" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">INTEREST RATE (%)</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="12" />
                    </div>
                    <RangeBar label={"PERIOD"} maxLimit={30} value={investmentPeriod} setValue={setInvestmentPeriod} />
                    <button type="submit" className="customButton px-3 mt-3">Calculate</button>
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
                      <p className="fs12px mb-0 mt-3">YOUR MONTHLY EMI</p>
                      <h6 className="mt-1">₹1434.71</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">principle</p>
                      <h6 className="mt-1">₹1,00,000</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL INTEREST</p>
                      <h6 className="mt-1">₹72,165.2</h6>
                    </div>
                    <div className="col-6">
                      <p className="fs12px mb-0 mt-3">TOTAL AMOUNT</p>
                      <h6 className="mt-1">₹1,72,165.2</h6>
                    </div>
                  </div>

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

export default EmiCalculator;
