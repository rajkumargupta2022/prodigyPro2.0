// import NavBar from "../../components/Navbar";
// import ReactApexChart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import { useLocation, useNavigate } from "react-router-dom";
// interface ChartState {
//   options: ApexOptions;
//   series: { name: string; data: number[] }[];
// }

// const GoalResult = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   //   const [state, setState] = useState<ChartState>({

//   //     series: [{
//   //       name: 'Marine Sprite',
//   //       data: [5,8,15,24,35,40,45,50,55,50]
//   //     }, {
//   //       name: 'Striking Calf',
//   //       data: [1,4,7,12,18,25,30,32,38,50]
//   //     }],
//   //     options: {
//   //       chart: {
//   //         type: 'bar',
//   //         height: 1000,
//   //         stacked: true,
//   //       },
//   //       colors: ["#CCD2FF","#1A35FE"],
//   //       plotOptions: {
//   //         bar: {
//   //           borderRadius: 3, // ✅ Adds rounded corners to the top of bars
//   //         borderRadiusApplication: "end",
//   //           horizontal: false,
//   //           dataLabels: {
//   //             total: {
//   //               enabled: false,
//   //               offsetX: 0,
//   //               style: {
//   //                 fontSize: '13px',
//   //                 fontWeight: 900,
//   //               }
//   //             }
//   //           }
//   //         },

//   //       },
//   //       stroke: {
//   //         width: 0,
//   //         colors: ['#1A35FE'],
//   //       },
//   //       title: {
//   //         text: 'Investment Performance'
//   //       },
//   //       dataLabels: {
//   //         enabled: false, // ✅ Hides the numbers above bars
//   //       },
//   //       grid: {
//   //         show: false, // ✅ Removes the background grey lines
//   //       },
//   //       xaxis: {
//   //         categories: [1, 2, 3, 4, 5, 6, 7,8,9,10],
//   //         labels: {
//   //           formatter: function (val:any) {
//   //             return val + "Y"
//   //           }
//   //         }
//   //         ,axisTicks: {
//   //           show: false, // ✅ Removes ticks (small lines under labels)
//   //         },
//   //       },
//   //       yaxis: {
//   //         labels: {
//   //           show: false, // ✅ Removes vertical numbers (Y-axis labels)
//   //         },
//   //       },


//   //       fill: {
//   //         opacity: 1
//   //       }

//   //     },


//   // })


//   // const tenure = location.state?.tenure || 10;
//   // const lumpsum = location.state?.lumpsumRequired || 0;
//   const sip = location.state?.newsipamt || 0;
//   const investmentPeriod = location.state?.investmentPeriod || 10;
//   const ir = location.state?.ir || 0;
//   const amount = location.state?.amount || 0;


//   // Generate yearly arrays
//   const currentValue: number[] = [];
//   const sipData: number[] = [];
//   const gainData: number[] = [];
//   const categories: string[] = [];
//   const lumpGainData: number[] = [];

//   const rate = ir / 100;
//   const monthlyRate = rate / 12;

//   // let totalValue = lumpsum; // start with initial investment
//   // categories.push("0Y");
//   // lumpsumData.push(lumpsum);
//   // sipData.push(0);

//   for (let year = 1; year <= investmentPeriod; year++) {
//     categories.push(`${year}Y`);

//     // Add SIP contributions + compounding monthly
//     const months = year * 12;
//     const sipFV = sip * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

//     // Lumpsum FV
//     const lumpFV = amount * Math.pow(1 + rate, year);


//     let yearlyGain: number;
//     if (year === 1) {
//       yearlyGain = lumpFV - amount; // first year: compare against initial
//     } else {
//       const prevFV = amount * Math.pow(1 + rate, year - 1);
//       yearlyGain = lumpFV - prevFV; // later years: compare with previous FV
//     }

//     // Push into arrays (kept intact)
//     currentValue.push(Math.round(lumpFV));
//     sipData.push(Math.round(sipFV));
//     gainData.push(Math.round(yearlyGain));
//     lumpGainData.push(Math.round(yearlyGain));

//   }



//   const state: ChartState = {

