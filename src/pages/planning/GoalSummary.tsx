import NavBar from "../../components/Navbar";
import retirment from "../../assets/img/icons/rocking-chair (1) 1.svg"
import education from "../../assets/img/icons/education 1.svg"
import home from "../../assets/img/icons/home 1.svg"
import car from "../../assets/img/icons/car 1.svg"
import vacation from "../../assets/img/icons/vacation.svg"
import wealth from "../../assets/img/icons/wealth creation.svg"
import ring from "../../assets/img/icons/engagement-ring 1.svg"
import customGoal from "../../assets/img/icons/goal.svg"
import { CurrencyRupee } from "react-bootstrap-icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const GoalSummary = () => {


  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-6 align-items-start mb-3">
            <h4>Child Education</h4>
          </div>
          <div className="col-6 alignEnd">
            <button type="button" className="border-0 bg-transparent align-items-end px-2 mb-3" ><FaRegEdit /></button>
            <button type="button" className="border-0 bg-transparent align-items-end px-2 mb-3" ><RiDeleteBin6Line /></button>
          </div>
          <div className="col-12">
            <div className="card border-0 shadow">
              <div className="card-header  bg-transparent">

              <p className=" fs14px ">TARGET AMOUNT</p>
                <h3 className="fw-bold"><CurrencyRupee className="mb-1" />10,91,550</h3>
              </div>
              
              <div className="card-body">
                 <div className="d-flex">
                  <p>Current Value: </p><p className="text-dark fs16px"> <CurrencyRupee className="mb-1" /> 41.22</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default GoalSummary;
