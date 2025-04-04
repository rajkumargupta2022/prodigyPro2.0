import NavBar from "../../components/Navbar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import RangeBar from "./RangeBar";
import { amountHandler, percentageHandler } from "../../services/calculatorsFs";
interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

const SipCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10)
  const [monthlySaving, setMonthlySaving] = useState<number>(10000)
  const [expectedRateOfReturn, setExpectedRateOfReturn] = useState<number>(16.5)
  const [gains ,setGains] = useState<number>(3017292)
  const [totalYear ,setTotalYear] = useState<number>(10)
  const [totalGains ,setTotalGains] = useState<number>(3017292)
  const [totalMonthlySaving ,setTotalMonthlySaving] = useState<number>(1200000 )
  const [oneMonthSaving ,setOneMonthSaving] = useState<number>(10000)

  const state: ChartState = {
    series: [
      {
        name: "Series 1",
        data: [10, 20, 30, 40, 50, 60, 80, 100, 120],
      },
      {
        name: "Series 2",
        data: [5, 20 - 10, 30 - 10, 40 - 10, 50 - 10, 60 - 10, 80 - 10, 80, 90],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        background: "transparent", // ✅ Removes background color
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "monotoneCubic",
        width: [2, 2], // ✅ Custom width (3px for first line, 2px for second line)
        colors: ["#357AF6", "#57BE65"],
      },
      xaxis: {
        categories: ["1M", "3M", "6M", "1Y", "3Y", "5Y", "8M", "10M", "Max"], // ✅ Custom X-axis labels
      },
      tooltip: {
        x: {
          formatter: function (val: any,) {
            return val; // ✅ Tooltip will also show 1M, 3M, etc.
          },
        },
      },
      grid: {
        show: false, // ✅ Removes background grey lines
      },
    },
  }


  const calculateSip = (e:React.FormEvent)=>{
    e.preventDefault()
    let monthlyRate:number = expectedRateOfReturn / 12 / 100;
    let months:number = investmentPeriod * 12;
    let futureValue:number = 0;
    // let futureValue = (monthlySavings  (1 + monthlyRate)  ((Math.pow((1 + monthlyRate), months)) - 1) / monthlyRate);
     futureValue = monthlySaving * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

    let mainresults:number = Math.round(futureValue)
    let totalSaving:number = monthlySaving * months
    setGains(Math.round((mainresults - monthlySaving * months)))
    setTotalYear(investmentPeriod)
    setTotalMonthlySaving(totalSaving)
    setOneMonthSaving(monthlySaving)
    // let a = parseInt(totalSaving)
    // let g = parseInt(gains)
    // let gainss = a + g
    setTotalGains(totalSaving+gains)
    
  }




  return (
    <>
      <NavBar />
      <div className="container px-4 my-4" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Sip Calculator</h4>
            <p className="fs14px">This calculator will help you to visualize/calculate the amount accumulated with a regular investment.</p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={calculateSip} >
                    <div className="form-group my-2">
                      <label htmlFor="monthlysip" className="fs12px">MONTHLY SAVING (₹)</label>
                      <input type="text" className="form-control" value={monthlySaving} onChange={(e)=>amountHandler(e,1000000,setMonthlySaving)} id="monthlysip" aria-describedby="emailHelp" placeholder="" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expectedrateofreturn" className="fs12px">EXPECTED RATE OF RETURN (% p.a)</label>
                      <input type="number" className="form-control"   onWheel={(e) => e.currentTarget.blur()} value={expectedRateOfReturn} onChange={(e)=>percentageHandler(e,50,setExpectedRateOfReturn)} id="expectedrateofreturn" placeholder="" />
                    </div>
                    <RangeBar label={"INVESTMENT PERIOD"} maxLimit={30} value={investmentPeriod} setValue={setInvestmentPeriod} />
                    <button type="submit" className="customButton px-3 mt-3">Calculate</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 co-sm-12 col-md-12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <h5 className=" fw-normal mb-1">Result</h5>
                  <p className="resultColor">If you invest <span className="fw600"> ₹{oneMonthSaving}</span>  per month for a period of {totalYear} years your investment amount will be <span className="fw600"> ₹{totalMonthlySaving} </span> and maturity amount will be grow to  <span className="fw600">₹{totalGains} </span></p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 co-sm-12 col-md-12 ">
                  <div className="card border-0 shadow p-0">
                    <div className="card-body">
                      <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
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

export default SipCalculator;
