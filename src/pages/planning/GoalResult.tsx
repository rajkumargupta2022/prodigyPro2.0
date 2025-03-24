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
  const location  = useLocation()
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
const state : ChartState = {
          
  series: [{
    name: 'Marine Sprite',
    data: [5,8,15,24,35,40,45,50,55,50]
  }, {
    name: 'Striking Calf',
    data: [1,4,7,12,18,25,30,32,38,50]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 1000,
      stacked: true,
    },
    colors: ["#CCD2FF","#1A35FE"],
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
    title: {
      text: 'Investment Performance'
    },
    dataLabels: {
      enabled: false, // ✅ Hides the numbers above bars
    },
    grid: {
      show: false, // ✅ Removes the background grey lines
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7,8,9,10],
      labels: {
        formatter: function (val:any) {
          return val + "Y"
        }
      }
      ,axisTicks: {
        show: false, // ✅ Removes ticks (small lines under labels)
      },
    },
    yaxis: {
      labels: {
        show: false, // ✅ Removes vertical numbers (Y-axis labels)
      },
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
                  <h4 className="">₹33,45,564</h4>
                  <p className=" fs14px fw-normal mb-1 my-3">Required monthly SIP</p>
                  <h4 className="">₹42,847</h4>
                </div>
                <div>
                  <div className="">
                  <ReactApexChart options={state.options}  series={state.series} type="bar" height={350} />
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
