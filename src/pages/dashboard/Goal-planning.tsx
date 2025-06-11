import retirment from "../../assets/img/icons/rocking-chair (1) 1.svg"
import education from "../../assets/img/icons/education 1.svg"
import house from "../../assets/img/icons/home 1.svg"
import car from "../../assets/img/icons/car 1.svg"
import vacation from "../../assets/img/icons/vacation.svg"
import ring from "../../assets/img/icons/engagement-ring 1.svg"
import Card from 'react-bootstrap/Card';
import { Link ,useNavigate} from "react-router-dom"
import { goalContent, GoalContentInterface } from "../data/goal"
import { PlusCircle} from "react-bootstrap-icons";

const GoalPlanning = ()=>{
  const navigate = useNavigate()
  const handleGoal = (data: GoalContentInterface) => {
    navigate("/goal", { state: data });
  }
  return(
       <Card border="light mb-3 cardRadius">
                <Card.Body>
                  <div className="row">
                    <div className="col-sm-12 col-lg-7 d-flex justify-content-between w-100 mb-3">
                      <div className="fw-semibold">Goal Planning</div>
                      <Link to="/goal-planning" className="text-end logoBlueColor crPointer">View all</Link>
                    </div>
                    <div className="col text-center crPointer" onClick={() => handleGoal(goalContent.retirement)} ><img src={retirment} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Retirment </small><PlusCircle color="blue" /></div>
                    <div className="col text-center crPointer" onClick={() => handleGoal(goalContent.education)}><img src={education} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Education</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center crPointer" onClick={() => handleGoal(goalContent.housePurchase)}><img src={house} alt="" className="" height={24} /><small className="d-block adjustTextGrey">House</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center crPointer" onClick={() => handleGoal(goalContent.carPurchase)}><img src={car} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Car</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center crPointer" onClick={() => handleGoal(goalContent.vacation)}><img src={vacation} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Vacation</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center crPointer" onClick={() => handleGoal(goalContent.childMarriage)}><img src={ring} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Marriage</small> <PlusCircle color="blue" /></div>

                  </div>
                </Card.Body>
              </Card>
  )
}
export default GoalPlanning