//     series: [{
//       name: 'Current Value',
//       data: currentValue
//     }, {
//       name: 'Gain',
//       data: lumpGainData
//     }],
//     options: {
//       chart: {
//         type: 'bar',
//         height: 1000,
//         stacked: true,
//       },
//       colors: ["#CCD2FF", "#1A35FE"],
//       plotOptions: {
//         bar: {
//           borderRadius: 3, // ✅ Adds rounded corners to the top of bars
//           borderRadiusApplication: "end",
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
//       dataLabels: {
//         enabled: false, // ✅ Hides the numbers above bars
//       },
//       grid: {
//         show: false, // ✅ Removes the background grey lines
//       },
//       xaxis: {
//         categories: categories,
//         labels: {
//           formatter: function (val: any) {
//             return val
//           }
//         }
//         , axisTicks: {
//           show: true, // ✅ Removes ticks (small lines under labels)
//         },
//       },

//       yaxis: {
//         labels: {
//           show: true, // ✅ Removes vertical numbers (Y-axis labels)
//           formatter: (val: number) => {
//             if (val >= 10000000) { // 1 Cr = 1,00,00,000
//               return `₹${(val / 10000000).toFixed(1)}Cr`;
//             } else if (val >= 100000) { // 1 Lakh = 1,00,000
//               return `₹${(val / 100000).toFixed(1)}L`;
//             } else {
//               return `₹${val.toLocaleString()}`;
//             }
//           }

//         },
//       },
//       tooltip: {
//         shared: true,
//         intersect: false, // 🔹 Add this
//         custom: function ({ series, dataPointIndex, w }: { series: number[][]; dataPointIndex: number; w: any }) {
//           const current = series[0][dataPointIndex];
//           const gain = series[1][dataPointIndex];
//           const invested =
//             dataPointIndex === 0
//               ? current - gain // ✅ first bar: Current - Gain
//               : series[0][dataPointIndex - 1]; // ✅ other bars: prev Current Value
//           const year = w.globals.labels[dataPointIndex];

//           const formatValue = (v: number) => {
//             if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
//             if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
//             return `₹${v.toLocaleString()}`;
//           };

//           return `
//       <div style="padding:5px;">
//       <div><b>Year: ${year}</b></div>
//       <div>Current Value: ${formatValue(current)}</div>
//       <div>Invested Value: ${formatValue(invested)}</div>
//         <div>Gain: <span style="color:green;">${formatValue(gain)}</span></div>
//       </div>
//     `;
//         }
//       }
//       ,
//       title: {
//         text: `Investment Performance @${ir}% `
//       },


//       fill: {
//         opacity: 1
//       }

//     },


//   }

//   const handleGoal = () => {
//     navigate("/recommended-scheme-goal", { state: location.state });
//   }

//   const recalculate = () => {
//     navigate("/goal", { state: location.state })
//   }



//   return (
//     <>
//       <NavBar />
//       <div className="container px-4 mt-3" >
//         <div className="row">
//           <div className="col-12 align-items-start mb-3">
//             <h4>{location?.state?.title}</h4>
//             <p className="fs14px">{location?.state?.paragraph}</p>
//           </div>

//           <div className="row justify-content-md-center ">
//             <div className="col-md-12 co-sm-12 col-lg-8 ">
//               <div className="card border-0 shadow p-3">
//                 <div className="card-body">
//                   <p className=" fs14px fw-normal mb-1">Future value of amount needed</p>
//                   <h4 className="">₹{location.state.lumpsumRequired}</h4>
//                   <p className=" fs14px fw-normal mb-1 my-3">Required monthly SIP</p>
//                   <h4 className="">₹{location.state.newsipamt}</h4>
//                 </div>
//                 <div>
//                   <div className="">
//                     <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 my-4">
//               <button className='customCancelButton buttunCenter px-3' onClick={recalculate}>Re-Calculate</button>
//             </div>
//             <div className="col-6 my-4">
//               <button className='customButton buttunCenter px-3' onClick={handleGoal}>Continue</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GoalResult;

import NavBar from "../../components/Navbar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useLocation, useNavigate } from "react-router-dom";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

const GoalResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sip = location.state?.newsipamt || 0;
  const investmentPeriod = location.state?.investmentPeriod || 10;
  const ir = location.state?.ir || 0;

  // Arrays for chart
  const currentValue: number[] = [];
  const sipData: number[] = [];
  const gainData: number[] = [];
  const categories: string[] = [];

  const rate = ir / 100;
  const monthlyRate = rate / 12;

  for (let year = 1; year <= investmentPeriod; year++) {
    categories.push(`${year}`);

    const months = year * 12;

    // SIP Future Value formula
    const sipFV =
      sip *
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate));

    // Total invested till now
    const investedTillNow = sip * months;

    // Gain = Current Value - Invested Value
    const gain = sipFV - investedTillNow;

    currentValue.push(Math.round(sipFV));
    sipData.push(Math.round(investedTillNow));
    gainData.push(Math.round(gain));
  }

  //const finalValue = currentValue[currentValue.length - 1]; // future value needed
  // const totalInvested = sipData[sipData.length - 1];
  // const totalGain = gainData[gainData.length - 1];

  const state: ChartState = {
    series: [
      {
        name: "Invested Value",
        data: sipData,
      },
      {
        name: "Gain",
        data: gainData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
      },
      colors: ["#CCD2FF", "#1A35FE"],
      plotOptions: {
        bar: {
          borderRadius: 3,
          borderRadiusApplication: "end",
          horizontal: false,
        },
      },
      stroke: {
        width: 0,
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        labels: {
          formatter: (val: number) => {
            if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
            if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
            return `₹${val.toLocaleString()}`;
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        custom: function ({
          series,
          dataPointIndex,
          w,
        }: {
          series: number[][];
          dataPointIndex: number;
          w: any;
        }) {
          const investedVal = series[0][dataPointIndex];
          const gain = series[1][dataPointIndex];
          const current = investedVal + gain;
          const year = w.globals.labels[dataPointIndex];

          const formatValue = (v: number) => {
            if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
            if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
            if (v >= 1000) return `₹${(v / 1000).toFixed(2)}K`;
            return `₹${v.toLocaleString()}`;
          };

          return `
            <div style="padding:5px;">
              <div><b>Year: ${year}</b></div>
              <div>Current Value: ${formatValue(current)}</div>
              <div>Invested Value: ${formatValue(investedVal)}</div>
              <div>Gain: <span style="color:green;">${formatValue(gain)}</span></div>
            </div>
          `;
        },
      },
      title: {
        text: "Investment Performance",
      },
      legend: {
        show: false,
      },

      fill: {
        opacity: 1,
      },
    },
  };

  const handleGoal = () => {
    navigate("/recommended-scheme-goal", { state: location.state });
  };

  const recalculate = () => {
    navigate("/goal", { state: location.state });
  };

  // Formatter for top values
  // const formatTopValue = (v: number) => {
  //   if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
  //   if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
  //   return `₹${v.toLocaleString()}`;
  // };

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Retirement</h4>
            <p className="fs14px">
              Set your retirement goal and start investing today to ensure a
              secure and stress-free future.
            </p>
          </div>

          <div className="row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-lg-8">
              <div className="card border-0 shadow p-3">
                <div className="card-body">
                  <p className="fs14px fw-normal mb-1">
                    Future value of amount needed
                  </p>
                  <h4>₹{location.state.lumpsumRequired.toLocaleString("en-IN")}</h4>
                  <p className="fs14px fw-normal mb-1 my-3">
                    Required monthly SIP
                  </p>
                  <h4>₹{location.state.newsipamt.toLocaleString("en-IN")}</h4>
                </div>
                <div>
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={350}
                  />
                </div>
                <div style={{ textAlign: "center", marginTop: "-17.8px", fontSize: "14px" }}>
                  Assuming returns of {ir}%
                </div>
              </div>
            </div>
            <div className="col-6 my-4">
              <button
                className="customCancelButton buttunCenter px-3"
                onClick={recalculate}
              >
                Re-Calculate
              </button>
            </div>
            <div className="col-6 my-4">
              <button
                className="customButton buttunCenter px-3"
                onClick={handleGoal}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalResult;
