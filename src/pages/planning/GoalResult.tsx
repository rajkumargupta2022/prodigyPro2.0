

import NavBar from "../../components/Navbar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}


const GoalResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sip = location.state?.newsipamt || 0;
  const investmentPeriod = location.state?.investmentPeriod || 10;
  const ir =(investmentPeriod>10? 18: location.state?.ir ) || 0;

  // Arrays for chart
  const currentValue: number[] = [];
  const sipData: number[] = [];
  const gainData: number[] = [];
  const categories: string[] = [];

  useEffect(() => {
    if (!location.state) {
      navigate("/dashboard");
    }
  }, []);

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
    navigate("/recommended-scheme-goal", { state: {
        newsipamt:location.state?.newsipamt, investmentPeriod:location.state?.investmentPeriod,  title: "Recommended",
        paragraph: location.state?.paragraph
      }});
  };

  const recalculate = () => {
    navigate("/goal", { state: location.state });
  };



  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
                        <h4>{location?.state?.title}</h4>
              <p className="small">{location?.state?.paragraph}</p>
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
