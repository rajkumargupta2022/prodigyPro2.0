import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import RangeBar from "../calculator/RangeBar";

const CustomGoal = () => {
  const navigate = useNavigate()
  const location = useLocation()
    
  

const calculateResult = ()=>{
    navigate("/goal-result", {state:location.state});
  }

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>Customize Goal</h4>
            <p className="fs14px"> Set a personalized goal and start investing your way to financial success.</p>
          </div>

          <div className="row justify-content-md-center ">
            <div className="col-md-12 co-sm-12 col-lg-8 ">
              <div className="card border-0 shadow p-4">
                <div className="card-body">
                  <p className=" fs18px fw-normal">How much money will you need to achieve this goal?</p>
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px">Define Goal</label>
                  <input type="text" className="form-control" placeholder="iPhone 16 Pro"  aria-describedby="emailHelp" />
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px">Amount (In today’s term)</label>
                  <input type="text" className="form-control" placeholder="₹ 25,00,000"  aria-describedby="emailHelp" />
                  <RangeBar/>
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

export default CustomGoal;
