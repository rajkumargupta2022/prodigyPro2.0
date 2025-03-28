import MyNavbar from "./Navbar"
import rislBg from "../assets/img/bg-image/risk-profile.png"
import {  ChevronRight } from "react-bootstrap-icons"




const RiskResult = () => {




  return (
    <>
      <MyNavbar />
      <div className="container px-4 mt-4">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-sm-12">
            <h5>Know Your Risk Profile</h5>
          </div>
          <div className="col-lg-8 col-sm-12 bg-light rounded-3 mt-3" style={{ backgroundImage: `url(${rislBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="row justify-content-md-center my-4">
              <div className="col-lg-8 col-sm-12">
                <div className="row mb-4">
                  <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "100%" }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "100%" }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "100%" }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <h4 className="text-white mt-5">Congratulations</h4>
                <div className=" py-5 d-grid gap-2 ">
                  <button className="btn btn-light border-0 bgOption 100vh ">Agree ✅</button>
                  <button className="btn btn-light border-0 bgOption 100vh ">Somewhat Agree 🤔</button>
                  <button className="btn btn-light border-0 bgOption 100vh ">Disagree ❌</button>
                </div>
           
     
  
                <div className="text-center mb-4">
                <button className="btn btn-light border-0 arrowRadius" > <ChevronRight/>Go to home</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default RiskResult