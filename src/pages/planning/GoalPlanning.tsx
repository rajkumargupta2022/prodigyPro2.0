import NavBar from "../../components/Navbar";
import retirment from "../../assets/img/icons/rocking-chair (1) 1.svg"
import education from "../../assets/img/icons/education 1.svg"
import home from "../../assets/img/icons/home 1.svg"
import car from "../../assets/img/icons/car 1.svg"
import vacation from "../../assets/img/icons/vacation.svg"
import wealth from "../../assets/img/icons/wealth creation.svg"
import ring from "../../assets/img/icons/engagement-ring 1.svg"
// import customGoal from "../../assets/img/icons/goal.svg"
// import { CurrencyRupee } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { goalContent, GoalContentInterface } from "../data/goal";

const GoalPlanning = () => {
  const navigate = useNavigate()

  const handleGoal = (data: GoalContentInterface) => {
    navigate("/goal", { state: data });
  }
 

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row crPointer">
          <div className="col-6 align-items-start mb-3">
            <h4>Goal Planning</h4>
          </div>
          {/* <div className="col-6 alignEnd" onClick={addGoal}>
            <button type="button" className="customButton align-items-end px-2 mb-3" >+ Add Custom Goal</button>
          </div> */}
        </div>
        <div className="row">
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => handleGoal(goalContent.retirement)}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={retirment} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Retirement</p>
                {/* <small><CurrencyRupee className="mb-1" />2.25Cr</small> */}
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => handleGoal(goalContent.education)}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={education} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Education</p>
                {/* <small><CurrencyRupee className="mb-1" />2.25Cr</small> */}
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => handleGoal(goalContent.housePurchase)}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={home} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">House</p>
                {/* <small><CurrencyRupee className="mb-1" />2.25Cr</small> */}
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => handleGoal(goalContent.carPurchase)}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={car} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Car</p>
                {/* <small><CurrencyRupee className="mb-1" />2.25Cr</small> */}
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => handleGoal(goalContent.vacation)}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={vacation} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Vacation</p>
                {/* <small><CurrencyRupee className="mb-1" />2.25Cr</small> */}
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => handleGoal(goalContent.childMarriage)}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={ring} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Marriage</p>
                {/* <small><CurrencyRupee className="mb-1" />2.25Cr</small> */}
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => handleGoal(goalContent.wealthCreation)}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={wealth} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Wealth</p>
                {/* <small><CurrencyRupee className="mb-1" />2.25Cr</small> */}
              </div>
            </div>
          </div>
          {/* <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => { navigate("/custom-goal") }}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={customGoal} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Custom Goal 1</p>
                <small><CurrencyRupee className="mb-1" />2.25Cr</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => { navigate("/custom-goal") }}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={customGoal} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Custom Goal 2</p>
                <small><CurrencyRupee className="mb-1" />2.25Cr</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => { navigate("/custom-goal") }}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={customGoal} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Custom Goal 3</p>
                <small><CurrencyRupee className="mb-1" />2.25Cr</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3 text-center rounded-2 alignCenter px-2 mb-3" onClick={() => { navigate("/custom-goal") }}>
            <div className="card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0 pt-3">
                <img src={customGoal} className="card-img-top" alt="..." height={44} />
              </div>
              <div className="card-body">
                <p className="fs14px mb-0 ">Custom Goal 4</p>
                <small><CurrencyRupee className="mb-1" />2.25Cr</small>
              </div>
            </div>
          </div> */}

        </div>
      </div>


    </>
  );
};

export default GoalPlanning;
