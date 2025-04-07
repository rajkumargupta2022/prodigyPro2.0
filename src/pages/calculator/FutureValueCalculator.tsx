import NavBar from "../../components/Navbar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useRef, useState } from "react";
import RangeBar from "./RangeBar";
import ValidatedInput from "../../services/Validated-inputs/inputs";
interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}
import { isNotEmpty } from "../../services/Validated-inputs/validations";

const FutureValueCalculator = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<Number>(10);

  const [investAmount, setInvestAmount] = useState<string | number>(0);
  const [rateOfReturn, setRateOfReturn] = useState<string | number>(0);

  const investAmountRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const rateOfReturnRef = useRef<{
    validate: (value: string | number) => boolean;
  }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = [
      investAmountRef.current?.validate(investAmount),
      rateOfReturnRef.current?.validate(rateOfReturn),
    ].every((value) => value === true);

    if (isValidated) {
      alert("form submitted");
    }
  };

  //   const [state, setState] = useState<ChartState>({

  //     series: [{
  //       name: 'Marine Sprite',
  //       data: [5,8,15,24,35,40,45,50,55,50]
  //     }, {
  //       name: 'Striking Calf',
  //       data: [1,4,7,12,18,25,30,32,38,50]
  //     }],
  //     options: {
  //       chart: {
  //         type: 'bar',
  //         height: 1000,
  //         stacked: true,
  //       },
  //       colors: ["#CCD2FF","#1A35FE"],
  //       plotOptions: {
  //         bar: {
  //           borderRadius: 3, // ✅ Adds rounded corners to the top of bars
  //         borderRadiusApplication: "end",
  //           horizontal: false,
  //           dataLabels: {
  //             total: {
  //               enabled: false,
  //               offsetX: 0,
  //               style: {
  //                 fontSize: '13px',
  //                 fontWeight: 900,
  //               }
  //             }
  //           }
  //         },

  //       },
  //       stroke: {
  //         width: 0,
  //         colors: ['#1A35FE'],
  //       },
  //       title: {
  //         text: 'Investment Performance'
  //       },
  //       dataLabels: {
  //         enabled: false, // ✅ Hides the numbers above bars
  //       },
  //       grid: {
  //         show: false, // ✅ Removes the background grey lines
  //       },
  //       xaxis: {
  //         categories: [1, 2, 3, 4, 5, 6, 7,8,9,10],
  //         labels: {
  //           formatter: function (val:any) {
  //             return val + "Y"
  //           }
  //         }
  //         ,axisTicks: {
  //           show: false, // ✅ Removes ticks (small lines under labels)
  //         },
  //       },
  //       yaxis: {
  //         labels: {
  //           show: false, // ✅ Removes vertical numbers (Y-axis labels)
  //         },
  //       },

  //       fill: {
  //         opacity: 1
  //       }

  //     },

  // })

  const state: ChartState = {
    series: [
      {
        name: "Marine Sprite",
        data: [5, 8, 15, 24, 35, 40, 45, 50, 55, 50],
      },
      {
        name: "Striking Calf",
        data: [1, 4, 7, 12, 18, 25, 30, 32, 38, 50],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 1000,
        stacked: true,
      },
      colors: ["#CCD2FF", "#1A35FE"],
      plotOptions: {
        bar: {
          borderRadius: 3, // ✅ Adds rounded corners to the top of bars
          borderRadiusApplication: "end",
          horizontal: false,
          dataLabels: {
            total: {
              enabled: false,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 0,
        colors: ["#1A35FE"],
      },
      title: {
        text: "Investment Performance",
      },
      dataLabels: {
        enabled: false, // ✅ Hides the numbers above bars
      },
      grid: {
        show: false, // ✅ Removes the background grey lines
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        labels: {
          formatter: function (val: any) {
            return val + "Y";
          },
        },
        axisTicks: {
          show: false, // ✅ Removes ticks (small lines under labels)
        },
      },
      yaxis: {
        labels: {
          show: false, // ✅ Removes vertical numbers (Y-axis labels)
        },
      },

      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 my-4">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Future Value Calculator</h4>
            <p className="fs14px">
              This calculator will help you to calculate the return value of
              your one time investment after your decided period.
            </p>
          </div>

          <div className="row ">
            <div className="col-lg-6 co-sm-12 col-md12 ">
              <div className="card border-0 shadow p-2">
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="form-group my-2">
                      <label htmlFor="exampleInputEmail1" className="fs12px">
                        INVEST
                      </label>
                      <ValidatedInput
                        ref={investAmountRef}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="₹50,000"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        validate={isNotEmpty}
                      />
                    </div>
                    <RangeBar
                      label={"PERIOD"}
                      maxLimit={30}
                      value={investmentPeriod}
                      setValue={setInvestmentPeriod}
                    />
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="fs12px">
                        EXPECTED RATE OF RETURNS (%)
                      </label>
                      <ValidatedInput
                        ref={rateOfReturnRef}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="12"
                        value={rateOfReturn}
                        onChange={(e) => setRateOfReturn(e.target.value)}
                        validate={isNotEmpty}
                      />
                    </div>
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
                  <p className="resultColor">
                    If you invest <span className="fw600">₹50,000</span> for a
                    period of 10 years at a <span className="fw600">12%</span>{" "}
                    annual return, the maturity amount will grow to{" "}
                    <span className="fw600">₹30,17,292.</span>
                  </p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 co-sm-12 col-md-12 ">
                  <div className="card border-0 shadow p-0">
                    <div className="card-body">
                      <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        height={350}
                      />
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

export default FutureValueCalculator;
