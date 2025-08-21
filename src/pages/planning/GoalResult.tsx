import NavBar from "../../components/Navbar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useLocation, useNavigate } from "react-router-dom";
interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

const GoalResult = () => {
  const navigate = useNavigate()
  const location = useLocation()
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


  // const tenure = location.state?.tenure || 10;
  // const lumpsum = location.state?.lumpsumRequired || 0;
  const sip = location.state?.newsipamt || 0;
  const investmentPeriod = location.state?.investmentPeriod || 10;
  const ir = location.state?.ir || 0;
  const amount = location.state?.amount || 0;


  // Generate yearly arrays
  const currentValue: number[] = [];
  const sipData: number[] = [];
  const gainData: number[] = [];
  const categories: string[] = [];
    const lumpGainData: number[] = [];

  const rate = ir / 100;
  const monthlyRate = rate / 12;

  // let totalValue = lumpsum; // start with initial investment
  // categories.push("0Y");
  // lumpsumData.push(lumpsum);
  // sipData.push(0);

  for (let year = 1; year <= investmentPeriod; year++) {
    categories.push(`${year}Y`);

    // Add SIP contributions + compounding monthly
    const months = year * 12;
    const sipFV = sip * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    // Lumpsum FV
    const lumpFV = amount * Math.pow(1 + rate, year);


    let yearlyGain: number;
  if (year === 1) {
    yearlyGain = lumpFV - amount; // first year: compare against initial
  } else {
    const prevFV = amount * Math.pow(1 + rate, year - 1);
    yearlyGain = lumpFV - prevFV; // later years: compare with previous FV
  }

    // Push into arrays (kept intact)
    currentValue.push(Math.round(lumpFV));
    sipData.push(Math.round(sipFV));
    gainData.push(Math.round(yearlyGain));
   lumpGainData.push(Math.round(yearlyGain));
  
  }



  const state: ChartState = {

    series: [{
      name: 'Current Value',
      data: currentValue
    }, {
      name: 'Gain',
      data: lumpGainData
    }],
    options: {
      chart: {
        type: 'bar',
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
                fontSize: '13px',
                fontWeight: 900,
              }
            }
          }
        },

      },
      stroke: {
        width: 0,
        colors: ['#1A35FE'],
      },
      dataLabels: {
        enabled: false, // ✅ Hides the numbers above bars
      },
      grid: {
        show: false, // ✅ Removes the background grey lines
      },
      xaxis: {
        categories: categories,
        labels: {
          formatter: function (val: any) {
            return val
          }
        }
        , axisTicks: {
          show: true, // ✅ Removes ticks (small lines under labels)
        },
      },
      yaxis: {
        labels: {
          show: true, // ✅ Removes vertical numbers (Y-axis labels)
          formatter: (val: number) => {
            if (val >= 10000000) { // 1 Cr = 1,00,00,000
              return `₹${(val / 10000000).toFixed(1)}Cr`;
            } else if (val >= 100000) { // 1 Lakh = 1,00,000
              return `₹${(val / 100000).toFixed(1)}L`;
            } else {
              return `₹${val.toLocaleString()}`;
            }
          }

        },
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
            if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
            return `₹${val.toLocaleString()}`;
          }
        }

      },
      title: {
        text: `Investment Performance @${ir}% `
      },


      fill: {
        opacity: 1
      }

    },


  }

  const handleGoal = () => {
    navigate("/recommended-scheme-goal", { state: location.state });
  }



  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>{location?.state?.title}</h4>
            <p className="fs14px">{location?.state?.paragraph}</p>
          </div>

          <div className="row justify-content-md-center ">
            <div className="col-md-12 co-sm-12 col-lg-8 ">
              <div className="card border-0 shadow p-3">
                <div className="card-body">
                  <p className=" fs14px fw-normal mb-1">Future value of amount needed</p>
                  <h4 className="">₹{location.state.lumpsumRequired}</h4>
                  <p className=" fs14px fw-normal mb-1 my-3">Required monthly SIP</p>
                  <h4 className="">₹{location.state.newsipamt}</h4>
                </div>
                <div>
                  <div className="">
                    <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 my-4">
              <button className='customCancelButton buttunCenter px-3'>Re-Calculate</button>
            </div>
            <div className="col-6 my-4">
              <button className='customButton buttunCenter px-3' onClick={handleGoal}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalResult;
