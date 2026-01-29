import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import RangeBar from "../calculator/RangeBar";
import { useState } from "react";
import { FV, pmtvalue } from "../../services/utils/calculatorsFs";
import { goalContent } from "../data/goal";
import { errorToast } from "../../services/utils/toast";

const Goal = () => {
  const [investmentPeriod, setInvestmentPeriod] = useState<Number>(10)
  const [goalName, setGoalName] = useState<string>("")
  const navigate = useNavigate()
  const location = useLocation()


  const [amount, setAmount] = useState("2500000")
  const [error, setError] = useState("")

  const calculateResult = async () => {
if (goalContent.customizeGoal?.title===location.state?.title && goalName.trim() === "") {
      errorToast("Plaese define goal..."); // 🔹 show error below input
      return;
    }
    if (amount.trim() === "") {
      setError("Plaese enter amount..."); // 🔹 show error below input
      return;
    }
   let titleName = (goalContent.customizeGoal?.title===location.state?.title)? goalName  : location.state?.title;

    const { newsipamt, lumpsumRequired ,ir} = await goalCalculater(Number(amount), Number(investmentPeriod));
      
    navigate("/goal-result", {
      state: {
        newsipamt, lumpsumRequired, investmentPeriod,amount, ir,  title: titleName,
        paragraph: location.state?.paragraph
      }
    });
  };


  const handleAmount = (e: any) => {
    if (!isNaN(Number(e.target.value))) {
      setAmount(e.target.value)
    }
  }

  const interestRates: { [key: number]: number } = {
    1: 5,
    2: 6,
    3: 7,
    4: 7,
    5: 10,
    6: 11,
    7: 12,
    8: 14,
    9: 14,
    10: 16
  };



  const goalCalculater = async (amount: number, tenure: number) => {
    let ir = Number(tenure) > 10 ? 16 : interestRates[tenure];
    let irpercent = ir / 100 / 12;
    let totmonth = tenure * 12;
    let futurevalue = await FV(amount, 6, tenure);
    let lumpsumRequired = Math.round(futurevalue);

    let newsipamt = await pmtvalue(irpercent, totmonth, 0, -Math.round(futurevalue), 1);
    newsipamt = Math.round(newsipamt);

    return { newsipamt, lumpsumRequired ,ir };
  };
  return (
    <>
      <NavBar />
      <style>
      {`
        #exampleInputEmail1::placeholder {
          color: lightgrey;
          font-size: 14px;
          font-style: italic;
        }
      `}
    </style>
    
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>{location.state?.title}</h4>
            <p className="fs14px"> {location.state.paragraph}</p>
          </div>

          <div className="row justify-content-md-center ">
            <div className="col-md-12 co-sm-12 col-lg-8 ">
              <div className="card border-0 shadow p-4">
                <div className="card-body">
                  <p className=" fs18px fw-normal">How much money will you need to achieve this goal?</p>
                  {goalContent.customizeGoal?.title===location.state?.title &&<>
                   <label htmlFor="exampleInputEmail1" className="form-label fs12px">Define Goal</label>
                  <input type="text" className="form-control" placeholder="" value={goalName} onChange={(e)=>setGoalName(e.target.value)} aria-describedby="emailHelp" /></>}
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px">Amount (In today’s term)</label>
                  <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} placeholder="₹ 25,00,000" id="exampleInputEmail1" aria-describedby="emailHelp" value={amount} onChange={handleAmount} />
                  {error && <div className="invalid-feedback">{error}</div>}
                  <RangeBar label={"INVESTMENT PERIOD"} maxLimit={30} value={investmentPeriod} setValue={setInvestmentPeriod} />
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-4">
              <button className='customButton buttunCenter px-3' onClick={calculateResult}>Calculate</button>
            </div>

          </div>
        </div>
      </div>


    </>
  );
};

export default Goal;
